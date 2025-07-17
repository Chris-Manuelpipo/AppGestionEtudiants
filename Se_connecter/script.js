const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const showLogin = document.getElementById("show-login");
const showRegister = document.getElementById("show-register");
const formTitle = document.getElementById("form-title");
const message = document.getElementById("message");

// Affichage des formulaires
showRegister.onclick = function () {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    message.textContent = "";
};

showLogin.onclick = function () {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    message.textContent = "";
};

// Création de compte
registerForm.onsubmit = function (e) {
    e.preventDefault();
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;
    let status = document.querySelector('input[name="user-type"]:checked').value;
    let user = {
        username:username,
        password:password,
        status: status
    }
    let users = []
    console.log(users)
    users = JSON.parse(localStorage.getItem("users")) || []
    verify = users.find(e => e.username === user.username)
    if (verify) {
        message.textContent = "Nom d'utilisateur déjà utilisé"
        message.style.color = "red";}
    else{
    users.push(user)
    console.log(users)
    localStorage.setItem("users", JSON.stringify(users));
    message.textContent = "Compte créé avec succès. Vous pouvez maintenant vous connecter.";
    message.style.color = "green"
    registerForm.reset();}
};

// Connexion
loginForm.onsubmit = function (e) {
    e.preventDefault();
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let user = {
        username:username,
        password:password
        //status:
    }
    let storedusers = []
    storedusers = JSON.parse(localStorage.getItem("users")) || []
    storedusers.forEach(storedUser =>{

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        message.textContent = "Connexion réussie !";
        message.style.color = "green";
        loginForm.reset()
        redirectWithDelay("../Acceuil/Acceuil.html")
    } else {
        message.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
        message.style.color = "red";
    }
    })

    loginForm.reset();
};

function redirectWithDelay(destination_page) {
    setTimeout(() => {
      window.location.href = destination_page;
    }, 2000);
}



//Interaction avec la page d'accueil: Affichage d'un message de salut de salut à l'utilisateur avec son nom

// document.getElementById('login-form').onsubmit = function(e) {
//   e.preventDefault();
//   let username = document.getElementById('login-username').value;
//   localStorage.setItem('username', username);
//   window.location.href = "../Acceuil/Acceuil.html";
// };
