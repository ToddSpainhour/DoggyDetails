import { baseUrl } from './helpers/constants.js'

const getAllOwners = async () => 
{
    const url = `${baseUrl}/Owners/GetAllOwners`;

    try 
    {
        let response = await fetch(url);
        let ownersAsText = await response.text();
        console.log(ownersAsText);
    } 
    catch (err) 
    {
        console.log(`Oh, no! Something went wrong in the getAllOwners function. Error Info: ${err.message}`) 
    }

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
