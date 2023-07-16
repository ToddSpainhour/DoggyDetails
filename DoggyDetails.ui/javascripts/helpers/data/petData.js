import { baseUrl } from '../constants.js'

const getPet = async (petID) =>
{
    // hit getPet endpoint
}

const createNewPet = async (petDetails) =>
{
    try
    {
        console.log("inside try of createNewPet in petData.js")
        const response = await fetch(`${baseUrl}/Pets/createNewPet/${petDetails}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(petDetails),
        });
        console.log("response: " + response)
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
}

export default { getPet, createNewPet, editPet, deletePet }
