import { baseUrl } from './helpers/constants.js'

class LoginComponent extends HTMLElement 
{
    constructor()
    {
        super();
        this.innerHTML =
        `<div id="login-component-container">
            <input id="loginAccountEmail" placeholder="Account Email"></input>
            <input id="loginAccountPassword" placeholder="Password"></input>
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