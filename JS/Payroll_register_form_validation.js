   //first loads the contents in the web page then validates
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

