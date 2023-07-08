import petData from './helpers/data/petData.js'
import exerciseData from './helpers/data/exerciseData.js'
import foodData from './helpers/data/foodData.js';
import medicineData from './helpers/data/medicineData.js';
import noteData from './helpers/data/noteData.js';
import ownerIdData from './helpers/data/OwnerIDData.js';
import { baseUrl } from './helpers/constants.js'


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

const getPetsForThisOwner = async () =>
{
    const _ownerID = await ownerIdData.getOwnerIDCookie();

    const ownerInfo = 
    {
        // petID is can't be null so pass in zero instead
        petID: 0,
        ownerID: _ownerID,
        name: null,
        type: null,
    }

    try 
    {
        const response = await fetch(`${baseUrl}/Owners/getAllPetsForThisOwner/${ownerInfo}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ownerInfo),
        });
    
        const listOfPets = await response.text();
        console.log(`listOfPets: ${listOfPets}`)
    } 
    catch (err) 
    {
        console.log(`oh, no. Something went wrong in the getPetsForThisOwner function. Error Info: ${err.message}`)
    }
}

const init = () => 
{
    changeCreateAccountButtonVisibility();
    changeLogoutButtonVisibility();
    checkAuthenticationStatus();
    getPetsForThisOwner();
}

init();