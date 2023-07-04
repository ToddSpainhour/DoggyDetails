
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
                <div>
                    <a href="createAccount.html" class="navbar-element">Create Account</a>
                </div>
            </div>
        </nav>`
    }
}

window.customElements.define('nav-bar', NavBar);
