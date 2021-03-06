var employeeList;
window.addEventListener('DOMContentLoaded', (event) =>
{
    //createInnerHtml();
    if(site_properties.use_local_storage.match("true"))
    {
        //Usecase 6: Ability to view Employee Payroll details from Local Storage.
    employeeList=getEmployeePayrollFromLocalStorage();
    document.querySelector(".emp-count").textContent = employeeList.length;
    InjectFRomLOcalStorage();

    }
    else
    {
      getEmployeePayrollFromServer();
    }


    //Usecase 8: Ability to Update an Employee Payroll details.
    localStorage.removeItem('editEmp');

});

//Usecase 4: Ability to view Employee Payroll details in a Tabular Format from JS File using Template Literals.
createInnerHtml=() =>
{
    const CreateHeaderhtml="<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    const innerHTML= `${CreateHeaderhtml} 
    <tr>
    <td><img src="../assets/profile-images/Ellipse -1.png" alt="" class="profile"></td>
    <td>Lalitha</td>
    <td>Female</td>
    <td><div class="dept-label">HR</div>
      <div class="dept-label">Finance</div></td>
    <td>400000</td>
    <td>1 June 2019</td>
    <td>
      <img src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon">
      <img src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">  
    </td>
  </tr>
  <tr>
      <td><img src="../assets/profile-images/Ellipse -2.png" alt="" class="profile"></td>
      <td>Rakesh</td>
      <td>Male</td>
      <td><div class="dept-label">Sales</div>
        <div class="dept-label">Finance</div></td>
      <td>450000</td>
      <td>28 Aug 2020</td>
      <td>
        <img src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon">
        <img src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">  
      </td>
    </tr>
    `;
    document.querySelector('#display-table').innerHTML=innerHTML;
}

//Usecase 5: Ability to view Employee Payroll details in a Tabular Format from JSON Object.
JsonObjectFunction = () => {
  const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
  let innerHtml = `${headerHtml}`;
  let employeePayrollData = createEmployeePayrollJSON();
  for (let i=0;i< employeePayrollData.length;i++)
  {
innerHtml=`${innerHtml}
<tr>
  <td>
      <img class="profile" alt="" src="${employeePayrollData[i]._profilePic}">
  </td>
  <td>${employeePayrollData[i].name}</td>
  <td>${employeePayrollData[i].gender}</td>
  <td>
   ${getDeptHtml(employeePayrollData[i].department)}
  </td>
  <td>${employeePayrollData[i].salary}</td>
  <td>${employeePayrollData[i].startDate}</td>
  <td>
      <img id="${employeePayrollData[i].name}" src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon">
      <img id="${employeePayrollData[i].name}" src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">
  </td>
</tr>
  `;
  }
    
  document.querySelector('#display-table').innerHTML = innerHtml;
}

//Usecase 5: Ability to view Employee Payroll details in a Tabular Format from JSON Object.
const createEmployeePayrollJSON = () => {
  let empPayrollList = [
      {
          _name: 'Lilitha ',
          _gender: 'Female',
          _department: ['Engineering'],
          _salary: 700000,
          _startDate: '28-Sept-2021',
          _note: '',
          id: new Date().getTime(),
          _profilePic: '../assets/profile-images/Ellipse -7.png'
      },
      {
          _name: 'Rakesh',
          _gender: 'Male',
          _department: ['Finance', 'HR'],
          _salary: 650000,
          _startDate: '20-Feb-2021',
          _note: '',
          id: new Date().getTime(),
          _profilePic: '../assets/profile-images/Ellipse -5.png'
      }
  ];
  return empPayrollList;
}

const getDeptHtml=(deptList) =>
{
  let deptHtml='';
  for(const dept of  deptList)
  {
      deptHtml=`${deptHtml}<div class="dept-label" >${dept}</div>`
  }
  return deptHtml;
}

//Usecase 6: Ability to view Employee Payroll details from Local Storage.
InjectFRomLOcalStorage = () => {
  const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
  let innerHtml = `${headerHtml}`;
  if(employeeList.length == 0) return;
  for (let i=0;i< employeeList.length;i++)
  {
innerHtml=`${innerHtml}
<tr>
  <td>
      <img class="profile" alt="" src="${employeeList[i].profilePic}">
  </td>
  <td>${employeeList[i].name}</td>
  <td>${employeeList[i].gender}</td>
  <td>
   ${getDeptHtml(employeeList[i].department)}
  </td>
  <td>${employeeList[i].salary}</td>
  <td>${stringifyDate(employeeList[i].startDate)}</td>
  <td>
      <img id="${employeeList[i].id}" src="../assets/icons/delete-black-18dp.svg" onclick="remove(this)" alt="delete" id="icon"/>
      <img id="${employeeList[i].id}" src="../assets/icons/create-black-18dp.svg" onclick="edit(this) "alt="create" id="icon"/>
  </td>
</tr>
  `;
  }
    
  document.querySelector('#display-table').innerHTML = innerHtml;
}

//Usecase 6: Get data from Local Storage
const getEmployeePayrollFromLocalStorage=()=>
{
    return localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
}

//Usecase 7: Remove employee from Local Storage
const remove= (node) =>
{
  let employeePayrollData=employeeList.find(empData => empData.id == node.id);
  if(!employeePayrollData) return ;
  const index= employeeList.map(empData => empData.id)
  .indexOf(employeePayrollData.id);
  employeeList.splice(index,1);
  if(site_properties.use_local_storage.match("true"))
  {
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeeList));
    document.querySelector(".emp-count").textContent=employeeList.length;
    InjectFRomLOcalStorage();
  }
  else{
    const deleteUrl = site_properties.server_url+employeePayrollData.id.toString();
    makePromiseCall("DELETE",deleteUrl,false).then(responseText=>
      {
      InjectFRomLOcalStorage();
    }).catch(error=>{
      console.log(JSON.stringify(error));
    })
  }
}

//Usecase 8: Ability to Update an Employee Payroll details.
const edit= (node) =>
{
  let employeePayrollData=employeeList.find(empData => empData.id== node.id);
     alert("Redirecting ..");
     localStorage.setItem("editEmp",JSON.stringify(employeePayrollData));  
     window.location.replace(site_properties.add_emp_payroll_page);
}
//Usecase 9: Retrieve the Employee Payroll data from the JSON Server instead of Local Storage.
const getEmployeePayrollFromServer=()=>{
  makePromiseCall("GET",site_properties.server_url,true).
  then(responseText=>{
    employeeList = JSON.parse(responseText);
    document.querySelector(".emp-count").textContent=employeeList.length;
    InjectFRomLOcalStorage();
  }).catch(error=>{
    console.log("Get error Status: "+JSON.stringify(error));
    employeeList=[];
    document.querySelector(".emp-count").textContent=employeeList.length;
    InjectFRomLOcalStorage();
  })
}
