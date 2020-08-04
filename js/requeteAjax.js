//==================================== on lance la requête vers l'api avec AJAX  ==============================================================
let urlApi = "http://localhost:3000/api/cameras";  // déclaration de la variable pour l'url choisi

const get = function promiseApi () {              // on déclare une constante et on rentre une fonction promiseApi

    return new Promise((resolve, reject) => {      // on lui donne deux fonctions resolve si elle tiens la promesse et reject si elle ne tiens pas ça promesse
        const xhr = new XMLHttpRequest();      // on utilisse la méthode Ajax avec XMLRTTpRequest
       
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) { // on lui passe les conditions avec un if
                if(this.status == 200){ 
                    // console.log(this.status);
                    resolve(JSON.parse(this.responseText)); // si c'est bon on retourne le fichier JSON parsé
                // console.log(this.responseText);         // // on verifie la réponse du fichier JSON
                } else {
                    reject(xhr); // si il y a une erreur on rejette
                }
            }
        }
        xhr.open("GET", urlApi, true);   // on envoi la requête avec l'url concaténée avec true pour la réaliser en asynchrone
        xhr.send(); // on envoie la requête
    })
};


//==================================== on rècupere les réponses notre requête et on affiche les réponses ======================================
get(urlApi).then(function(response) {
//    console.log(response); // on contrôle la présence des objets à utilisés avant la boucle
      for (i = 0; i < response.length; i++) {
            const container = document.getElementById("catalogue");           
            const newBox = document.createElement("div");
            newBox.className = "boxProducs";
            container.appendChild(newBox);
    // insertion des images
            const newBoxImg = document.createElement('div');
            newBoxImg.className = "boxImage";
            newBox.appendChild(newBoxImg);
    
            const newBoxImgage = document.createElement('img');
            newBoxImgage.className = "newImage";
            newBoxImgage.setAttribute("alt", response[i].name);
            newBoxImgage.setAttribute("title", "super appareil photo" + " " + response[i].name);
            newBoxImgage.src = response[i].imageUrl;
            newBoxImg.appendChild(newBoxImgage);
    // insertion du nom de l'article
            const newBoxName = document.createElement("p"); // on crée un élement HTML.
            newBoxName.className = "boxName";  // on crée une classe à la div.    
            newBox.appendChild(newBoxName); // on insert la div dans la balise article.
            newBoxName.innerHTML += response[i].name; // insertion de l'elements dans la balise.
    // insertion du prix de l'article
            const newBoxPrice = document.createElement('p');
            newBoxPrice.className = "boxPrice";
            newBox.appendChild(newBoxPrice);
            newBoxPrice.innerHTML += response[i].price /100 + ' ' + '€';
    // insertion d'un bouton
            const newBoxBtn = document.createElement('div'); // on créer une balise div pour insérer notre bouton information.
            newBoxBtn.className = "boxBtn btn"  // on lui donne une classe.
            newBox.appendChild(newBoxBtn);  // on insère notre div dans la div boxProducs.
            const btnInfo = document.createElement('a');  // on crée une balise "a" pour le liens vers la page info produit.
            btnInfo.className = "btnInfo btn";      // on lui donne une classe.
            btnInfo.textContent= "Plus d'info";  // on affiche un  message.
            btnInfo.setAttribute("href", "produits.html?id=" + response[i]._id);  // on rajoutte un attribut href avec un liens et on rajoute l'id qui vient de la réponse de notre requête ajax. 
            newBoxBtn.appendChild(btnInfo); // on insert notre balise "a" dans la div.
            }

});     //à ce stade les balises 'div' sont insérées avec les réponses de notre requête.
document.querySelector('.panierNav').innerHTML = localStorage.getItem("quantite");



