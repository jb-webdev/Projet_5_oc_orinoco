//========= on gere les URLs  =================
const paramsString = new URLSearchParams(window.location.search);

const id = paramsString.get("id");

const urlApi = function (){
    if (id == null){
        return  "http://localhost:3000/api/cameras";
    } else {
        return "http://localhost:3000/api/cameras/" + id;
    };
};

//========== on lance la requête vers l'api avec AJAX  ================
const get = function promiseApi () {              // on déclare une constante et on rentre une fonction promiseApi

    return new Promise((resolve, reject) => {      // on lui donne deux fonctions resolve si elle tiens la promesse et reject si elle ne tiens pas ça promesse
        const xhr = new XMLHttpRequest();      // on utilisse la méthode Ajax avec XMLRTTpRequest
       
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) { // on lui passe les conditions avec un if
                if(this.status == 200){
                    resolve(JSON.parse(this.responseText)); // si c'est bon on retourne le fichier JSON parsé
                } else {
                    reject(xhr); // si il y a une erreur on rejette
                }
            }
        }
        xhr.open("GET", urlApi(), true);   // on envoi la requête avec l'url concaténée avec true pour la réaliser en asynchrone
        xhr.send(); // on envoie la requête
    })
};
// ============================  fin de la requete ajax  ========================

// ============= on crée un function pour la quantité du panier dans le header
const headerPanier = function() {
    document.querySelector('.panierNav').innerHTML = localStorage.getItem("quantite");
};




