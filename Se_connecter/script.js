const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const showLogin = document.getElementById("show-login");
const showRegister = document.getElementById("show-register");
const formTitle = document.getElementById("form-title");
const message = document.getElementById("message");

//Togglepassword

function togglePassword() {
    const input = document.getElementById("register-password");
    const checkbox = document.getElementById("showPassword");

    if (checkbox.checked) {
      input.type = "text"; // afficher
    } else {
      input.type = "password"; // masquer
    }
  }

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
const userTypeRadios = document.querySelectorAll('input[name="user-type"]');
const matiereContainer = document.getElementById("matiere-container");

// Pour demander à l'enseignant de choisir sa matière

userTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === "enseignant" && radio.checked) {
            matiereContainer.style.display = "flex";
        } else {
            matiereContainer.style.display = "none";
        }
    });
});


// Création de compte
registerForm.onsubmit = function (e) {
    e.preventDefault();
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;
    let role = document.querySelector('input[name="user-type"]:checked').value;
    let subject = role === "enseignant" ? document.getElementById("matiere").value : null;
    let user = {
        username:username,
        password:password,
        role: role,
        subject: subject,
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
    // let user = {
    //     username:username,
    //     password:password
    //     //status:
    // }
    let storedusers = []
    storedusers = JSON.parse(localStorage.getItem("users")) || [];
    let storedUser = storedusers.find(u => u.username === username && u.password === password);

    if (storedUser) {
    if (storedUser.username === "admin") {
        storedUser.role = "admin"; 
        storedUser.subject = null;
    }
    if (storedUser.username === "sadmin") {
        storedUser.role = "sadmin"; 
    }

    message.textContent = "Connexion réussie !";
    message.style.color = "green";
    localStorage.setItem("currentUser", JSON.stringify(storedUser));
    loginForm.reset();

    if (storedUser.role === "etudiant") {
        redirectWithDelay("../Acceuil/Acceuil.html");
    } else if (storedUser.role === "enseignant" || storedUser.role === "admin" || storedUser.role === "sadmin") {
        redirectWithDelay("../Gestion_des_etudiants/index.html");
    }

} else {
    message.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
    message.style.color = "red";
}
    // storedusers.forEach(storedUser =>{

    // if (storedUser && storedUser.username === username && storedUser.password === password) {
    //     if (storedUser.username === "admin") {
    //         role = "admin"; 
    //         storedUser.role = role; 
    //     }
    //     message.textContent = "Connexion réussie !";
    //     message.style.color = "green";
    //     localStorage.setItem("currentUser", JSON.stringify(storedUser));
    //     loginForm.reset();
    //     if (storedUser.role === "etudiant") {
    //         redirectWithDelay("../Acceuil/Acceuil.html");
    //     } else if (storedUser.role === "enseignant"|| role === "admin") {
    //         redirectWithDelay("../Gestion_des_etudiants/index.html");
    //     }
    // }else {
    //     message.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
    //     message.style.color = "red";
    // } 
    // })

    // loginForm.reset();
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
