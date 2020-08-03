// ==============================================================================
//================= page  information produit ===================================
//===============================================================================

// ===================    on recupere l'id produit dans l'adresse URL =========== 
let paramsString = new URLSearchParams(window.location.search);

const id = paramsString.get("id");

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
 
    const prodSel = document.getElementById("produitSelectionner"); // je crée une constante pour recuperer ma balise section avec son id

        const boxSel = document.createElement('div');  // je crée une balise div
        boxSel.className = "boxSelection";  // je lui donne un nom de class
        prodSel.appendChild(boxSel);        // j'insere ma div dans la section

        // === création balise pour l'image ===
        const divBoxSelmg = document.createElement('img');
        divBoxSelmg.className = 'boxSelectionImg';
        divBoxSelmg.setAttribute("alt", response.name);
        divBoxSelmg.setAttribute("title", "super appareil photo" + " " + response.name);
        divBoxSelmg.src = response.imageUrl;
        boxSel.appendChild(divBoxSelmg);
        
// === création balise pour le nom du produit ===
        const divBoxName = document.createElement('p');
        divBoxName.className = "boxSelectionName box";
        divBoxName.innerHTML += response.name;  // divBoxName.innerHTML += response[i].name;
        boxSel.appendChild(divBoxName);

// === création balise pour la description du produit ===
        const divBoxDescription = document.createElement('p');
        divBoxDescription.className = "boxSelectionDescription";
        divBoxDescription.innerHTML += response.description;
        boxSel.appendChild(divBoxDescription);

// === création balise pour les options des lentilles ===        
        const divBoxLentilles = document.createElement('div');
        divBoxLentilles.className = "boxSelectionLentilles box";
        boxSel.appendChild(divBoxLentilles);

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
// ====================================================   
// ======== Div Prix et btn Panier ====================
// ====================================================

// === création balise pour acceuilir le prix et les boutons panier ===
         const divBoxPanier = document.createElement('div');
         divBoxPanier.className = "boxSelectionBtnPanier";
         boxSel.appendChild(divBoxPanier);

 // === création balise pour le prix ==================
         const divBoxPrice = document.createElement('p');
         divBoxPrice.className = "boxSelectionPrice box";
         divBoxPrice.innerHTML += "Prix : " + " " + response.price /100 + ' ' + '€';
         divBoxPanier.appendChild(divBoxPrice);
 
// === création bouton ajout au panier =================
         const btnPanier = document.createElement('button');  // on cree une balise a pour le liens vers la page info produit
         btnPanier.className = "btnPanier btn";      // on lui donne une classe
         btnPanier.setAttribute("type", "button");
         btnPanier.setAttribute("value", "acheter");// on affiche un  message
         btnPanier.innerHTML = "ajouter";
         divBoxPanier.appendChild(btnPanier); // on insert notre balise a dans la div

         const creatForm = document.createElement("form");
         creatForm.className = "formPanier";
         divBoxPanier.appendChild(creatForm);
    //======= on créer un input pour le bouton "-" quantité produit

         const inputBtnNeg = document.createElement("button");
         inputBtnNeg.className = "btnNeg";
         inputBtnNeg.setAttribute("type", "button");
         inputBtnNeg.innerHTML = "-";

         creatForm.appendChild(inputBtnNeg);

    //======= on créer un input pour le text quantité produit

         let inputBtnQuantite = document.createElement("p");
         inputBtnQuantite.className = "inputPanier";
         inputBtnQuantite.innerHTML = 1; // === on affiche une quantité minimum pour la commande
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
            if (inputBtnQuantite.innerHTML >= 2) {
                inputBtnQuantite.innerHTML --;
        } 
    });
         
        document.querySelector(".btnPos").addEventListener("click", function() {
            inputBtnQuantite.innerHTML ++; 
    });


// =========== on recupere les valeurs pour crée notre ligne panier ============

let monStockage = localStorage;
// console.log(monStockage); // essai rajouter vendredi 17/07/2020
let windowImageArticle = response.imageUrl; // on crée des variables pour stocker nos donnée articles pour les réutiliser plus tard
let windowNameArticle = response.name;
let windowPriceArticle = response.price/100;

let panier = []; // on cree une variable pour nos objets

class Objs {        // je cree une class pour stocker mes informations article
    constructor (id, image, nom, prix, quantite) {
        this.id = id;
        this.image = image;
        this.name = nom;
        this.price = prix;
        this.quantite = quantite
    }
} 
//je declare les variables
let lectureQuantite;
let recupQuantiteLocal;
let premierObj;
let deuxiemeObj;

let objsUn;

let lectureObjet;  // on cree une variable pour recuperer notre objet du localstorage
let objJson;  // on parse l'objet pour pouvoir le traiter

// affichage quantite panier
// console.log(id);
document.querySelector('.panierNav').innerHTML = localStorage.getItem("quantite");

// j'utilise un ecouteur d'evenements pour ajouter mes informations choisi par l'utilisateur
// let valeurPanier = document.querySelector('.panierNav').innerHTML = 0;

document.querySelector(".btnPanier").addEventListener('click', function() {
    if (monStockage.length == 0) {
        premierObj = new Objs (
            id,
            windowImageArticle,
            windowNameArticle,
            windowPriceArticle,
            inputBtnQuantite.innerHTML
        )
        panier.push(premierObj); // je pousse les info pour creer mon objet avec la classe Objs
        localStorage.setItem("panier", JSON.stringify(panier)); // je pousse les valeurs de mon Objet panier dans le localStarage avec la clé "panier"
        lectureObjet = localStorage.getItem("panier"); // je recupere les informations avec la methode get pour controler la presernce de mon objet dans le localStorage
        objJson = JSON.parse(lectureObjet); // je parse les info pour pouvoir les trater
        console.log(panier.length);
        // on affiche la quantite au panier
        localStorage.setItem("quantite", panier.length);
        lectureQuantite = localStorage.getItem("quantite");
        // on affiche le nombre d'article dans le panier nav
        document.querySelector('.panierNav').innerHTML = lectureQuantite;

    }else if (monStockage.length > 0) {
        lectureObjet = localStorage.getItem("panier"); // je recupere les informations avec la methode get pour controler la presence de mon objet dans le localStorage
        objJson = JSON.parse(lectureObjet); // je parse les infos pour pouvoir les traiter
        
        
            for(i = 0 ; i < objJson.length; i++) {
                objsUn = new Objs (
                    objJson[i].id,
                    objJson[i].image,
                    objJson[i].name,
                    objJson[i].price,
                    objJson[i].quantite
                )
                panier.push(objsUn);
            }
            deuxiemeObj = new Objs (
                id,
                windowImageArticle,
                windowNameArticle,
                windowPriceArticle,
                inputBtnQuantite.innerHTML
            )
            panier.push(deuxiemeObj);
            localStorage.setItem("panier", JSON.stringify(panier)); // je pousse les valeurs de mon Objet panier dans le localStarage avec la clé "panier" 
            recupQuantiteLocal = localStorage.getItem("quantite"),

            // console.log(recupQuantiteLocal);
            recupQuantiteLocal ++;
            localStorage.setItem("quantite", recupQuantiteLocal);
            document.querySelector('.panierNav').innerHTML = localStorage.getItem("quantite");

    }
})
    

});