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
        const parsedListOfPets = JSON.parse(listOfPets)

        const noPetsInDatabaseMessage = document.getElementById("noPetsInDatabaseMessage")

        if(parsedListOfPets.length == 0) 
        {
            noPetsInDatabaseMessage.style.display = "block"
        } 
        else 
        {
            let petCardsContainer = document.getElementById("petCardsContainer");
            noPetsInDatabaseMessage.style.display = "none"
            let singlePetCard = ""

            for (let i = 0; i < parsedListOfPets.length; i++)
            {
                singlePetCard += `<div class="pet-card" id=${parsedListOfPets[i].petID}>`
                singlePetCard += `<h3 class="pet-card-name">${parsedListOfPets[i].name}</h3>`
                singlePetCard += `<p>Type: ${parsedListOfPets[i].type}</p>`
                singlePetCard += `<p>PetID: ${parsedListOfPets[i].petID}</p>`
                singlePetCard += `<div class="pet-card-icons-container">`
                singlePetCard += `<button class="btnDeleteThisPet"><img src="./images/trash-can.svg" /></button>`
                singlePetCard += `</div>`
                singlePetCard += `</div>`

            }
            petCardsContainer.innerHTML = singlePetCard;
            const deleteThisPetButtonCollection = document.querySelectorAll(".btnDeleteThisPet")

            for(let i = 0; i < deleteThisPetButtonCollection.length; i++)
            {
                deleteThisPetButtonCollection[i].addEventListener('click', deleteThisPet)
            }
        }
    } 
    catch (err) 
    {
        console.log(`Oh, no. Something went wrong in the getPetsForThisOwner function. Error Info: ${err.message}`)
    }
}

const openAddNewPetForm = () => 
{
    // make form visable
    const addNewPetFormContainer = document.getElementById('add-new-pet-form-container')
    addNewPetFormContainer.style.display = "block"

    // make this btn hidden
    const btnAddNewPet = document.getElementById('btnAddNewPet')
    btnAddNewPet.style.display = "none"
    
}

const closeCreateNewPetForm = () => {
    const addNewPetFormContainer = document.getElementById('add-new-pet-form-container')
    addNewPetFormContainer.style.display = "none"

    const btnAddNewPet = document.getElementById('btnAddNewPet')
    btnAddNewPet.style.display = "block"
}

const submitNewPet = async () => 
{
    const userEnteredPetName = document.getElementById('user-entered-pet-name').value
    const userEnteredPetType = document.getElementById('user-entered-pet-type').value
    const _ownerID = await ownerIdData.getOwnerIDCookie();

    const petDetails = {
        ownerID: _ownerID,
        name: userEnteredPetName,
        type: userEnteredPetType
    }

    await petData.createNewPet(petDetails)
    location.reload()
}

const deleteThisPet = (e) => 
{ 
    const petCardID = e.target.closest('.pet-card').id;
    petData.deletePet(petCardID)
    location.reload()
}

const addClickEvents = () => 
{
    const btnAddNewPet = document.getElementById('btnAddNewPet')
    btnAddNewPet.addEventListener("click", openAddNewPetForm)

    const btnCloseCreateNewPetForm = document.getElementById('btnCloseCreateNewPetForm')
    btnCloseCreateNewPetForm.addEventListener("click", closeCreateNewPetForm)

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