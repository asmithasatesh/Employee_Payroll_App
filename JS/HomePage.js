
window.addEventListener('DOMContentLoaded', (event) =>
{
    createInnerHtml();
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