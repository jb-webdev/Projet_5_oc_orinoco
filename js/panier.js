// ===========================================================================
// ================== changement de page / nous sommes a la page panier ======
// ===========================================================================


// // ================== création de la ligne panier ==============
let lectureObjet = localStorage.getItem("panier"); // on cree une variable pour recuperer notre objet du localstorage

let objJson = JSON.parse(lectureObjet); // on parse l'objet pour pouvoir le traiter
console.log(objJson[0].name); // on controle que l'on recupere l'e nom de l'objet numero 1
console.log(objJson.length); // on controle que l'on optien bien les deux objets

for (i = 0; i < objJson.length; i++) {
    // ====== on affiche la photo de notre article ======
    const colImage = document.querySelector(".colPanierImage");

    const imagePanier = document.createElement('img');
    imagePanier.className = ('imageDuPanier');
    imagePanier.src += objJson[i].image;
    colImage.appendChild(imagePanier);

    // ====== on affiche le nom de notre article ======

    const colName = document.querySelector(".colPanierName");  

    const namePanier = document.createElement("p");
    namePanier.className = ("namePanier");
    namePanier.innerHTML = objJson[i].name; 
    colName.appendChild(namePanier);

    // ====== on affiche le prix de notre article ======
    const colPrice = document.querySelector(".colPanierPrice");

    const pricePanier = document.createElement("p");
    pricePanier.className = ("pricePanier");
    pricePanier.setAttribute ("value", pricePanier.innerHTML);
    pricePanier.innerHTML = objJson[i].price + ' ' + '€';
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
    textMontant.innerHTML =  objJson[i].price * inputBtnQuantite.innerHTML + ' ' + '€';
    montantLigne.appendChild(textMontant);

    // // =========== on affiche le resultat du montant a payer ==========
    let montantPanier = (objJson[0].price * 1) + (objJson[1].price * 1); // j'ai réussi a en faire des number et non des string
    const textMontantTotal = document.querySelector(".formMontantP");
    textMontantTotal.innerHTML = montantPanier + ' ' + '€';
    }
    
    