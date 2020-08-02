// ==== je creer mes fonctions pour la pages en cours =============
//=================================================================

// je creer une fonction avec les input formlaire.
let ajouterFomrulaire = function () {
    // === j'affiche un message dans la balise h2
    const h2Titre = document.getElementById("h2Titre");
    h2Titre.innerHTML = "votre formulaire de commande";

    // === on crée nos formulaires 
    const formulaireInput = document.getElementById("formInput");  // je recupere la balise form
    
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
};
// =========================== fin de la fonction ajout formulaire =======================
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

    // ======== je creer mes nouvelles balise pouir lr message de remerciment

    const paragraphe = document.getElementById("h2Titre");
    h2Titre.innerHTML = "Validation commande";

    const idMain = document.getElementById("formulaire"); 
    const messageLignUne = document.createElement('p');
    messageLignUne.id = "messageLigneUne";
    messageLignUne.innerHTML = sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName") + " " + "votre commande d'un montant de : " + sessionStorage.getItem("montantCommande") + " " + " est bien envoyée";
    idMain.appendChild(messageLignUne);
    const messageLignDeux = document.createElement('p');
    messageLignDeux.id = "messageLigneDeux";
    messageLignDeux.innerHTML = "Reference de votre commande : ";
    idMain.appendChild(messageLignDeux);

    const messageLignTrois = document.createElement('p');
    messageLignTrois.id = "messageLigneTrois";
    messageLignTrois.innerHTML = " Toutes l'équipe d'ORINOCO vous remercie pour votre confiance !"
    idMain.appendChild(messageLignTrois);
};
// =========================== fin de la fonction supprimer formulaire =======================
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
    console.log(idProducs); // je controle que les informations sont bien preésente dans mon objet producs
    // format objet pour l'utilisateur
    
    // on cree une variable pour nos objets
    let contact = {
        Prénom: document.getElementById("inputBoxFormPrenom").value,
        nom: document.getElementById("inputBoxFormNom").value,
        adresse: document.getElementById("inputBoxFormAdresse").value,
        ville: document.getElementById("inputBoxFormVille").value,
        email: document.getElementById("inputBoxFormEmail").value
    }; 
    console.log(contact);
    //je stock les informations pour le message de remerciments
    sessionStorage.setItem("firstName", document.getElementById("inputBoxFormPrenom").value);
    sessionStorage.setItem("lastName", document.getElementById("inputBoxFormNom").value);
    // console.log (document.getElementById("inputBoxFormPrenom").value);
    //je creer un class pour le format à envoyer à l'api
     class formaToSend {  // je cree un constructeur pour preparer l'envoi
         constructor(contact, idProducs) {
             this.contact = contact;
             this.idProducs = idProducs;
         }
     };
    const commandToSend = new formaToSend(contact, idProducs); // je pousse les infos pour l"envoi de la commande
    console.log(commandToSend); // je controle que mon objet "commandeToSend" contient bien les infos

    //  ==================== on envoie la confirmation à l'API ===============
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resolve(JSON.parse(this.responseText));
            // let response = JSON.parse(this.responseText);
            // console.log(response);
        }
    };
    xhr.open("POST", "http://localhost:3000/api/cameras/order"), true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(commandToSend));


    };
// =========================== fin function pour envoi du formulaire de commande ================
//=====================================================================================
// ========= a l'ouverture de la page j'affiche =======================================

// ========== la quantite d'article dans le panier
document.querySelector('.panierNav').innerHTML = "Retour";

// ========== les formulaires 
let affichage = ajouterFomrulaire(); // on affiche le formulaire à l'ouverture de la page

// j'utilise un ecouter d'evenement pour envoyer ma fonction
document.querySelector(".btnInputEnvoyerFormulaire").addEventListener("click", function(){
    fonctionEnvoiFormulmaire();
    supprimerFomrulaire();
    localStorage.clear();
    sessionStorage.clear();
});




// ====================================================================================================================================
// ===================================== ca fonctionnne presque SAUVEGARDE AVENT DE CHANGER LES OBJET ET LES ARRAY ====================
// ====================================================================================================================================

// // ============================= fonction post requet ajax ==================
// let  fonctionEnvoiFormulmaire = function () {
//     let name = document.getElementById("inputBoxFormNom").value;
//     let firstName = document.getElementById("inputBoxFormPrenom").value;
//     let adressUser = document.getElementById("inputBoxFormAdresse").value;
//     let cityUser = document.getElementById("inputBoxFormVille").value;
//     let emailUser = document.getElementById("inputBoxFormEmail").value;
//     // console.log(firstName); // je controle que je recupere bien la valeur de la variable 
    
//     // format objet pour l'utilisateur
//     let contact = []; // on cree une variable pour nos objets
//     class infoForm {        // je cree une class pour stocker mes informations utilisateur
//         constructor (firstName, name, adress, city, email) {
//             this.firstName = firstName,
//             this.name = name,
//             this.adress = adress,
//             this.city = city,
//             this. email = email
//         }
//     };

//     // format objet pour les articles
//     let producs = []; // je cree une variable pour les infos des articles
//     class Producs {        // je cree une class pour stocker mes informations utilisateur
//         constructor (id, name, price, quantite) {
//             this.id = id,
//             this.name = name,
//             this.price = price,
//             this.quantite = quantite
//         }
//     };

//     //je creer un class pour le format à envoyer à l'api
//     let formaToSend = []; // je cree mon objet à envoyer

//     class FormatToSend {  // je cree un constructeur
//         constructor(contact, producs) {
//             this.contact = contact;
//             this.producs = producs
//         }
//     };
//     lectureObjet = localStorage.getItem("panier"); // je recupere les informations avec la methode get pour controler la presence de mon objet dans le localStorage
//     objJson = JSON.parse(lectureObjet); // je parse les infos pour pouvoir les traiter 

//     user = new infoForm (
//         firstName,
//         name,
//         adressUser,
//         cityUser,
//         emailUser
//     )
//     contact.push(user); // je pousse les informations dans mon objet contact
    
//     console.log(contact); // je controle que j'ai bien stocker mes information dans l'objet
//     // je recupere mes articles pour les stocker dans un objet

//     // j'utilise une boucle for pour recuperer les donnees des articles
//     for(i = 0 ; i < objJson.length; i++) {
//         objs = new Producs (
//         objJson[i].id,
//         objJson[i].name,
//         objJson[i].price,
//         objJson[i].quantite
//         )
//         producs.push(objs); // je pousse les informations dans mon objet producs
//     }
//     console.log(producs); // je controle que les informations sont bien preésente dans mon objet producs

//     formatObj = new FormatToSend ( 
//         contact,
//         producs
    
//     )
//     formaToSend.push(formatObj); // je pousse deux objet (contact et producs) dans mon objet formaToSend
//     console.log(formaToSend); // je controle que mon objet "formaToSend" contient bien les infos

//     //  ==================== on envoie la confirmation à l'API ===============
//     const xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             let response = JSON.parse(this.responseText);
//         }
//     };
//     xhr.open("POST", "http://localhost:3000/api/cameras/order"), true;
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(JSON.stringify(formaToSend));
//     }
    
    

// // j'utilise un ecouter d'evenement pour envoyer ma fonction
// document.querySelector(".btnInputEnvoyerFormulaire").addEventListener("click", function(){
//     fonctionEnvoiFormulmaire();
// });