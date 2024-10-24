

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
                //window.confirm("You are registered!");
                isLoggedIn = true;
                $('#signIn, #registrar').remove();
                $('#Navegacion').append(`
                    <a onclick="openSignInForm()">
                        <img class="login-button"  src="photos/login-icon.png" alt="login icon">
                    </a>
                `);
                closeSignInForm();
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

