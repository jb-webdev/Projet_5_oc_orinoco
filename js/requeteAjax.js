//==================================== on lance la requete vers l'api avec AJAX
let urlApi = "http://localhost:3000/api/cameras";  // déclaration de la variable pour l'url choisi

const get = function promiseApi () {              // declare un constante et on rentre une fonction promiseApi

    return new Promise((resolve, reject) => {      // on lui donne deux fonction resolve si elle tiens la promesse et reject si elle ne tiens pas ca promesse
        const xhr = new XMLHttpRequest();      // on utilisse la methode Ajax avec XMLRTTpRequest
       
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) { // on lui passe les conditions avec if
                if(this.status == 200){ 
                //resolve(xhr.responseText)     // on verifie la réponse
                    resolve(JSON.parse(this.responseText)); // si c'est bon on retourne le fichier JSON parsé
                console.log(this.responseText);         // // on verifie la réponse du fichier JSON
                } else {
                    reject(xhr); // si il y a une erreur on rejette
                }
            }
        }
        xhr.open("GET", urlApi, true);   // on envoi la requete avec l'url concaténée avec true pour la réaliser en asynchrone
        xhr.send(); // on envoie la requete
    })
};

get(urlApi).then(function(response) {
    console.log(response); // je verifie a suprimer en fin de TP 
      for (i = 0; i < response.length; i++) {
            const container = document.getElementById("catalogue");           
            const newBox = document.createElement("div");
            newBox.className = "boxProducs";
            newBox.setAttribute("name", response[i]._id);       
            container.appendChild(newBox);
    // insertion des images
            const newBoxImg = document.createElement('img');
            newBoxImg.className = "boxImage";
            newBox.appendChild(newBoxImg);
            newBoxImg.src = response[i].imageUrl;
    // insertion information nom de l'article
            const newBoxName = document.createElement("div"); // on crée un element HTML
            newBoxName.className = "boxName";  // on crée une classe a la div     
            newBox.appendChild(newBoxName); // on insert la div dans la balise article
            newBoxName.innerHTML += response[i].name; // insertion de l'elements dans la balise.
    // insertion du prix de l'article
            const newBoxPrice = document.createElement('div');
            newBoxPrice.className = "boxPrice";
            newBox.appendChild(newBoxPrice);
            newBoxPrice.innerHTML += response[i].price /100 + ' ' + '€';
    // insertion d'un bouton
            const newBoxBtn = document.createElement('div');
            newBoxBtn.className = "boxBtn"
            newBox.appendChild(newBoxBtn);
            const btnInfo = document.createElement('input');
            btnInfo.className = "btnInfo";
            btnInfo.setAttribute("type", "button");
            btnInfo.setAttribute("value", "Plus d'info");
            btnInfo.setAttribute("onclick", "window.location.href = 'produits.html'");
            newBoxBtn.appendChild(btnInfo);
            
            const btnPanier = document.createElement('input');
            btnPanier.className = "btnPanier";
            btnPanier.setAttribute("type", "button");
            btnPanier.setAttribute("value", "J'achète");
            newBoxBtn.appendChild(btnPanier);
            }

});     //a ce stade les balises 'div' sont insérées dans les balise article.




            // const newBoxBtn = document.createElement('div');
            // newBoxBtn.className = "boxBtn"
            // newBox.appendChild(newBoxBtn);
            // const btnInfo = document.createElement('a');
            // btnInfo.className = "btnInfo";
            // btnInfo.setAttribute("href", "produits.html");
            // btnInfo.innerHTML += "Information"
            // newBoxBtn.appendChild(btnInfo);
            
            // const btnPanier = document.createElement('a');
            // btnPanier.className = "btnPanier";
            // btnPanier.innerHTML += "Panier"
            // newBoxBtn.appendChild(btnPanier);

