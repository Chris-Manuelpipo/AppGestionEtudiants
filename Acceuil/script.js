// let message 
// let user = localStorage.getItem('users')

// user = document.getElementById(user)
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "etudiant") {
    alert("Accès refusé !");
    window.location.href = "../Connexion/login.html";
}
document.addEventListener("DOMContentLoaded", function () {
  let username = localStorage.getItem('username')();
  if (username) {
    document.getElementById('Hi').textContent = `Salut ${username} !`;
  }
});
