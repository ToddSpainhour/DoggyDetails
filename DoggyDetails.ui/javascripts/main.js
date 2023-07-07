import { baseUrl } from './helpers/constants.js'

const getAllOwners = async () => 
{
    const url = `${baseUrl}/Owners/GetAllOwners`;
    let response = await fetch(url);
    let ownersAsText = await response.text();
    console.log(ownersAsText);
}

const addEventListeners = () => 
{
    const getAllOwnersButton = document.getElementById("btnGetAllOwners");
    getAllOwnersButton.addEventListener("click", getAllOwners);
}

const init = () => 
{
    addEventListeners();
}

init();
