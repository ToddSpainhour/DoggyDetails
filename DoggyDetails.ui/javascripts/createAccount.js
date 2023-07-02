
const changeUsernameUnavailableVisability = (dbResponse) => 
{
    const usernameAlreadyTakenMessage = document.getElementById("usernameAlreadyTakenMessage");
    const createAccountInputContainer = document.getElementById("createAccountInputContainer");
    
    if (dbResponse == "False")
    {
        usernameAlreadyTakenMessage.innerHTML = "That username is not available. Try again"
        createAccountInputContainer.style.display = "none";
    } 
    else 
    {
        usernameAlreadyTakenMessage.innerHTML = "Great. Let's keep going!"
        createAccountInputContainer.style.display = "block";
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

const createNewOwner = async () => {

    const newOwner = {
        firstName: "Heather",
        lastName: "Wood",
        accountEmail: "heather@test.com",
        accountPassword: "password"
    }

    const reponse = await fetch(`https://localhost:7260/api/Owners/createNewOwner/${newOwner}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOwner),
    });

    const result = await response.json();
    console.log("Success:", result);
    //console.log("responseAsText: ", responseAsText);
    
    // method: "Post",
    // headers: {"Content-Type": "application/json"},
    // data: JSON.stringify:({password, firstName, lastName})
    // }
}

const addEventListeners = () => 
{
    btnCheckUsernameAvailability = document.getElementById("btnCheckUsernameAvailability");
    btnCheckUsernameAvailability.addEventListener("click", CheckUsernameAvailability);
    btnCreateNewOwner.addEventListener("click", createNewOwner);
}

const init = () => 
{
    addEventListeners();
}

init();