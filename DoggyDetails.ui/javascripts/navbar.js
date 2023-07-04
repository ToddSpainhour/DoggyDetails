
class NavBar extends HTMLElement
{
    constructor()
    {
        super();
        this.innerHTML = 
        `<nav>
            <div class="logo-container">
                <h1>Doggy Details</h1>
            </div>
            <div class="navbar-elements-container">
                <div>
                    <a href="index.html" class="navbar-element">Welcome</a>
                </div>
                <div id="create-account-button-container">
                    <a href="createAccount.html" class="navbar-element">Create Account</a>
                </div>
                <div id="logout-button-container">
                    <button id="btnLogout" class="navbar-element">Logout</button>
                </div>
            </div>
        </nav>`
    }
}

window.customElements.define('nav-bar', NavBar);

const logoutBtnClick = () => {
    document.cookie = "OwnerID=0";
    window.location.replace('./index.html');
}

const addNavbarEventListeners = () => 
{
    const btnLogout = document.getElementById("btnLogout");
    btnLogout.addEventListener("click", logoutBtnClick);
}

addNavbarEventListeners();
