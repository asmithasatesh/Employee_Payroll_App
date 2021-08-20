//Usecase 9: Add getter and setter for all form properties
class EmployeePayrollData
{
    get name()
    {
        return this._name;
    }
    set name(name)
    {
        this._name=name;
    }

    get profilePic()
    {
        return this._profilePic;
    }
    set profilePic(profilePic)
    {
        this._profilePic=profilePic;
    }

    get gender()
    {
        return this._gender;
    }
    set gender(gender)
    {
        this._gender=gender;
    }

    get department()
    {
        return this._department;
    }
    set department(department)
    {
        this._department=department;
    }
    
    get salary()
    {
        return this._salary;
    }
    set salary(salary)
    {
        this._salary=salary;
    }

    get notes()
    {
        return this._notes;
    }
    set notes(notes)
    {
        this._notes=notes;
    }

    get startDate()
    {
        return this._startDate;
    }
    set startDate(startDate)
    {
        this._startDate=startDate;
    }
    toString(){
        const option = {year:'numeric', month:'long', day:'numeric'};
        return "Employee name = "+this.name+" || Gender: "+this.gender+" || Profile Pic: "+this.profilePic+" || Salary: "+this.salary+
        " || Start Date: "+this.startDate;
    }
}

const onSubmit=()=>{
    let employee = new EmployeePayrollData();
    try
    {
    employee.name= document.getElementById("name").value;
    employee.profilePic=getSelectedValues('[name = profile]');
    employee.salary = document.getElementById("salary").value;
    employee.gender=getSelectedValues('[name = gender]').pop();
    employee.startDate=document.getElementById("day").value+" "+document.getElementById("month").value+" "+document.getElementById("year").value;
    alert(employee.toString());
    }
    catch(e){
        alert(e);
        console.log(employee.Empname);
    }
   
};

const getSelectedValues = (propertyvalue)=>{
    
    let allitems = document.querySelectorAll(propertyvalue);
    let selectedItem = [];
    allitems.forEach(item=>{

        if(item.checked)
        selectedItem.push(item.value);
    });
    return selectedItem;
}
