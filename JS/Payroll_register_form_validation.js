//Usecase 8: Addevent listener to change salary range
const salary=document.querySelector('#salary');
const output=document.querySelector('.salary-output');
//Display Salary using range
output.textContent=salary.value;
salary.addEventListener('input',function()
{
    output.textContent=salary.value;
});


