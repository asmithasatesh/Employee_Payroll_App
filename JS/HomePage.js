
window.addEventListener('DOMContentLoaded', (event) =>
{
  JsonObjectFunction();
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
  <td>${employeePayrollData[i]._name}</td>
  <td>${employeePayrollData[i]._gender}</td>
  <td>
   ${getDeptHtml(employeePayrollData[i]._department)}
  </td>
  <td>${employeePayrollData[i]._salary}</td>
  <td>${employeePayrollData[i]._startDate}</td>
  <td>
      <img id="${employeePayrollData[i]._name}" src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon">
      <img id="${employeePayrollData[i]._name}" src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">
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
          _id: new Date().getTime(),
          _profilePic: '../assets/profile-images/Ellipse -7.png'
      },
      {
          _name: 'Rakesh',
          _gender: 'Male',
          _department: ['Finance', 'HR'],
          _salary: 650000,
          _startDate: '20-Feb-2021',
          _note: '',
          _id: new Date().getTime(),
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