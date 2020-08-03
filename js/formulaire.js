// ==== je creer mes fonctions pour la pages en cours =============
//=================================================================

// je creer une fonction avec les input formlaire.
let ajouterFomrulaire = function () {
    // === j'affiche un message dans la balise h2
    const h2Titre = document.getElementById("h2Titre");
    h2Titre.innerHTML = "votre formulaire de commande";

    // === on crée nos formulaires 
    const formulaireInput = document.getElementById("inscription");  // je recupere la balise form
    
    const inputLastname = document.createElement('input');
    inputLastname.setAttribute('type', 'text');
    inputLastname.setAttribute('name', 'nom');
    inputLastname.id = "inputBoxFormNom";
    inputLastname.setAttribute('placeholder', 'votre nom');
    inputLastname.setAttribute("required", "required");
    formulaireInput.appendChild(inputLastname);
    
    const inputFirstname = document.createElement('input');
    inputFirstname.setAttribute('type', 'text');
    inputFirstname.setAttribute('name', 'prenom');
    inputFirstname.id = "inputBoxFormPrenom";
    inputFirstname.setAttribute('placeholder', 'votre prénom');
    inputFirstname.setAttribute("required", "required");
    formulaireInput.appendChild(inputFirstname);
    
    const inputAdresse = document.createElement('input');
    inputAdresse.setAttribute('type', 'text');
    inputAdresse.setAttribute('name', 'adresse');
    inputAdresse.id = "inputBoxFormAdresse";
    inputAdresse.setAttribute('placeholder', 'votre adresse');
    inputAdresse.setAttribute("required", "required");
    formulaireInput.appendChild(inputAdresse);
    
    const inputCity = document.createElement('input');
    inputCity.setAttribute('type', 'text');
    inputCity.setAttribute('name', 'ville');
    inputCity.id = "inputBoxFormVille";
    inputCity.setAttribute('placeholder', 'votre Ville');
    inputCity.setAttribute("required", "required");
    formulaireInput.appendChild(inputCity);
    
    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('name', 'email');
    inputEmail.id = "inputBoxFormEmail";
    inputEmail.setAttribute('placeholder', 'votre email');
    inputEmail.setAttribute("required", "required");
    formulaireInput.appendChild(inputEmail);
    
    const inputEmailConfirm = document.createElement('input');
    inputEmailConfirm.setAttribute('type', 'email');
    inputEmailConfirm.setAttribute('name', 'emailConfirm');
    inputEmailConfirm.id = "inputBoxFormEmailConfirm";
    inputEmailConfirm.setAttribute('placeholder', 'confirmation mail');
    inputEmailConfirm.setAttribute("required", "required");
    formulaireInput.appendChild(inputEmailConfirm);
    
    const inputBtnConfirm = document.createElement('input');
    inputBtnConfirm.setAttribute('type', 'button');
    inputBtnConfirm.setAttribute('value', 'Valider votre commande');
    inputBtnConfirm.className = "btnInputEnvoyerFormulaire";
    formulaireInput.appendChild(inputBtnConfirm);

    const messageErreur = document.createElement('p');
    messageErreur.id = "erreur";
    formulaireInput.appendChild(messageErreur);
};
// =========================== fin de la fonction ajout formulaire =======================
// ===========================================================================================
// =============================  function pour envoi du formulaire de commande =============
let monstockageUser = localStorage;
let  fonctionEnvoiFormulmaire = function () {

    lectureObjet = localStorage.getItem("panier"); // je recupere les informations avec la methode get pour controler la presence de mon objet dans le localStorage
    objJson = JSON.parse(lectureObjet); // je parse les infos pour pouvoir les traiter 
    // je creer mon array pour les produit à envoyer
    let idProducs = [];
    for(i = 0 ; i < objJson.length; i++) {
        idProducs.push(objJson[i].id);
    };
    // ============= format objet pour l'utilisateur ===========================
    
    // on cree une variable pour nos objets
    let contact = {
        firstName: document.getElementById("inputBoxFormPrenom").value,
        lastName: document.getElementById("inputBoxFormNom").value,
        address: document.getElementById("inputBoxFormAdresse").value,
        city: document.getElementById("inputBoxFormVille").value,
        email: document.getElementById("inputBoxFormEmail").value
    }; 
    //je stock les informations pour le message de remerciments
    sessionStorage.setItem("firstName", document.getElementById("inputBoxFormPrenom").value);
    sessionStorage.setItem("lastName", document.getElementById("inputBoxFormNom").value);
    // console.log (document.getElementById("inputBoxFormPrenom").value);
    //je creer un class pour le format à envoyer à l'api
     class formaToSend {  // je cree un constructeur pour preparer l'envoi
         constructor(contact, idProducs) {
             this.contact = contact;
             this.products = idProducs;
         }
     };
    const commandToSend = new formaToSend(contact, idProducs); // je pousse les infos pour l"envoi de la commande

    //  ==================== on envoie la confirmation à l'API ===============
    let urlApiPost = "http://localhost:3000/api/cameras/order";  // déclaration de la variable pour l'url choisi

    const post = function promiseApi () {              // declare un constante et on rentre une fonction promiseApi

        return new Promise((resolve, reject) => {      // on lui donne deux fonction resolve si elle tiens la promesse et reject si elle ne tiens pas ca promesse
            const xhrPost = new XMLHttpRequest();      // on utilisse la methode Ajax avec XMLRTTpRequest
        
            xhrPost.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE) { // on lui passe les conditions avec if
                    if(this.status == 200 || this.status == 201){ 
                        resolve(JSON.parse(this.responseText)); // si c'est bon on retourne le fichier JSON parsé
                    } else {
                        reject(xhrPost); // si il y a une erreur on rejette
                    }
                }
            }
            xhrPost.open("POST", urlApiPost, true);   // on envoi la requete avec l'url concaténée avec true pour la réaliser en asynchrone
            xhrPost.setRequestHeader("Content-Type", "application/json");
            xhrPost.send(JSON.stringify(commandToSend));
        })
    };
    
    post(urlApiPost).then(function(response) {
        sessionStorage.setItem("orderId", response.orderId);
    });
};
// =========================== fin function pour envoi du formulaire de commande ================
// =======================================================================================
// =========================== début de la fonction supprimer formulaire =============================
// ======== je recupere mes inputs à supprimer
let suppInputLastame = document.getElementById("inputBoxFormNom");
let suppInputFirstname = document.getElementById("inputBoxFormPrenom");
let suppInputAdresse = document.getElementById("inputBoxFormAdresse");
let suppInputCity = document.getElementById("inputBoxFormVille");
let suppInputEmail = document.getElementById("inputBoxFormEmail");
let suppInputEmail2 = document.getElementById("inputBoxFormEmailConfirm");
let suppInputbutton = document.querySelector(".btnInputEnvoyerFormulaire");

// ==== je crée ma function pour suprimer et ajouter mon message de remerciments
let supprimerFomrulaire = function () {
    suppInputLastame = document.getElementById("inputBoxFormNom");
    suppInputFirstname = document.getElementById("inputBoxFormPrenom");
    suppInputAdresse = document.getElementById("inputBoxFormAdresse");
    suppInputCity = document.getElementById("inputBoxFormVille");
    suppInputEmail = document.getElementById("inputBoxFormEmail");
    suppInputEmail2 = document.getElementById("inputBoxFormEmailConfirm");
    suppInputbutton = document.querySelector(".btnInputEnvoyerFormulaire");

    suppInputLastame.remove(); // je supprime l'elements choisi
    suppInputFirstname.remove();
    suppInputAdresse.remove();
    suppInputCity.remove();
    suppInputEmail.remove();
    suppInputEmail2.remove();
    suppInputbutton.remove();
    document.getElementById("erreur").innerHTML = "";

    // ======== je creer mes nouvelles balise pour le message de remerciment

    const paragraphe = document.getElementById("h2Titre");
    h2Titre.innerHTML = "Validation commande";

    const idMain = document.getElementById("formulaire"); 
    const messageLignUne = document.createElement('p');
    messageLignUne.id = "messageLigneUne";
    messageLignUne.innerHTML = sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName") + " " + "votre commande d'un montant de : " + sessionStorage.getItem("montantCommande") + " " + " est bien envoyée";
    idMain.appendChild(messageLignUne);
    const messageLignDeux = document.createElement('p');
    messageLignDeux.id = "messageLigneDeux";
    messageLignDeux.innerHTML = "Reference de votre commande : " + sessionStorage.getItem("orderId");
    idMain.appendChild(messageLignDeux);
    
    const messageLignTrois = document.createElement('p');
    messageLignTrois.id = "messageLigneTrois";
    messageLignTrois.innerHTML = " Toutes l'équipe d'ORINOCO vous remercie pour votre confiance !"
    idMain.appendChild(messageLignTrois);
};
// =========================== fin de la fonction supprimer formulaire =======================
//=====================================================================================
// ========= a l'ouverture de la page j'affiche =======================================

// ========== la quantite d'article dans le panier ==============================
document.querySelector('.panierNav').innerHTML = "Retour";

// ========== les formulaires ========================================
let affichage = ajouterFomrulaire(); // on affiche le formulaire à l'ouverture de la page

//  ===================================   verification formulaire ========================================

document.querySelector(".btnInputEnvoyerFormulaire").addEventListener("click", function() {
    let erreur;
    let verifPrenom = document.getElementById("inputBoxFormPrenom");
    let verifNom = document.getElementById("inputBoxFormNom");
    let verifAdresse = document.getElementById("inputBoxFormAdresse");
    let verifVille = document.getElementById("inputBoxFormVille");
    let verifEmail = document.getElementById("inputBoxFormEmail");
    let verifConfirm = document.getElementById("inputBoxFormEmailConfirm");
if (verifConfirm.value != verifEmail.value) {
    erreur = "EMAIL DIFFERENT !";
}
if (!verifConfirm.value) {
    erreur = "VEUILLEZ CONFIRMER VOTRE EMAIL !";
}
if (!verifEmail.value) {
    erreur = "VEUILLEZ RENSEIGNER VOTRE EMAIL !";
}
if (!verifVille.value) {
    erreur = "VEUILLEZ RENSEIGNER VOTRE VILLE !";
}
if (!verifAdresse.value) {
    erreur = "VEUILLEZ RENSEIGNER VOTRE ADRESSE !";
}
if (!verifPrenom.value) {
    erreur = "VEUILLEZ RENSEIGNER VOTRE PRENOM !";
}
if (!verifNom.value) {
    erreur = "VEUILLEZ RENSEIGNER VOTRE NOM !";
}
if (erreur) {
    document.getElementById("erreur").innerHTML = erreur;
} else {
    // ==== si tous est bon j'envoie la demande et j'affiche les remerciment et j'efface le localstorage ==============
    fonctionEnvoiFormulmaire();
    supprimerFomrulaire();
    localStorage.clear();
    sessionStorage.clear();
}
});

// ======================== fin verification formulaires ==============================