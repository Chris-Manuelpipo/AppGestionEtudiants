const matriculeForm = document.getElementById('matriculeForm')
const tbody = document.getElementById('tbody')
const message = document.getElementById('message')
console.log('mat',matriculeForm)

matriculeForm.onsubmit = function (e) {
    e.preventDefault();
    let students = []
    let student 
    let matricule = document.getElementById("studnumber").value
    students = JSON.parse(localStorage.getItem('etudiants2')) || []
    tbody.innerHTML = '';
    message.textContent = '';

    student = students.find(s => s.numeroEtudiant === matricule)
    if(student){
        let row = document.createElement("tr");
        row.innerHTML = `
            <td >${student.notes['Analyse et Conception']}</td>
            <td >${student.notes['Programmation Orientée Objet']}</td>
            <td >${student.notes['Base de Données']}</td>
            <td >${student.notes['Gestion de Projet']}</td>
            <td >${student.notes['Tests et Qualité Logicielle']}</td>
            <td >${student.moyenne}</td>`
        console.log(row)
        tbody.appendChild(row)
    }else{
    message.textContent = "Les notes ne sont pas encore disponibles"
    }
}