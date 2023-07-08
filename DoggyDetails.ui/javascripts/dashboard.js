import petData from './helpers/data/petData.js'
import exerciseData from './helpers/data/exerciseData.js'
import foodData from './helpers/data/foodData.js';
import medicineData from './helpers/data/medicineData.js';
import noteData from './helpers/data/noteData.js';
import ownerIdData from './helpers/data/OwnerIDData.js';


const checkAuthenticationStatus = async () => 
{
    
    const ownerID = await ownerIdData.getOwnerIDCookie();

    if(ownerID == null || ownerID == "0" || ownerID == "" || ownerID == undefined)
    {
        // if someone is not authenticated, push them back to index.html
        window.location.replace('./index.html');
    } 
}

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
    checkAuthenticationStatus();
}

init();