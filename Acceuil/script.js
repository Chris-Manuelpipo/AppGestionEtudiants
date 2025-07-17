// let message 
// let user = localStorage.getItem('users')

// user = document.getElementById(user)

document.addEventListener("DOMContentLoaded", function () {
  let username = localStorage.getItem('username')();
  if (username) {
    document.getElementById('Hi').textContent = `Salut ${username} !`;
  }
});
