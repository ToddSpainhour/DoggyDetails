import petData from './helpers/data/petData.js'
import exerciseData from './helpers/data/exerciseData.js'
import foodData from './helpers/data/foodData.js';
import medicineData from './helpers/data/medicineData.js';
import noteData from './helpers/data/noteData.js';
import ownerIdData from './helpers/data/OwnerIDData.js';
import { baseUrl } from './helpers/constants.js'

const checkAuthenticationStatus = async () => 
{
    // i think this method is checking for the value before it's there and thinking the user is not authenticated
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
        let parsedListOfPets = JSON.parse(listOfPets)
        const noPetsInDatabaseMessage = document.getElementById("noPetsInDatabaseMessage")

        if(parsedListOfPets.length == 0) 
        {
            noPetsInDatabaseMessage.style.display = "block"
        } 
        else 
        {
            noPetsInDatabaseMessage.style.display = "none"

            for (let i = 0; i < parsedListOfPets.length; i++)
            {
                let petCardsContainer = document.getElementById("petCardsContainer");
    
                let singlePetCard = `<div class="pet-card">`
                singlePetCard += `<p>${parsedListOfPets[i].name}</p>`
                singlePetCard += `<p>${parsedListOfPets[i].type}</p>`
                singlePetCard += `<p>PetID: ${parsedListOfPets[i].petID}</p>`
                singlePetCard += `</div>`
    
                petCardsContainer.innerHTML += singlePetCard;
            }
        }
    } 
    catch (err) 
    {
        console.log(`Oh, no. Something went wrong in the getPetsForThisOwner function. Error Info: ${err.message}`)
    }
}

const submitNewPet = async () => {
    console.log("do the thing")

    const userEnteredPetName = document.getElementById('user-entered-pet-name').value
    const userEnteredPetType = document.getElementById('user-entered-pet-type').value
    const _ownerID = await ownerIdData.getOwnerIDCookie();
    console.log("_ownerID: ", _ownerID)

    const petDetails = {
        ownerID: _ownerID,
        name: userEnteredPetName,
        type: userEnteredPetType
    }

    try
    {
        const response = await fetch(`${baseUrl}/Pets/createNewPet/${petDetails}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(petDetails),
        });
        console.log(response)
        const result = await response.text();
        console.log(result)

    } 
    catch (err)
    {
        console.log("oh, no! SOmething went wrong in submitNewPet")
    }
}

const addClickEvents = () => {
    const btnSubmitNewPet = document.getElementById("btnSubmitNewPet")
    btnSubmitNewPet.addEventListener("click", submitNewPet)
}

const init = () => 
{
    changeCreateAccountButtonVisibility();
    changeLogoutButtonVisibility();
    getPetsForThisOwner();
    addClickEvents();
    // checkAuthenticationStatus(); // this is causing issues so I'll comment it out for now
}

init();