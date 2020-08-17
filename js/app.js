//========= on gere les URLs  =================
const paramsString = new URLSearchParams(window.location.search);

const idUrl = paramsString.get("id");

const urlApi = function (){
    if (idUrl == null){
        return  "http://localhost:3000/api/cameras";
    } else {
        return "http://localhost:3000/api/cameras/" + idUrl;
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

// ============= on crée une function pour la quantité du panier dans le header =================
const headerPanier = function() {
    if (JSON.parse(localStorage.getItem("quantite")) === null){
        document.querySelector('.panierNav').innerHTML = "vide";
    }else {
        document.querySelector(".panierNav").innerHTML = JSON.parse(localStorage.getItem("quantite"));
    }
};



