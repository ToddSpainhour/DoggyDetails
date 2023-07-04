
const changeCreateAccountButtonVisibility = () => 
{
    const createAccountButton = document.getElementById("create-account-button-container");
    createAccountButton.style.display = "none";
}

const changeLogoutButtonVisibility = () => 
{
    const logoutButton = document.getElementById("logout-button-container");
    logoutButton.style.display = "block";
}

const init = () => 
{
    changeCreateAccountButtonVisibility();
    changeLogoutButtonVisibility();
}

init();