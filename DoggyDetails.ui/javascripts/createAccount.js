
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
        usernameAlreadyTakenMessage.innerHTML = "Great! That Account Email is available for you to use! Let's keep going!"
        createAccountInputContainer.style.display = "block";
    }
}

const CheckUsernameAvailability = async () => 
{
    const userEnteredValue = document.getElementById("username").value;
    const url = `${baseUrl}/Owners/UsernameAvailability/${userEnteredValue}`

    if(userEnteredValue.length > 0)
    {
        const noUsernameErrorMessage = document.getElementById("noUsernameErrorMessage")
        noUsernameErrorMessage.style.display = "none"

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
    else 
    {
        noUsernameErrorMessage.style.display = "block"
    }
}

const createNewOwner = async () => {
    
        const username = document.getElementById('username').value
        const password = document.getElementById('passwordInput').value
        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value
        const noPasswordErrorMessage = document.getElementById("noPasswordErrorMessage")

        const newOwner = {
            firstName: firstName,
            lastName: lastName,
            accountEmail: username,
            accountPassword: password
        }

    if(username.length > 0 && password.length > 0)
    {
        noPasswordErrorMessage.style.display = "none"
        try 
        {
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
            console.log(`Oh, no! Something went wrong in the createNewOwner function. Error Info: ${err.message}`)
        }
    } else {
        console.log("Both Username and Password need a value to continue")
        noPasswordErrorMessage.style.display = "block"
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