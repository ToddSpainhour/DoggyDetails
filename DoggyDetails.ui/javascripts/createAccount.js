
import { baseUrl } from './helpers/constants.js'

const changeUsernameUnavailableVisability = (dbResponse) => 
{
    const usernameAlreadyTakenMessage = document.getElementById("usernameAlreadyTakenMessage");
    const createAccountInputContainer = document.getElementById("createAccountInputContainer");
    
    if (dbResponse == "False")
    {
        usernameAlreadyTakenMessage.innerHTML = "That Account Email is not available. Try again"
        createAccountInputContainer.style.display = "none";
    } 
    else 
    {
        usernameAlreadyTakenMessage.innerHTML = "Great, that Account Email is available for you to use! Let's keep going!"
        createAccountInputContainer.style.display = "block";
    }
}

const CheckUsernameAvailability = async () => 
{
    const userEnteredValue = document.getElementById("username").value;
    const url = `${baseUrl}/Owners/UsernameAvailability/${userEnteredValue}`

try
{
    let response = await fetch(url);
    let responseAsText = await response.text();
    const isUsernameAvailabile = responseAsText;
    changeUsernameUnavailableVisability(isUsernameAvailabile);
} 
catch(err)
{
    console.log(`Oh, no! Something went wrong in the CheckUsernameAvailability function. Error Info: ${err.message}`)
}



}

const createNewOwner = async () => {

    try 
    {
        const username = document.getElementById('username').value
        const password = document.getElementById('passwordInput').value
        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value
    
        const newOwner = {
            firstName: firstName,
            lastName: lastName,
            accountEmail: username,
            accountPassword: password
        }
    
        const response = await fetch(`${baseUrl}/Owners/createNewOwner/${newOwner}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newOwner),
        });
    
        const result = await response.text();
        document.cookie = `OwnerID=${result};`;
        pushToDashboard();
    } 
    catch (err) 
    {
        console.log(`Oh, no! Something went wrong in the CheckUsernameAvailability function. Error Info: ${err.message}`)
    }


}

const pushToDashboard = () => {
    window.location.replace('./dashboard.html');
}

const addEventListeners = () => 
{
    const btnCheckUsernameAvailability = document.getElementById("btnCheckUsernameAvailability");
    btnCheckUsernameAvailability.addEventListener("click", CheckUsernameAvailability);

    const btnCreateNewOwner = document.getElementById("btnCreateNewOwner")
    btnCreateNewOwner.addEventListener("click", createNewOwner);
}

const init = () => 
{
    addEventListeners();
}

init();