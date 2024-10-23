
function openSignInForm() {
    document.getElementById("popupIniciar").style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeSignInForm() {
    document.getElementById("popupIniciar").style.display = "none";
    document.body.style.overflow = "";
}

// this part should be actually in the users.json but since we dont have
// a registration yet, here is a little simulation of filling up the local storage
const users = {
    "users": {
        "peepoo": "ilovepoop",
        "poopee": "ilovepoop20"
    }
};

const usersString = JSON.stringify(users);

localStorage.setItem("userData", usersString);
let isLoggedIn = false;
function checkItem() {
    let enteredUsername = document.getElementById("username").value;
    let enteredPassword = document.getElementById("password").value;

    const userInfo = localStorage.getItem("userData");

    if (userInfo) {
        const obj = JSON.parse(userInfo);

        if (enteredUsername in obj.users) {
            if (obj.users[enteredUsername] === enteredPassword) {
                window.confirm("You are registered!");
                isLoggedIn = true;
            } else {
                alert("Wrong password!");
            }
        } else {
            alert("You are not registered!");
        }
    }
}

//experimenting, it is not working yet
let signIn = document.getElementById('Navegacion');

function changeContent() {
    signIn.innerHTML = '<a href="home.html#Inicio">Inicio</a>\n' +
        '    <a href="home.html#PapaNoel">Papá Noel</a>\n' +
        '    <a href="home.html#LasCartas">¡Las Cartas!</a>\n' +
        '    <a href="home.html#EnviaTuCarta">Envía tu Carta</a>\n' +
        '    <a href="home.html#Juega">Juega</a>' +
        '    <a href="home.html#EnviaTuCarta">\n' +
        '        <img class="icon" src="photos/login-icon.png" alt="login icon">\n' +
        '     </a>';
}

if (isLoggedIn === true) {
    changeContent();
}