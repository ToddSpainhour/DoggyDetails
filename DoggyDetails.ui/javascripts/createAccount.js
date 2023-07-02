
const changeUsernameUnavailableVisability = (dbResponse) => 
{
    const usernameAlreadyTakenMessage = document.getElementById("usernameAlreadyTakenMessage");
    
    if (dbResponse == "False")
    {
        usernameAlreadyTakenMessage.innerHTML = "That username is not available. Try again"
    } 
    else 
    {
        usernameAlreadyTakenMessage.innerHTML = "Great. Let's keep going!"
    }
}

const CheckUsernameAvailability = async () => 
{
    const userEnteredValue = document.getElementById("username").value;
    const url = `https://localhost:7260/api/Owners/UsernameAvailability/${userEnteredValue}`
    let response = await fetch(url);
    let responseAsText = await response.text();
    const isUsernameAvailabile = responseAsText;
    changeUsernameUnavailableVisability(isUsernameAvailabile);
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