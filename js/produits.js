let paramsString = new URLSearchParams(window.location.search);

const id = paramsString.get("id");
console.log(id);
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
    console.log(response);
    console.log(response._id)
        
    const prodSel = document.getElementById("produitSelectionner"); // je crée une const pour recuperer ma balise section avec son id

        const boxSel = document.createElement('div');  // je crée une balise div
        boxSel.className = "boxSelection";  // je lui donne un nom de class
        prodSel.appendChild(boxSel);        // j'insere ma div dans la section

        const divBoxSelmg = document.createElement('img');
        divBoxSelmg.className = 'boxSelectionImg';
        divBoxSelmg.src = response.imageUrl;
        boxSel.appendChild(divBoxSelmg);

        const divBoxName = document.createElement('div');
        divBoxName.className = "boxSelectionName";
        divBoxName.innerHTML += response.name;  // divBoxName.innerHTML += response[i].name;
        boxSel.appendChild(divBoxName);

        const divBoxDescription = document.createElement('div');
        divBoxDescription.className = "boxSelectionDescription";
        divBoxDescription.innerHTML += response.description;
        boxSel.appendChild(divBoxDescription);
        
        const divBoxLentilles = document.createElement('div');
        divBoxLentilles.className = "boxSelectionLentilles";
        boxSel.appendChild(divBoxLentilles);

        const divBoxOption = document.createElement('div');
        divBoxOption.className = 'option';
        divBoxOption.innerHTML = 'Option';
        divBoxLentilles.appendChild(divBoxOption);

        const divBoxInputChoice = document.createElement('div');
        divBoxInputChoice.className = "divInputchoice";
        divBoxOption.appendChild(divBoxInputChoice);
        // ======== insertion des option de lentilles ====================
    for (i = 0; i < response.lenses.length; i++) {
        const divBoxinput = document.createElement('div');
        divBoxinput.className = "inputSelection";
        divBoxInputChoice.appendChild(divBoxinput);

        const divBoxLense = document.createElement('input');
        divBoxLense.setAttribute("type", "radio");
        divBoxLense.id = response.lenses[i];
        divBoxLense.setAttribute("name", "lense");
        divBoxLense.setAttribute("value", response.lenses[i]);
        divBoxinput.appendChild(divBoxLense);

        const divBoxLabel = document.createElement("label");
        divBoxLabel.className = "labelLenses";
        divBoxLabel.setAttribute('for', response.lenses[i]);
        divBoxLabel.innerHTML = response.lenses[i];
        divBoxinput.appendChild(divBoxLabel);
        }  
         // ======== Div Prix et btn Panier ====================
         const divBoxPanier = document.createElement('div');
         divBoxPanier.className = "boxSelectionBtnPanier";
         boxSel.appendChild(divBoxPanier);
 
         const divBoxPrice = document.createElement('div');
         divBoxPrice.className = "boxSelectionPrice";
         divBoxPrice.innerHTML += response.price /100 + ' ' + '€';
         divBoxPanier.appendChild(divBoxPrice);
 
         const btnPanier = document.createElement('a');  // on cree une balise a pour le liens vers la page info produit
         btnPanier.className = "btnPanier";      // on lui donne une classe
         btnPanier.textContent= "j'achète";  // on affiche un  message
         btnPanier.setAttribute("href", "panier.html?id=" + response._id);
         divBoxPanier.appendChild(btnPanier); // on insert notre balise a dans la div
});   



    
// getEssai(urlApiProd).then(function(response) {
//     console.log(response);
//     console.log(response._id)
        
//     for (i = 0; i < response.lenses.length; i++) {
//         const prodSel = document.getElementById("produitSelectionner"); // je crée une const pour recuperer ma balise section avec son id

//         const boxSel = document.createElement('div');  // je crée une balise div
//         boxSel.className = "boxSelection";  // je lui donne un nom de class
//         prodSel.appendChild(boxSel);        // j'insere ma div dans la section

//         const divBoxSelmg = document.createElement('img');
//         divBoxSelmg.className = 'boxSelectionImg';
//         divBoxSelmg.src = response.imageUrl;
//         boxSel.appendChild(divBoxSelmg);

//         const divBoxName = document.createElement('div');
//         divBoxName.className = "boxSelectionName";
//         divBoxName.innerHTML += response.name;  // divBoxName.innerHTML += response[i].name;
//         boxSel.appendChild(divBoxName);

//         const divBoxDescription = document.createElement('div');
//         divBoxDescription.className = "boxSelectionDescription";
//         divBoxDescription.innerHTML += response.description;
//         boxSel.appendChild(divBoxDescription);

//         const divBoxLentilles = document.createElement('div');
//         divBoxLentilles.className = "boxSelectionLentilles";
//         boxSel.appendChild(divBoxLentilles);

//         const divBoxOption = document.createElement('div');
//         divBoxOption.className = 'option';
//         divBoxOption.innerHTML = 'Option';
//         divBoxLentilles.appendChild(divBoxOption);

//         const divBoxLense = document.createElement('div');
//         divBoxLense.className = "lenses";
//         divBoxLense.innerHTML += response.lenses[i];
//         divBoxLentilles.appendChild(divBoxLense);

//         // ======== Div Prix et btn Panier ====================
//         const divBoxPanier = document.createElement('div');
//         divBoxPanier.className = "boxSelectionBtnPanier";
//         boxSel.appendChild(divBoxPanier);

//         const divBoxPrice = document.createElement('div');
//         divBoxPrice.className = "boxSelectionPrice";
//         divBoxPrice.innerHTML += response.price /100 + ' ' + '€';
//         divBoxPanier.appendChild(divBoxPrice);

//         const btnPanier = document.createElement('a');  // on cree une balise a pour le liens vers la page info produit
//         btnPanier.className = "btnPanier";      // on lui donne une classe
//         btnPanier.textContent= "j'achète";  // on affiche un  message
//         btnPanier.setAttribute("href", "panier.html?id=" + response._id);
//         divBoxPanier.appendChild(btnPanier); // on insert notre balise a dans la div
//         }  
// }); 

