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
    let nameRegex=RegExp('^[A-Z]{1}[a-z]{2,}([\\s]?[A-Za-z]{1,})*$');
    if(nameRegex.test(text.value))
    {
        texterror.textContent="";
    }
    else
    {
        texterror.textContent="Name is Incorrect"
    }
    });

    //validates the date
    const date = document.querySelector('#date');
    date.addEventListener('input',function(){
        let startDate = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
        try{
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            setTextValue(".dateerror","");
        }catch(e){
            setTextValue(".dateerror",e);
        }
    })
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
      setValue('#name',empJsonObj._name);
      setSelectedValues('[name=profile]',empJsonObj._profilePic);
      setSelectedValues('[name=gender]',empJsonObj._gender);
      setSelectedValues('[name=department]',empJsonObj._department);
      setValue('#salary',empJsonObj._salary);
      setTextValue('.salary-output',empJsonObj._salary);
      setValue('#notes',empJsonObj._notes);
      let date= stringifyDate(empJsonObj._startDate).split(" ");
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
      .find(empData => empData._id == empJsonObj._id);
      if(!empayrollData)
      {
        employeePayrollList.push(createEmployeePayrollData());
      }
      else{
        const index= employeePayrollList.map(empData => empData._id)
        .indexOf(empayrollData._id);
        employeePayrollList.splice(index,1,createEmployeePayrollData(empayrollData._id));
      }
    }
    else{
      employeePayrollList=[createEmployeePayrollData()]
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
   }


     //Check whether ID exist
      createEmployeePayrollData=(id) =>
      {
        let employeedata= new EmployeePayrollData();
        if(!id) employeedata._id=createNewID();
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
