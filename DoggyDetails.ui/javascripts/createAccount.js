
const CheckUsernameAvailability = () => 
{
    const userEnteredValue = document.getElementById("username").value;
    console.log("--> " + userEnteredValue);
}


const addEventListeners = () => 
{
    btnCheckUsernameAvailability = document.getElementById("btnCheckUsernameAvailability");
    btnCheckUsernameAvailability.addEventListener("click", CheckUsernameAvailability);
}

const init = () => 
{
    addEventListeners();
}

init();