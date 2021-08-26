   //first loads the contents in the web page then validates
    //HOME Usecase 8: Ability to Update an Employee Payroll details.
    let isUpdate=false;
    let empJsonObj={};
window.addEventListener("DOMContentLoaded", (event) => {
   //Usecase 8: Addevent listener to change salary range
    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    //Display Salary using range
    output.textContent=salary.value;
    salary.addEventListener('input',function()
    {
        output.textContent=salary.value;
    });
    //Usecase 1: Check whether Name is Proper using Regex
                
    const text=document.querySelector('#name');
    const texterror=document.querySelector('.text-error');
    text.addEventListener('input',function()
    {
    if(text.value.length == 0)
    {
        setTextValue('.text-error',"");
        return;
    }
   try{
     checkName(text.value);
     setTextValue('.text-error',"");
   }
   catch(e)
   {
     setTextValue('.text-error',e)
   }
    });

    //validates the date
    const date = document.querySelector('#date');
    date.addEventListener('input',function(){

         try{
          let startDate = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
          checkStartDate(new Date(Date.parse(startDate)));
        setTextValue(".dateerror","");
        }catch(e){
            setTextValue(".dateerror",e);
        }
    });

    checkForUpdate();
   });

   const save=()=>
   {
     try
     {
        // Usecase 11: Create employee Payroll object on Submit
       let employeePayrollData=onSubmit();
       createAndUpdateStorage(employeePayrollData);
     }
     catch(e)
     {
       return;
     }
   }

   //Usecase 12: Storing employee payroll object in local storage
    function createAndUpdateStorage(employeePayrollData)
    {
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined)
    {
        employeePayrollList.push(employeePayrollData);
    }
    else{
        employeePayrollList=[employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
    }

   //Usecase 10: Validate Name and Date
   const onSubmit=() =>
   {
     let employeePayrollData=new EmployeePayrollData();
     try
     {
       employeePayrollData.name=getInputValueById("#name");
     }
     catch(e)
     {
       setTextValue(".text-error",e);
       throw e;
     }

     employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
     employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
     employeePayrollData.department=getSelectedValues('[name=department]');
     employeePayrollData.salary=getInputValueById("#salary");
     employeePayrollData.notes=getInputValueById("#notes");
     let date=getInputValueById("#day")+ " "+getInputValueById("#month") +" "+getInputValueById("#year");

     try
     {
       employeePayrollData.startDate=new Date(Date.parse(date));
       setTextValue(".dateerror","");
     }
     catch(e)
     {
       setTextValue(".dateerror",e);
     }
     
     alert(employeePayrollData.toString());
     return employeePayrollData;
   }
   

   const getInputValueById=(id) =>
   {
     let value=document.querySelector(id).value;
     return value;
   }
   
   
   const getSelectedValues = (propertyvalue)=>{
    
    let allitems = document.querySelectorAll(propertyvalue);
    let selectedItem = [];
    allitems.forEach(item=>{

        if(item.checked)
        selectedItem.push(item.value);
    });
    return selectedItem;
    }

    const setTextValue=(id,value) =>
    {
    const element=document.querySelector(id);
    element.textContent=value;
    }

    const resetForm=() =>
    {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setTextValue('.salary-output','400000');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2021');
    alert("Reseting Form!");
    }

    const setValue=(id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
    }

    const unsetSelectedValues=(property)=>{
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item=>{
    item.checked=false;
    });
    }

    //Usecase 8: HOME Ability to Update an Employee Payroll details.
    const checkForUpdate=() =>
    {
      var empJson=localStorage.getItem('editEmp');
      isUpdate=empJson?true: false;
      if(!isUpdate) return;
      empJsonObj=JSON.parse(empJson);
      setForm();
    }

   //Usecase 8: HOME Ability to Update an Employee Payroll details.
  const setForm= () =>
    {
      setValue('#name',empJsonObj.name);
      setSelectedValues('[name=profile]',empJsonObj.profilePic);
      setSelectedValues('[name=gender]',empJsonObj.gender);
      setSelectedValues('[name=department]',empJsonObj.department);
      setValue('#salary',empJsonObj.salary);
      setTextValue('.salary-output',empJsonObj.salary);
      setValue('#notes',empJsonObj.notes);
      let date= stringifyDate(empJsonObj.startDate).split(" ");
      setValue('#day',date[0]);
      setValue('#month',date[1]);
      setValue('#year',date[2]);
    }

    const setSelectedValues=(property,value)=>{
      let allItems = document.querySelectorAll(property);
      allItems.forEach(item=>{
        if(Array.isArray(value))
        {
          if(value.includes(item.value))      item.checked=true;
        }
        else if (item.value === value)item.checked=true;
      });
      }

    //Usecase 9: HOME Ability to Save Updated Employee Payroll into Local Storage.
      const onsave= (event) =>
      {
        event.preventDefault();
        event.stopPropagation();
        try{
          setEmployeePayrollObject();
          createAndUpdateStorages();
          resetForm();
          window.location.replace(site_properties.home_page);
        }
        catch(e)
        {
          return;
        }
      }

    //Storing Data on global Object
   const setEmployeePayrollObject=() =>
   {
     if(!isUpdate) empJsonObj.id=createNewID();
    empJsonObj.name=getInputValueById("#name");
    empJsonObj.profilePic=getSelectedValues('[name=profile]').pop();
    empJsonObj.gender=getSelectedValues('[name=gender]').pop();
    empJsonObj.department=getSelectedValues('[name=department]');
    empJsonObj.salary=getInputValueById("#salary");
    empJsonObj.notes=getInputValueById("#notes");
     let date=getInputValueById("#day")+ " "+getInputValueById("#month") +" "+getInputValueById("#year");

     try
     {
      empJsonObj.startDate=new Date(Date.parse(date));
       setTextValue(".dateerror","");
     }
     catch(e)
     {
       setTextValue(".dateerror",e);
     }
     
     alert(empJsonObj.toString());
   }

   //For creating and Update values
   createAndUpdateStorages=() =>
   {
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList)
    {
      let empayrollData= employeePayrollList
      .find(empData => empData.id == empJsonObj.id);
      if(!empayrollData)
      {
        employeePayrollList.push(empJsonObj);
      }
      else{
        const index= employeePayrollList.map(empData => empData.id)
        .indexOf(empayrollData.id);
        employeePayrollList.splice(index,1,empJsonObj);
      }
    }
    else{
      employeePayrollList=[empJsonObj]
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
   }
    //Check whether ID exist
    createEmployeePayrollData=(id) =>
    {
      let employeedata= new EmployeePayrollData();
      if(!id) employeedata.id=createNewID();
      else employeedata.id=id;
      setEmployeePayrollData(employeedata);
      return employeedata;
    }

    //Create new ID and maintaing current id in Local Storage
    createNewID=()=>
    {
      let empID=localStorage.getItem("CurrentEmployeeID");
      empID=!empID? 1: (parseInt(empID)+1).toString();
      localStorage.setItem("CurrentEmployeeID",empID);
      return empID;
    }

     //Assigning data from Json Object
     setEmployeePayrollData=(employeePayrollData) =>
     {
      try
      {
        employeePayrollData.name=empJsonObj.name;
      }
      catch(e)
      {
        setTextValue(".text-error",e);
      }

      employeePayrollData.profilePic=empJsonObj.profilePic;
      employeePayrollData.gender=empJsonObj.gender;
      employeePayrollData.department=empJsonObj.department;
      employeePayrollData.salary=empJsonObj.salary;
      employeePayrollData.notes=empJsonObj.notes;
      try
      {
        employeePayrollData.startDate=empJsonObj.startDate;
        setTextValue(".dateerror","");
      }
      catch(e)
      {
        setTextValue(".dateerror",e);
      }
      alert(employeePayrollData.toString());
    }
