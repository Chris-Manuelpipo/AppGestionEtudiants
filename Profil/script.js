
function ouvrirEdition() {
    document.getElementById("inputNom").value = document.querySelector("header h1").innerText;
    document.getElementById("inputTitre").value = document.querySelector("header p").innerText;
    document.getElementById("inputEmail").value = document.getElementById("email").innerText;
    document.getElementById("inputTelephone").value = document.getElementById("telephone").innerText;
    document.getElementById("inputVille").value = document.getElementById("ville").innerText;
    document.getElementById("inputLinkedin").value = document.getElementById("linkedin").innerText;

    let competences = Array.from(document.querySelectorAll("#competences li")).map(li => li.innerText);
    document.getElementById("inputCompetences").value = competences.join(", ");

    document.getElementById("inputFormation").value = document.querySelector(".formations p").innerText;
    document.getElementById("inputExperience").value = document.querySelector(".experiences p").innerText;

    let langues = Array.from(document.querySelectorAll(".langues li")).map(li => li.innerText);
    document.getElementById("inputLangues").value = langues.join(", ");

    let interets = Array.from(document.querySelectorAll(".interets li")).map(li => li.innerText);
    document.getElementById("inputInterets").value = interets.join(", ");

    document.getElementById("modal").style.display = "flex";
}


function fermerModal() {
  document.getElementById("modal").style.display = "none";
}

function sauvegarder() {
    // Photo
    let fichier = document.getElementById("inputPhoto").files[0];
    if(fichier){
        let lecteur = new FileReader();
        lecteur.onload = function(e){
            document.querySelector(".cv-container img").src = e.target.result;
        }
        lecteur.readAsDataURL(fichier);
    }

    // Nom et titre
    document.querySelector("header h1").innerText = document.getElementById("inputNom").value;
    document.querySelector("header p").innerText = document.getElementById("inputTitre").value;

    // Infos personnelles
    document.getElementById("email").innerText = document.getElementById("inputEmail").value;
    document.getElementById("telephone").innerText = document.getElementById("inputTelephone").value;
    document.getElementById("ville").innerText = document.getElementById("inputVille").value;
    document.getElementById("linkedin").innerText = document.getElementById("inputLinkedin").value;

    // Compétences
    let compInput = document.getElementById("inputCompetences").value.split(",").map(c => c.trim());
    let ulCompetences = document.getElementById("competences");
    ulCompetences.innerHTML = "";
    compInput.forEach(c => {
        let li = document.createElement("li");
        li.innerText = c;
        ulCompetences.appendChild(li);
    });

    // Formation
    document.querySelector(".formations p").innerText = document.getElementById("inputFormation").value;

    // Expérience
    document.querySelector(".experiences p").innerText = document.getElementById("inputExperience").value;

    // Langues
    let languesInput = document.getElementById("inputLangues").value.split(",").map(l => l.trim());
    let ulLangues = document.querySelector(".langues ul");
    ulLangues.innerHTML = "";
    languesInput.forEach(l => {
        let li = document.createElement("li");
        li.innerText = l;
        ulLangues.appendChild(li);
    });

    // Centres d’intérêt
    let interetsInput = document.getElementById("inputInterets").value.split(",").map(i => i.trim());
    let ulInterets = document.querySelector(".interets ul");
    ulInterets.innerHTML = "";
    interetsInput.forEach(i => {
        let li = document.createElement("li");
        li.innerText = i;
        ulInterets.appendChild(li);
    });

    fermerModal();
}

document.getElementById("btnDownload").addEventListener("click", () => {
    // Sélection du conteneur du CV
    const cv = document.querySelector(".cv-container");

    // Options du PDF
    const options = {
        margin: 10,
        filename: 'CV_Chris_ETCHOME.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Générer et télécharger le PDF
    html2pdf().set(options).from(cv).save();
});
