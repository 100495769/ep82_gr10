function openSignInForm() {
    document.getElementById("popupIniciar").style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeSignInForm() {
    document.getElementById("popupIniciar").style.display = "none";
    document.body.style.overflow = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

// this part should be actually in the users.json but since we dont have
// a registration yet, here is a little simulation of filling up the local storage
// to keep users logged - logic is correct but need a localStorage file
const users = {
    "users": {
        "peepoo": { password: "ilovepoop", loginStatus: true },
        "poopee": { password: "ilovepoop", loginStatus: false }
    }
};

const usersString = JSON.stringify(users);

localStorage.setItem("userData", usersString);

function checkItem() {
    let enteredUsername = document.getElementById("username").value;
    let enteredPassword = document.getElementById("password").value;

    const userInfo = localStorage.getItem("userData");

    if (userInfo) {
        const obj = JSON.parse(userInfo);

        if (enteredUsername in obj.users) {
            if (obj.users[enteredUsername].password === enteredPassword) {
                //window.confirm("You are registered!");
                obj.users[enteredUsername].loginStatus = true;
                localStorage.setItem("username", enteredUsername);
                localStorage.setItem("userData", JSON.stringify(obj));
                closeSignInForm();
                isLoggedIn();
            } else {
                alert("Wrong password!");
                document.getElementById("password").value = "";
            }
        } else {
            alert("You are not registered!");
            document.getElementById("password").value = "";
        }
    }
    return false;
}

function isLoggedIn () {
    const userInfo = localStorage.getItem("userData");
    const enteredUsername = localStorage.getItem("username");
    if (userInfo) {
        const obj = JSON.parse(userInfo);
        if (obj.users[enteredUsername].loginStatus === true) {
            $('#signIn, #registrar').remove();
            $('#Navegacion').append(`
            <div class="dropdown" id="drop-down">
                <img onclick="showDropDown()" class="login-button" src="photos/login-icon.png" alt="login icon" id="log-icon">
                <div id="showDropDown" class="dropdown-content">
                    <a id="#profile">Mi Perfil</a>
                    <a id="#mis-cartas" onclick="lasCartasPopUp()">Mis cartas</a>
                    <a id="#log-out" onclick="return confirmLogOut()">Cerrar sesión</a>
                </div>
            </div>
        `);
        }
    }
}

function confirmLogOut() {
    let result = confirm("Log out?");
    if (result) {
        logOut();
    }
}

window.onload = function() {
    isLoggedIn();
};

function logOut() {
    const userInfo = localStorage.getItem("userData");
    if (userInfo) {
        const obj = JSON.parse(userInfo);
        const username = localStorage.getItem("username");

        obj.users[username].isLoggedIn = false;

        localStorage.setItem("userData", JSON.stringify(obj));

        $('#log-icon, #drop-down').remove();
        $('#Navegacion').append(`
            <div class="menu-buttons" onclick=" openSignInForm
        ()" id="signIn">Sign In</div>
            <div class="menu-buttons" id="registrar" onclick="openRegistrationForm()">Registrar</div>
        `);
    }
}

function showDropDown() {
    document.getElementById("showDropDown").classList.toggle("show");
}

function hideDropDown() {
    const dropdown = document.getElementById("showDropDown");
    dropdown.classList.remove("show");
}

function lasCartasPopUp() {
    document.getElementById("LasCartas").style.display = "block";
    document.body.style.overflow = "hidden";
    hideDropDown();
}

function closeLasCartasPopUp() {
    document.getElementById("LasCartas").style.display = "none";
    document.body.style.overflow = "";
}
