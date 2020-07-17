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

// === création bouton pour suprimer du panier ==========
         const btnPanierSup = document.createElement('button');
         btnPanierSup.className = "btnPanierSupprimer btn";      
         btnPanierSup.setAttribute("type", "button");
         btnPanierSup.setAttribute("value", "suprimer");
         btnPanierSup.innerHTML = "supprimer";
         divBoxPanier.appendChild(btnPanierSup); // on insert notre balise a dans la div

// =========== on recupere les valeurs pour crée notre ligne panier ============

let monStockage = localStorage;
// console.log(monStockage); // essai rajouter vendredi 17/07/2020
let windowImageArticle = response.imageUrl; // on crée des variables pour stocker nos donnée articles pour les réutiliser plus tard
let windowNameArticle = response.name;
let windowPriceArticle = response.price/100;

let panier = []; // on cree une variable pour nos objets

class Objs {
    constructor (image, nom, prix) {
        this.image = image;
        this.name = nom;
        this.price = prix;
    }
} 
let premierObj
let objUn;
let objDeux;

document.querySelector(".btnPanier").addEventListener('click', function() {
    
    if (monStockage.length == 0) {
        premierObj = new Objs (
            windowImageArticle,
            windowNameArticle,
            windowPriceArticle
        )
        panier.push(premierObj);
        localStorage.setItem("panier", JSON.stringify(panier));
        console.log(panier);
        console.log("ok le stokage etait vide maintenant il y a !" + monStockage.length);

    }else if (monStockage.length > 0){
        objUn = new Objs (
            localStorage.getItem('photoArticle'),
            localStorage.getItem('nameArticle'),
            localStorage.getItem('priceArticle')
        )
        objDeux = new Objs (
            windowImageArticle,
            windowNameArticle,
            windowPriceArticle
        )

        panier.push(objUn);
        panier.push(objDeux);
        localStorage.clear('photoArticle', response.imageUrl);
        localStorage.clear('nameArticle', response.name);
        localStorage.clear('priceArticle', response.price/100);
        document.querySelector('.panierNav').innerHTML = "Vide";

        localStorage.setItem("panier", JSON.stringify(panier));
        console.log(monStockage);   

        console.log("le stokage est plein il y a " + monStockage.length);
        console.log(panier);
    }
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