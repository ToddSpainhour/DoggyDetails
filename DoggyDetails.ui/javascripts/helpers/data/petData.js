import { baseUrl } from '../constants.js'

const getPet = async (petID) =>
{
    // hit getPet endpoint
}

const createNewPet = async (petDetails) =>
{
    try
    {
        const response = await fetch(`${baseUrl}/Pets/createNewPet/${petDetails}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(petDetails),
        });
    } 
    catch (err)
    {
        console.log("Oh, no! Something went wrong in submitNewPet" + err)
    }
}

const editPet = async (petDetails) =>
{
    // hit editPet endpoint
}

const deletePet = (petID) =>
{
    // hit deletePet endpoint
    try 
    {
        fetch(`${baseUrl}/Pets/delete/${petID}`, 
        {
            method: "DELETE",
            headers: 
            {
                "Content-Type": "application/json",
            },
        })
    } 
    catch (err) 
    {
        console.log("Oh, no! Something went wrong in the deletePet function in petData.js. Error Info: " + err)
    }
}

export default { getPet, createNewPet, editPet, deletePet }
