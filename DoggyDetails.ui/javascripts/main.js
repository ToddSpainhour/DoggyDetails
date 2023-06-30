console.log("If you see this your javascript file is connected.");




const addEventListeners = () => {
   getAllOwnersButton = document.getElementById("getAllOwners");

   getAllOwnersButton.addEventListener("click", getAllOwners);
}

 const getAllOwners = async () => {
    console.log("you clicked the button");
    const url = "https://localhost:7260/api/Owners/GetAllOwners";
    //let promise = fetch(url);

    let response = await fetch(url);

    let ownersAsJson = await response.json();
    
    console.log(ownersAsJson);
}

const init = () => {
    addEventListeners();
}

init();

