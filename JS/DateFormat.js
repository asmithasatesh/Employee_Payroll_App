//Usecase 8: Display date in proper format
const stringifyDate= (date) =>
{
    const option= { day: 'numeric', month: 'short', year: 'numeric'};
    let newDate = !date? "undefined":
    new Date(Date.parse(date)).toLocaleDateString('en-GB',option);
    return newDate; 
}