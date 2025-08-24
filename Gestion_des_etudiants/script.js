//Appeler au chargement de la page
window.addEventListener('load',chargerEtudiants)

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || (currentUser.role !== "enseignant" && currentUser.role !== "admin" && currentUser.role !== "sadmin")) {
    alert("Accès refusé !");
    window.location.href = "../Se_connecter/Page1.html";
}

window.onload = function () {
    if (!currentUser) {
        alert("Accès refusé !");
        window.location.href = "../Connexion/login.html";
    }
    if (currentUser.role === "admin") {
        document.getElementById("admin").style.display = "flex";
        document.getElementById("notes").style.display = "none";
    }else if(currentUser.role === "sadmin"){
        document.getElementById("admin").style.display = "flex";
    } else {
        document.getElementById("admin").style.display = "none";
        document.getElementById("tablestudent").style.display = "none";
    }

    if (currentUser.role === "enseignant") {
        // désactiver tous les champs
        document.getElementById("AC").disabled = true;
        document.getElementById("POO").disabled = true;
        document.getElementById("BD").disabled = true;
        document.getElementById("GP").disabled = true;
        document.getElementById("TQL").disabled = true;

        // activer uniquement le champ correspondant à sa matière
        switch(currentUser.subject) {
            case "AC": document.getElementById("AC").disabled = false; break;
            case "POO": document.getElementById("POO").disabled = false; break;
            case "BD": document.getElementById("BD").disabled = false; break;
            case "GP": document.getElementById("GP").disabled = false; break;
            case "TQL": document.getElementById("TQL").disabled = false; break;
    }
};
}

document.getElementById("formEtudiant").onsubmit = function(e) {
    e.preventDefault(); 
    ajouterEtudiant();
}

//Etape 3: CRUD 
// var etudiants =[]

// let nom = document.getElementById("nom").value;
// let prenom  = document.getElementById("pre").value;
// let numéro = document.getElementById("num").value;
// let mail = document.getElementById("mail").value;

     
// var etudiant = {
// id: Date.now(),
// nom: nom,
// prenom: prenom,
// numeroEtudiant: numéro,
// email: mail ,
// notes: {}}

function ajouterEtudiant(){
    
    let nom = document.getElementById("nom").value;
    let prenom  = document.getElementById("pre").value;
    let numéro = document.getElementById("num").value;
    let mail = document.getElementById("mail").value;

    let etudiant = {
    id: Date.now(),
    nom: nom,
    prenom: prenom,
    numeroEtudiant: numéro,
    email: mail ,
    notes: {},
    moyenne : 0
    }
    console.log("etudiant", etudiant)
    let etu1
    let etudiants=[]
    etudiants=JSON.parse(localStorage.getItem("etudiants2")) || []
    etudiants.forEach(e =>{e
        let sup = document.getElementsByClassName('cell')
        Array.from(sup).forEach(el => el.remove());
    })

    console.log("taille ajouter ",etudiants.length)
    console.log("etudiants 2",etudiants)
    if((Array.isArray(etudiants)) ){
      etu1=etudiants.find((etu)=>etu.numeroEtudiant===etudiant.numeroEtudiant)
      console.log("etu1 ",etu1)
      if(etu1){
        alert("l'étudiant existe déjà")
      }else{
        console.log("etudiantsrrrrrrrrr 2",etudiants)
        etudiants.push(etudiant);
        console.log("etudiants 2",etudiants)
        localStorage.setItem("etudiants2",JSON.stringify(etudiants))
        
    
        afficherEtudiants()
        deroulante()
      }
    }else{
        etudiants=[]
        etudiants.push(etudiant);
        console.log("etudiants 2",etudiants)
        localStorage.setItem("etudiants2",JSON.stringify([etudiant]))
    
        afficherEtudiants()
        deroulante()
  }
}

function afficherEtudiants(){//Cette fonction permet d'afficher les étudiants dans le tableau
    
    let tbody = document.getElementById("tablebody");
    let etudiants=[]
    etudiants=JSON.parse(localStorage.getItem("etudiants2"))
    console.log("taille afficher ",etudiants.length)
    console.log("ma liste ",etudiants)

    etudiants.forEach(element => {let row = document.createElement("tr");
    row.innerHTML = `
      <td class = "cell">${element.nom}</td>
      <td class = "cell">${element.prenom}</td>
      <td class = "cell">${element.numeroEtudiant}</td>
      <td class = "cell">${element.email}</td>
      <td class = "cell">
        <button onclick="supprimerEtudiant('${element.numeroEtudiant}')"> Supprimer</button>
        <button onclick="calculAffichmoyenne('${element.numeroEtudiant}')"> Moyenne</button>
        <button onclick="voirNotes('${element.numeroEtudiant}')">Voir les notes</button>
      </td> `
    tbody.appendChild(row)
    
});
}

//function supprimerEtudiant
function supprimerEtudiant(numero){
    
    let confirmation = confirm("Supprimer?")
    if (confirmation){
        let etudiants = JSON.parse(localStorage.getItem("etudiants2")) || [];
        etudiants = etudiants.filter(e => e.numeroEtudiant !== numero); //impossible d'utiliser removeItem car clé unique
        localStorage.setItem("etudiants2", JSON.stringify(etudiants));
        alert("Étudiant supprimé !");
        afficherEtudiants();
    }
}

//Etape 4: Saisie de notes

//Fonction pour remplir la liste déroulante avec les étudiants
function deroulante(){

    let etudiants=[]
    etudiants=JSON.parse(localStorage.getItem("etudiants2"))
    if(etudiants.length>0){
        etudiants.forEach(e =>{
        let supd = document.getElementsByClassName('op')
        Array.from(supd).forEach(el => el.remove())
    })
    }
    console.log("taille deroulante ",etudiants.length)
    etudiants.forEach(element => {let select = document.getElementById("étudiantsderoulant");
    
    let texte = `${element.numeroEtudiant} - ${element.nom} ${element.prenom}`
    console.log(texte)
    let option = document.createElement("option")
    option.className = "op"
    option.textContent = texte
    option.value = element.numeroEtudiant
    select.appendChild(option)

});
}

//  function saisirNotes
// function saisirNotes(){
// let etudiant = {
//     id: Date.now(),
//     nom: nom,
//     prenom: prenom,
//     numeroEtudiant: numéro,
//     email: mail ,
//     notes: {}}

// let etudiantchoisi = document.getElementById("étudiantsderoulants").value
// let Analyse = parseFloat(document.getElementById("AC").value)
// let Programmation = parseFloat(document.getElementById("POO").value)
// let Base = parseFloat(document.getElementById("BD").value)
// let Gestion = parseFloat(document.getElementById("GP").value)
// let Test = parseFloat(document.getElementById("TQL").value)


// let student = etudiants.find(e => e.numéro = etudiantchoisi)
// etudiant.notes = {
//     Analyse: Analyse,
//     Programmation: Programmation,
//     Base: Base,
//     Gestion: Gestion,
//     Test: Test
// }
// }

function saisirNotes() {
    

    // Récupérer le numéro d'étudiant sélectionné dans le select
    let numeroChoisi = document.getElementById("étudiantsderoulant").value;
    console.log("Numéro choisi :", numeroChoisi);


    // Charger la liste des étudiants
    let etudiants = JSON.parse(localStorage.getItem("etudiants2")) || [];// le ||[] permet d'éviter les erreurs si la liste est vide

    // Trouver l'étudiant 
    let etu2 = etudiants.find(e => e.numeroEtudiant == numeroChoisi);

    if (!etu2) {
        alert("Étudiant non trouvé !");
        return;
    }

    // Récupérer les notes saisies
    let AC = parseFloat(document.getElementById("AC").value) || 0;
    let POO = parseFloat(document.getElementById("POO").value) || 0;
    let BD = parseFloat(document.getElementById("BD").value) || 0;
    let GP = parseFloat(document.getElementById("GP").value) || 0;
    let TQL = parseFloat(document.getElementById("TQL").value) || 0;

    // Enregistrer les notes dans l'objet étudiant
    etu2.notes = {
        "Analyse et Conception": AC,
        "Programmation Orientée Objet": POO,
        "Base de Données": BD,
        "Gestion de Projet": GP,
        "Tests et Qualité Logicielle": TQL
    };


    // Mettre à jour l'étudiant dans le tableau
    let index = etudiants.findIndex(e => e.numeroEtudiant === numeroChoisi);
    etudiants[index] = etu2;

    // Sauvegarder dans le localStorage
    localStorage.setItem("etudiants2", JSON.stringify(etudiants));

    alert(`Notes enregistrées pour ${etu2.nom} ${etu2.prenom}`);
}


//Fonction pour sauvegarder les étudiants
function sauvegarderEtudiants(){
    localStorage.setItem('etudiants', JSON.stringify(etudiants))
}

//Fonction pour charger les étudiants au démarrage
function chargerEtudiants(){
    console.log("chargement ")   
     const data = localStorage.getItem('etudiants2')
    if(data){
        etudiants = JSON.parse(data)
        afficherEtudiants()
        deroulante()
    }
}

//Fonction de calcul

// const coefficients ={
//     "Analyse et Conception": 3,
//     "Programmation Orientée Objet": 2,
//     "Base de Données": 2,
//     "Gestion de Projet": 2,
//     "Tests et Qualité Logicielle": 1
// }

function calculAffichmoyenne(numeroEtudiant){

    let etudiants = JSON.parse(localStorage.getItem("etudiants2")) || [];

    let etudiant = etudiants.find(e => e.numeroEtudiant == numeroEtudiant);
    
    const coefficients = {
        "Analyse et Conception": 3,
        "Programmation Orientée Objet": 2,
        "Base de Données": 2,
        "Gestion de Projet": 2,
        "Tests et Qualité Logicielle": 1
    };

    let totalPoints = 0;
    let totalCoefficients = 0;

    for (let matiere in coefficients) {
        const note = etudiant.notes[matiere];
        if (typeof note === "number") {
            totalPoints += note * coefficients[matiere];
            totalCoefficients += coefficients[matiere];
        }else{
            alert("Non calculable")
        }
    }

    // Évite la division par zéro
    if (totalCoefficients === 0) return 0;

    let moyenne = totalPoints / totalCoefficients;
    etudiant.moyenne = moyenne;
    console.log('moyenne',etudiant.moyenne)
    // etudiants.push(etudiant)
    console.log('etudiant', etudiant)

    localStorage.setItem('etudiants2', JSON.stringify(etudiants))
    console.log('etudiants', etudiants)

    alert(`Moyenne de ${etudiant.nom} ${etudiant.prenom} : ${moyenne}`)
}

    

// modal

function voirNotes(numeroEtudiant) {
    let etudiants = JSON.parse(localStorage.getItem("etudiants2")) || [];
    let etudiant = etudiants.find(e => e.numeroEtudiant === numeroEtudiant);

    if (!etudiant || !etudiant.notes) {
        alert("Aucune note enregistrée pour cet étudiant.");
        return;
    }

    // Créer le texte HTML des notes
    let notesHTML = `<p><strong>${etudiant.nom} ${etudiant.prenom}</strong></p><ul>`;
    for (let matiere in etudiant.notes) {
        notesHTML += `<li>${matiere} : ${etudiant.notes[matiere]}</li>`;
    }
    notesHTML += `</ul>`;

    // Afficher dans le modal
    document.getElementById("modalBody").innerHTML = notesHTML;
    document.getElementById("notesModal").style.display = "block";
}

// Fermer le modal au clic sur la croix
document.querySelector(".close").onclick = function() {
    document.getElementById("notesModal").style.display = "none";
};

// Fermer le modal si clic à l'extérieur
window.onclick = function(event) {
    if (event.target == document.getElementById("notesModal")) {
        document.getElementById("notesModal").style.display = "none";
    }
};
