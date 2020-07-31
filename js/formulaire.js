//on affiche la quantite d'article dans le panier
document.querySelector('.panierNav').innerHTML = "Retour";


// ============================= fonction post requet ajax ==================
let  fonctionEnvoiFormulmaire = function () {

    lectureObjet = localStorage.getItem("panier"); // je recupere les informations avec la methode get pour controler la presence de mon objet dans le localStorage
    objJson = JSON.parse(lectureObjet); // je parse les infos pour pouvoir les traiter 
    // je creer mon array pour les produit à envoyer
    let producs = [];
    for(i = 0 ; i < objJson.length; i++) {
        producs.push(objJson[i].id);
    };
    console.log(producs); // je controle que les informations sont bien preésente dans mon objet producs
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
    
     //je creer un class pour le format à envoyer à l'api
     class formaToSend {  // je cree un constructeur pour preparer l'envoi
         constructor(contact, producs) {
             this.contact = contact;
             this.producs = producs;
         }
     };

    const commandToSend = new formaToSend(contact, producs); // je pousse les infos pour l"envoi de la commande
    
    console.log(commandToSend); // je controle que mon objet "commandeToSend" contient bien les infos

    //  ==================== on envoie la confirmation à l'API ===============
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
        }
    };
    xhr.open("POST", "http://localhost:3000/api/cameras/order"), true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(commandToSend));
    }
    
    
// j'utilise un ecouter d'evenement pour envoyer ma fonction
document.querySelector(".btnInputEnvoyerFormulaire").addEventListener("click", function(){
    fonctionEnvoiFormulmaire();
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