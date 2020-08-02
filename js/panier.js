

// // ================== création de la ligne panier ==============

let lectureObjet = localStorage.getItem("panier"); // on cree une variable pour recuperer notre objet du localstorage
let objJson = JSON.parse(lectureObjet); // on parse l'objet pour pouvoir le traiter

// ==========  je cree une variable pour le montant du panier ===========
let somme = 0;
function calculSomme(){
    for (i = 0; i< objJson.length; i++){
        somme += objJson[i].price * objJson[i].quantite; 
    }
}
calculSomme();
document.querySelector('.btnPanier').addEventListener("click", function() {
    localStorage.clear ("panier");
    localStorage.clear ("quantite");
});


if (localStorage.length > 1){

    document.querySelector('.h2Main').innerHTML = "Votre selection !"; // on affiche le message de la page

    const sectionBox = document.getElementById("tableauPanier"); // on recupere notre element section

    const divBoxLigne = document.createElement("div"); // on cree une div pour inserer nos articles
    divBoxLigne.className = ('indexLignePanier');  // on donne un nom de classe à notre div
    sectionBox.appendChild(divBoxLigne); // on insere notre div dans la balise section

// ===== col image ======
    const divTitrePanImage = document.createElement('div') // on cree une dive pour le titre de la colonne
    divTitrePanImage.className = "titrePanImage"; // on donne un nom de classe à notre balise
    divBoxLigne.appendChild(divTitrePanImage); // on insere notre balise dans notre ligne de titre

    const h3BoxImage = document.createElement("h3");  // cree la balise h3 pour le titre de la colonne
    h3BoxImage.className = "image"; 
    h3BoxImage.innerHTML = "Produit";
    divTitrePanImage.appendChild(h3BoxImage);
// ===== col name ======
    const divNamePanImage = document.createElement('div')
    divNamePanImage.className = "namePanImage";
    divBoxLigne.appendChild(divNamePanImage);

    const h3BoxName = document.createElement("h3");  
    h3BoxName.className = "image";
    h3BoxName.innerHTML = "Reférence";
    divNamePanImage.appendChild(h3BoxName );

// ===== col prix unitaire ======
    const divPricePanImage = document.createElement('div')
    divPricePanImage.className = "pricePanImage";
    divBoxLigne.appendChild(divPricePanImage);

    const h3BoxPrice = document.createElement("h3");  
    h3BoxPrice.className = "price";
    h3BoxPrice.innerHTML = "Prix unitaire";
    divPricePanImage.appendChild(h3BoxPrice);
    
// colonne Quantité ===========
    const divColPanQuantite = document.createElement('div');
    divColPanQuantite.className = "colPanierQuantite";
    divBoxLigne.appendChild(divColPanQuantite);

    const h3BoxQuantite = document.createElement("h3");  
    h3BoxQuantite.className = "Price";
    h3BoxQuantite.innerHTML = "Quantité";
    divColPanQuantite.appendChild(h3BoxQuantite);

// colonne PrixTotal ===========
    const divColPanPrixTotal = document.createElement('div');
    divColPanPrixTotal.className = "colPanierPrixTotal";
    divBoxLigne.appendChild(divColPanPrixTotal);

    const h3BoxPrixTotal = document.createElement("h3");  
    h3BoxPrixTotal.className = "prixTotal";
    h3BoxPrixTotal.innerHTML = "Prix total";
    divColPanPrixTotal.appendChild(h3BoxPrixTotal);
    for (i = 0; i < objJson.length; i++) {  // on cree une boucle pour afficher nos articles 
        // ====== on cree une ligne pour chaque article ======
        const ligneArticle = document.createElement("div") // pour chaque article on cree une ligne avec une div
        ligneArticle.className = "ligneArticlePanier"
        sectionBox.appendChild(ligneArticle);
        // ====== on cree une balise a pour pouvoir l'agrandir l'image au clique =======
        const balAImagePanier = document.createElement('a');
        balAImagePanier.className = ("aImage");
        balAImagePanier.setAttribute("src", objJson[i].image);
        ligneArticle.appendChild(balAImagePanier);
        // ====== on affiche l'image de l'article =======
        const imagePanier = document.createElement('img');
        imagePanier.className = ('imageDuPanier');
        imagePanier.setAttribute("alt", objJson[i].name);
        imagePanier.setAttribute("title", "super appareil photo" + " " + objJson[i].name);
        imagePanier.src += objJson[i].image;
        balAImagePanier.appendChild(imagePanier); // on insere la balise image dans la balise "a"
        // ====== on affiche le nom de notre article ====== 
        const divNamePanier = document.createElement('div');
        divNamePanier.className = "divNamePanier";
        ligneArticle.appendChild(divNamePanier);
        const namePanier = document.createElement("p");
        namePanier.className = ("namePanier");
        namePanier.innerHTML = objJson[i].name; 
        divNamePanier.appendChild(namePanier);
        // ====== on affiche le prix de notre article ======
        const divPricePanier = document.createElement('div');
        divPricePanier.className = "divPricePanier";
        ligneArticle.appendChild(divPricePanier);
        
        const pricePanier = document.createElement("p");
        pricePanier.className = ("pricePanier");
        pricePanier.setAttribute ("value", pricePanier.innerHTML);
        pricePanier.innerHTML = objJson[i].price + ' ' + '€';
        divPricePanier.appendChild(pricePanier); 
    // ============================================================================
    // ======= on affiche un formulaire pour gerer la quantite de produit commander
    // ============================================================================

    // ====== on créer un block pour la quantité produit ======
        const inputBoxQuantite = document.createElement("div");   
        inputBoxQuantite.className = "inputForm";           
        ligneArticle.appendChild(inputBoxQuantite);    
        
    //======= on créer un input pour le text quantité produit

        let inputBtnQuantite = document.createElement("p");
        inputBtnQuantite.className = "inputPanier";
        inputBtnQuantite.innerHTML = objJson[i].quantite;
        inputBoxQuantite.appendChild(inputBtnQuantite);

    // === on creer une div pour le montant de la ligne =========
        const montantLigne = document.createElement("div");
        montantLigne.className = "montantLigne";
        ligneArticle.appendChild(montantLigne);

    // ======== on creer une balise "p" pour afficher le montant total de la ligne
        
        const textMontant = document.createElement("p");
        textMontant.className = "ligneMontantBaliseP";
        textMontant.innerHTML =  objJson[i].price * objJson[i].quantite + ' ' + '€';
        montantLigne.appendChild(textMontant);  
    }
    // cree une ligne suplementaire pour le montant du panier=====================

    // box pour le calcul du panier  ===========

        const sectionCalculPanier = document.createElement('div');
        sectionCalculPanier.className = "calcPanier";
        sectionBox.appendChild(sectionCalculPanier);

        const divBoxTotal = document.createElement("div"); 
        divBoxTotal.className = ('total');  // on ndonne un nom de class à notre div
        sectionCalculPanier.appendChild(divBoxTotal); // on insere notre div dans la section

        const paragrapheTextMontant = document.createElement('p');
        paragrapheTextMontant.className = "textMontant";
        paragrapheTextMontant.innerHTML = "Montant de votre panier : ";
        divBoxTotal.appendChild(paragrapheTextMontant);

        const divBoxResultatMontant = document.createElement("div"); // on cree une div pour inserer nos articles
        divBoxResultatMontant.className = ('resultMontant');  // on donne un nom de class a notre div
        sectionCalculPanier.appendChild(divBoxResultatMontant); // on insere notre div dans la section

        const paragrapheFormMontantP = document.createElement('p');
        paragrapheFormMontantP.className = "formMontantP";
        paragrapheFormMontantP.innerHTML = somme + ' ' + '€';
        divBoxResultatMontant.appendChild(paragrapheFormMontantP);
        montantStockage = paragrapheFormMontantP.innerHTML;
        
        const boxBtn = document.createElement("div");
        boxBtn.className = ".boxBtnPanier";
        sectionBox.appendChild(boxBtn);

// ========= on creer un bouton pour la validation et envoi du formulaire ==========
        const btnValidationPanier = document.createElement('a');
        btnValidationPanier.className = "btnValidPanier btn"; 
        btnValidationPanier.setAttribute ("href", "formulaire.html"); 
        btnValidationPanier.setAttribute("type", "button");
        btnValidationPanier.setAttribute("value", "Validation panier");
        btnValidationPanier.innerHTML = "valider votre panier";
        boxBtn.appendChild(btnValidationPanier);

        // je stocke la valeur du panier avec un ecouteur d'evenement dans mon session storage
        document.querySelector(".btnValidPanier").addEventListener("click", function(){
            sessionStorage.setItem("montantCommande", montantStockage)
        });
}else{ // si non on affiche un message de panier vide !
    document.querySelector('.h2Main').innerHTML = "Votre panier est vide";
} 


////////////////////////////////////////// END ///////////////////////////////////////////////