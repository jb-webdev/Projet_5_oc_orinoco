// ==============================================================================
//================= page  information produit ===================================
//===============================================================================

// ===================    on recupere l'id produit dans l'adresse URL =========== 
let paramsString = new URLSearchParams(window.location.search);

const id = paramsString.get("id");
// console.log(id);

//===================== je cree une requete api pour recuperer les données du produit ==========================
let urlApiProd = "http://localhost:3000/api/cameras"+"/"+ id;  // déclaration de la variable pour l'url choisi

const getEssai = function promiseApiEssai () {              // declare un constante et on rentre une fonction promiseApi

    return new Promise((resolve, reject) => {      // on lui donne deux fonction resolve si elle tiens la promesse et reject si elle ne tiens pas ca promesse
        const xhrEssai = new XMLHttpRequest();      // on utilisse la methode Ajax avec XMLRTTpRequest
       
        xhrEssai.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) { // on lui passe les conditions avec if
                if(this.status == 200){ 
                //resolve(xhr.responseText)     // on verifie la réponse
                    resolve(JSON.parse(this.responseText)); // si c'est bon on retourne le fichier JSON parsé
                //console.log(this.responseText);         // // on verifie la réponse du fichier JSON
                } else {
                    reject(xhrEssai); // si il y a une erreur on rejette
                }
            }
        }
        xhrEssai.open("GET", urlApiProd, true);   // on envoi la requete avec l'url concaténée avec true pour la réaliser en asynchrone
        xhrEssai.send(); // on envoie la requete
    })
};
getEssai(urlApiProd).then(function(response) {
    // console.log(response);
    // console.log(response._id)
        
    const prodSel = document.getElementById("produitSelectionner"); // je crée une constante pour recuperer ma balise section avec son id

        const boxSel = document.createElement('div');  // je crée une balise div
        boxSel.className = "boxSelection";  // je lui donne un nom de class
        prodSel.appendChild(boxSel);        // j'insere ma div dans la section

        // === création balise pour l'image ===
        const divBoxSelmg = document.createElement('img');
        divBoxSelmg.className = 'boxSelectionImg';
        divBoxSelmg.src = response.imageUrl;
        boxSel.appendChild(divBoxSelmg);
        
// === création balise pour le nom du produit ===
        const divBoxName = document.createElement('p');
        divBoxName.className = "boxSelectionName";
        divBoxName.innerHTML += response.name;  // divBoxName.innerHTML += response[i].name;
        boxSel.appendChild(divBoxName);

// === création balise pour la description du produit ===
        const divBoxDescription = document.createElement('p');
        divBoxDescription.className = "boxSelectionDescription";
        divBoxDescription.innerHTML += response.description;
        boxSel.appendChild(divBoxDescription);

// === création balise pour les options des lentilles ===        
        const divBoxLentilles = document.createElement('div');
        divBoxLentilles.className = "boxSelectionLentilles";
        boxSel.appendChild(divBoxLentilles);

//=============== modifier css avant ============


        const divBoxOption = document.createElement('select');
        divBoxOption.className = 'option';
        divBoxOption.name = 'option';
        divBoxLentilles.appendChild(divBoxOption);

        const baliseOption = document.createElement('option');
        baliseOption.value = 'all';
        baliseOption.innerHTML = 'Option';
        divBoxOption.appendChild(baliseOption);
// ======== insertion des options des lentilles avec une boucle for ====================
    
for (i = 0; i < response.lenses.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = response.lenses[i];
    option.value = response.lenses[i];
    divBoxOption.add(option);
}    
// ======== Div Prix et btn Panier ====================

// === création balise pour acceuilir le prix et les boutons panier ===
         const divBoxPanier = document.createElement('div');
         divBoxPanier.className = "boxSelectionBtnPanier";
         boxSel.appendChild(divBoxPanier);

 // === création balise pour le prix ==================
         const divBoxPrice = document.createElement('p');
         divBoxPrice.className = "boxSelectionPrice";
         divBoxPrice.innerHTML += "Prix : " + " " + response.price /100 + ' ' + '€';
         divBoxPanier.appendChild(divBoxPrice);
 
// === création bouton ajout au panier =================
         const btnPanier = document.createElement('button');  // on cree une balise a pour le liens vers la page info produit
         btnPanier.className = "btnPanier";      // on lui donne une classe
         btnPanier.setAttribute("type", "button");
         btnPanier.setAttribute("value", "acheter");// on affiche un  message
         btnPanier.innerHTML = "ajouter";
         divBoxPanier.appendChild(btnPanier); // on insert notre balise a dans la div

// === création bouton pour suprimer du panier ==========
         const btnPanierSup = document.createElement('button');
         btnPanierSup.className = "btnPanierSupprimer";      
         btnPanierSup.setAttribute("type", "button");
         btnPanierSup.setAttribute("value", "suprimer");
         btnPanierSup.innerHTML = "supprimer";
         divBoxPanier.appendChild(btnPanierSup); // on insert notre balise a dans la div

// =========== on recupere les valeurs pour crée notre ligne panier ============

let monStockage = localStorage;

document.querySelector(".btnPanier").addEventListener('click', function() {
    localStorage.setItem('photoArticle', response.imageUrl);
    localStorage.setItem('nameArticle', response.name);
    localStorage.setItem('priceArticle', response.price/100);
    document.querySelector('.panierNav').innerHTML = "Plein";
})
document.querySelector(".btnPanierSupprimer").addEventListener('click', function() {
    localStorage.clear('photoArticle', response.imageUrl);
    localStorage.clear('nameArticle', response.name);
    localStorage.clear('priceArticle', response.price/100);
    document.querySelector('.panierNav').innerHTML = "Vide";
})
});

// =========================================================================== 
// =====================   on sort de la promise AJAX ========================
// ===========================================================================

// ===========================================================================
// ================== changement de page / nous sommes a la page panier ======
// ===========================================================================


// // ================== création de la ligne panier ==============

let locStoPhoto = localStorage.getItem('photoArticle');
let locStoName = localStorage.getItem('nameArticle');
let locStoPrice = localStorage.getItem('priceArticle');

// ====== on affiche la photo de notre article ======

const colImage = document.querySelector(".colPanierImage");

const imagePanier = document.createElement('img');
imagePanier.className = ('imageDuPanier');
imagePanier.src += locStoPhoto;
colImage.appendChild(imagePanier);

// ====== on affiche le nom de notre article ======

const colName = document.querySelector(".colPanierName");  

const namePanier = document.createElement("p");
namePanier.className = ("namePanier");
namePanier.innerHTML = locStoName; 
colName.appendChild(namePanier);

// ====== on affiche le prix de notre article ======

const colPrice = document.querySelector(".colPanierPrice");

const pricePanier = document.createElement("p");
pricePanier.className = ("pricePanier");
pricePanier.setAttribute ("value", pricePanier.innerHTML);
pricePanier.innerHTML = locStoPrice + ' ' + '€';
colPrice.appendChild(pricePanier);

// ===========================================================================
// ======= on affiche un formulaire pour gerer la quantite de produit commander
// ===========================================================================

// ====== on créer un block pour la quantité produit ======

const colInputForm = document.querySelector(".colPanierQuantite");
const inputForm = document.querySelector(".inputForm");
const creatForm = document.createElement("form");
inputForm.appendChild(creatForm);

//======= on créer un input pour le bouton "-" quantité produit

const inputBtnNeg = document.createElement("button");
inputBtnNeg.className = "btnNeg";
inputBtnNeg.setAttribute("type", "button");
inputBtnNeg.innerHTML = "-";

creatForm.appendChild(inputBtnNeg);

//======= on créer un input pour le text quantité produit

let inputBtnQuantite = document.createElement("p");
inputBtnQuantite.className = "inputPanier";

// === on affiche une quantité minimum pour la commande
let calQuantite = 1; // on creer un variable pour pouvoir modifier notre quantité et la rapeller plus tard dans le code
inputBtnQuantite.innerHTML = calQuantite;

creatForm.appendChild(inputBtnQuantite);

// ==== on créer un input pour le bouton "+" quantité produit
const inputBtnPos = document.createElement("button");
inputBtnPos.className = "btnPos";
inputBtnPos.setAttribute("type", "button");
inputBtnPos.innerHTML = "+";
creatForm.appendChild(inputBtnPos);

// =================== on utilise un ecouteur d'évenement pour modifier nos quantité et notre montant de ligne
// ===== on ecoute un evenement  'click' sur le boutton '-'
document.querySelector(".btnNeg").addEventListener("click", function() {
    if (inputBtnQuantite.innerHTML >= 1) {
        inputBtnQuantite.innerHTML --;
        textMontant.innerHTML = inputBtnQuantite.innerHTML * locStoPrice + ' ' + '€';
        textMontantTotal.innerHTML = inputBtnQuantite.innerHTML * locStoPrice + ' ' + '€';
    } 
});
// ===== on ecoute un evenement  'click' sur le boutton '+'
document.querySelector(".btnPos").addEventListener("click", function() {
    inputBtnQuantite.innerHTML ++; 
    textMontant.innerHTML = inputBtnQuantite.innerHTML * locStoPrice + ' ' + '€';
    textMontantTotal.innerHTML = inputBtnQuantite.innerHTML * locStoPrice + ' ' + '€';
});
// ====================== fin pour les boutons de quantité article ===================

// === on creer une div pour le montant de la ligne =========

const colPanierPrixTotal = document.querySelector(".colPanierPrixTotal");

const montantLigne = document.createElement("div");
montantLigne.className = "montantLigne";
colPanierPrixTotal.appendChild(montantLigne);

// ======== on creer une balise "p" pour afficher le montant total de la ligne

const textMontant = document.createElement("p");
textMontant.className = "ligneMontantBaliseP";
textMontant.innerHTML =  locStoPrice * inputBtnQuantite.innerHTML + ' ' + '€';
montantLigne.appendChild(textMontant);

// =========== on affiche le resultat du montant a payer ==========

const textMontantTotal = document.querySelector(".formMontantP");
textMontantTotal.innerHTML = locStoPrice * inputBtnQuantite.innerHTML + ' ' + '€';



