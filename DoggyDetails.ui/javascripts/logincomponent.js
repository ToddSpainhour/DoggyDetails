import { baseUrl } from './helpers/constants.js'
import OwnerIDData from './helpers/data/OwnerIDData.js';

class LoginComponent extends HTMLElement 
{
    constructor()
    {
        super();
        this.innerHTML =
        `<div id="login-component-container">
            <input id="loginAccountEmail" placeholder="Account Email" maxlength="50" required></input>
            <input id="loginAccountPassword" placeholder="Password" maxlength="50" required></input>
            <button id="btnLogin">Login</button>
        </div>
        ` 
    }
}

window.customElements.define('login-component', LoginComponent)

const AttemptLogin = async () => 
{
    const accountEmail = document.getElementById('loginAccountEmail').value;
    const accountPassword = document.getElementById('loginAccountPassword').value;

    const loginInfo = {
        firstName: null,
        lastName: null,
        accountEmail: accountEmail,
        accountPassword: accountPassword,
    }

    try 
    {
        const response = await fetch(`${baseUrl}/Owners/login/${loginInfo}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(loginInfo),
        });
    
        const OwnerID = await response.text();
        document.cookie = `OwnerID=${OwnerID};`;
        pushToDashboard();
    } 
    catch (err) 
    {
        console.log(`Oh, no! Something went wrong in the AttemptLogin function. Error Info: ${err.message}`) 
    } 
}

const pushToDashboard = () => {
    window.location.replace('./dashboard.html');
}

const addEventListeners = () => 
{
    const loginbtn = document.getElementById("btnLogin");
    loginbtn.addEventListener("click", AttemptLogin)
}

const init = () => 
{
    addEventListeners();
}

init();