// ===========================================================================
// ================== nous sommes a la page panier ======
// ===========================================================================

// // ================== création de la ligne panier ==============
let messageLignePanier;
let lectureObjet = localStorage.getItem("panier"); // on cree une variable pour recuperer notre objet du localstorage

let objJson = JSON.parse(lectureObjet); // on parse l'objet pour pouvoir le traiter
// console.log(objJson[0].name); // on controle que l'on recupere l'e nom de l'objet numero 1
// on cree une ligne panier pour afficher nos resultats
if (localStorage.length == 1){
    document.querySelector('.panierNav').innerHTML = "Plein";
    document.querySelector('.h2Main').innerHTML = "Votre selection !";

    const sectionBox = document.getElementById("tableauPanier"); // on recupere notre element section

    const divBoxLigne = document.createElement("div"); // on cree une div pour inserer nos articles
    divBoxLigne.className = ('indexLignePanier');  // on donne un nom de classe à notre div
    sectionBox.appendChild(divBoxLigne); // on insere notre div dans la section
// ===== col image ======
    const divTitrePanImage = document.createElement('div')
    divTitrePanImage.className = "titrePanImage";
    divBoxLigne.appendChild(divTitrePanImage);

    const h3BoxImage = document.createElement("h3");  // cree la balise h3 pour lke titre de la colonne
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
    for (i = 0; i < objJson.length; i++) {
        // ====== on cree une ligne pour chaque article ======
        const ligneArticle = document.createElement("div")
        ligneArticle.className = "ligneArticlePanier"
        sectionBox.appendChild(ligneArticle);
        // ====== on affiche l'image de l'article =======
        const imagePanier = document.createElement('img');
        imagePanier.className = ('imageDuPanier');
        imagePanier.src += objJson[i].image;
        ligneArticle.appendChild(imagePanier);
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
        const inputBoxQuantite = document.createElement("div");   // mette dans la boucle
        inputBoxQuantite.className = "inputForm";           // mettre dans la boucle
        ligneArticle.appendChild(inputBoxQuantite);    // mettre dans la boucle

        const creatForm = document.createElement("form");
        creatForm.className = "formPanier";
        inputBoxQuantite.appendChild(creatForm);
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
    

    // === on creer une div pour le montant de la ligne =========
        const montantLigne = document.createElement("div");
        montantLigne.className = "montantLigne";
        ligneArticle.appendChild(montantLigne);

    // ======== on creer une balise "p" pour afficher le montant total de la ligne
        
        const textMontant = document.createElement("p");
        textMontant.className = "ligneMontantBaliseP";
        textMontant.innerHTML =  objJson[i].price * inputBtnQuantite.innerHTML + ' ' + '€';
        montantLigne.appendChild(textMontant);

        // =================== on utilise un ecouteur d'évenement pour modifier nos quantité et notre montant de ligne
        // ===== on ecoute un evenement  'click' sur le boutton '-'
        document.querySelector(".btnNeg").addEventListener("click", function() {
            if (inputBtnQuantite.innerHTML >= 1) {
                inputBtnQuantite.innerHTML --;
            //    textMontant.innerHTML = inputBtnQuantite.innerHTML * objJson[i].price + ' ' + '€';
            //    textMontantTotal.innerHTML = inputBtnQuantite.innerHTML * objJson[i].price + ' ' + '€';
        } 
    });
         // ===== on ecoute un evenement  'click' sur le boutton '+'
        document.querySelector(".btnPos").addEventListener("click", function() {
        inputBtnQuantite.innerHTML ++; 
        //    textMontant.innerHTML = inputBtnQuantite.innerHTML * objJson[i].price + ' ' + '€';
        //    textMontantTotal.innerHTML = inputBtnQuantite.innerHTML * objJson[i].price + ' ' + '€';
    });

    }
    // cree une ligne suplementaire pour le montant du panier=====================

    // box pour le calcul du panier  ===========

        const sectionCalculPanier = document.createElement('div');
        sectionCalculPanier.className = "calcPanier";
        sectionBox.appendChild(sectionCalculPanier);

        const divBoxTotal = document.createElement("div"); 
        divBoxTotal.className = ('total');  // on ndonne un nom de class a notre div
        sectionCalculPanier.appendChild(divBoxTotal); // on insere notre div dans la section

        const paragrapheTextMontant = document.createElement('p');
        paragrapheTextMontant.className = "textMontant";
        paragrapheTextMontant.innerHTML = "Montant de votre panier";
        divBoxTotal.appendChild(paragrapheTextMontant);

        const divBoxResultatMontant = document.createElement("div"); // on cree une div pour inserer nos articles
        divBoxResultatMontant.className = ('resultMontant');  // on donne un nom de class a notre div
        sectionCalculPanier.appendChild(divBoxResultatMontant); // on insere notre div dans la section

        const paragrapheFormMontantP = document.createElement('p');
        paragrapheFormMontantP.className = "formMontantP";
        paragrapheFormMontantP.innerHTML = "2000 euros";
        divBoxResultatMontant.appendChild(paragrapheFormMontantP);

        // =========== on affiche le resultat du montant a payer ==========
        // let montantPanier = (objJson[i].price * 1); // j'ai réussi a en faire des number et non des string
        // console.log(montantPanier);
        // const textMontantTotal = document.querySelector(".formMontantP");
        // textMontantTotal.innerHTML = montantPanier + ' ' + '€';

        // on creer un bouton pour la validation et envoi du formulaire

        const btnValidationPanier = document.createElement('button');
        btnValidationPanier.className = "btnValidPanier btn";      
        btnValidationPanier.setAttribute("type", "button");
        btnValidationPanier.setAttribute("value", "Validation panier");
        btnValidationPanier.innerHTML = "valider votre panier";
        sectionBox.appendChild(btnValidationPanier);

        document.querySelector(".btnValidPanier").addEventListener("click", function() {
            const formValidPanier = document.createElement('form'); // je cree un champ formulaire à fficher
            formValidPanier.className = "formValPan";  // je donne un nom de class a la balise form
            sectionBox.appendChild(formValidPanier);  // j'insere la balise form dans l'element principale

            const h3ValidPanier = document.createElement("h3"); 
            h3ValidPanier.className = "titreFormPanier";
            h3ValidPanier.innerHTML = "Formulaire de validation";
            formValidPanier.appendChild(h3ValidPanier);

            const boxFormNom = document.createElement("div"); 
            boxFormNom.className = "boxFormNom";
            formValidPanier.appendChild(boxFormNom);

            const labelBoxFormNom = document.createElement("label"); 
            labelBoxFormNom.className = "labelBoxFormNom";
            labelBoxFormNom.setAttribute ("for", "nom");
            labelBoxFormNom.innerHTML = "Nom : ";
            boxFormNom.appendChild(labelBoxFormNom);
            
            const inputBoxFormNom = document.createElement("input"); 
            inputBoxFormNom.className = "inputBoxFormNom";
            inputBoxFormNom.setAttribute ("type", "text");
            inputBoxFormNom.setAttribute ("name", "Nom");
            inputBoxFormNom.setAttribute("placeHolder", "Votre nom");
            boxFormNom.appendChild(inputBoxFormNom);

            const boxFormPrenom = document.createElement("div"); 
            boxFormPrenom.className = "boxFormPrenom";
            formValidPanier.appendChild(boxFormPrenom);

            const labelBoxFormPrenom = document.createElement("label"); 
            labelBoxFormPrenom.className = "labelBoxFormPrenom";
            labelBoxFormPrenom.setAttribute ("prenom", "prenom");
            labelBoxFormPrenom.innerHTML = "Prénom : ";
            boxFormPrenom.appendChild(labelBoxFormPrenom);
            
            const inputBoxFormPrenom = document.createElement("input"); 
            inputBoxFormPrenom.className = "inputBoxFormPrenom";
            inputBoxFormPrenom.setAttribute ("type", "text");
            inputBoxFormPrenom.setAttribute ("prenom", "Prenom");
            inputBoxFormPrenom.setAttribute("placeHolder", "Votre prénom");
            boxFormPrenom.appendChild(inputBoxFormPrenom);

            const boxFormAdresse = document.createElement("div"); 
            boxFormAdresse.className = "boxFormAdresse";
            formValidPanier.appendChild(boxFormAdresse);

            const labelBoxFormAdresse = document.createElement("label"); 
            labelBoxFormAdresse.className = "labelBoxFormAdresse";
            labelBoxFormAdresse.setAttribute ("adresse", "adresse");
            labelBoxFormAdresse.innerHTML = "Adresse : ";
            boxFormAdresse.appendChild(labelBoxFormAdresse);
            
            const inputBoxFormAdresse = document.createElement("input"); 
            inputBoxFormAdresse.className = "inputBoxFormAdresse";
            inputBoxFormAdresse.setAttribute ("type", "text");
            inputBoxFormAdresse.setAttribute ("adresse", "Adresse");
            inputBoxFormAdresse.setAttribute("placeHolder", "Votre adresse");
            boxFormAdresse.appendChild(inputBoxFormAdresse);

            const boxFormVille = document.createElement("div"); 
            boxFormVille.className = "boxFormVille";
            formValidPanier.appendChild(boxFormVille);

            const labelBoxFormVille = document.createElement("label"); 
            labelBoxFormVille.className = "labelBoxFormAdresse";
            labelBoxFormVille.setAttribute ("Ville", "Ville");
            labelBoxFormVille.innerHTML = "Ville : ";
            boxFormVille.appendChild(labelBoxFormVille);
            
            const inputBoxFormVille = document.createElement("input"); 
            inputBoxFormVille.className = "inputBoxFormVille";
            inputBoxFormVille.setAttribute ("type", "text");
            inputBoxFormVille.setAttribute ("Ville", "Ville");
            inputBoxFormVille.setAttribute("placeHolder", "Votre ville");
            boxFormVille.appendChild(inputBoxFormVille);

            const boxFormEmail = document.createElement("div"); 
            boxFormEmail.className = "boxFormEmail";
            formValidPanier.appendChild(boxFormEmail);

            const labelBoxFormEmail = document.createElement("label"); 
            labelBoxFormEmail.className = "labelBoxFormEmail";
            labelBoxFormEmail.setAttribute ("for", "email");
            labelBoxFormEmail.innerHTML = "Courriel : ";
            boxFormEmail.appendChild(labelBoxFormEmail);
            
            const inputBoxFormEmail = document.createElement("input"); 
            inputBoxFormEmail.className = "inputBoxFormEmail";
            inputBoxFormEmail.setAttribute("type", "email");
            inputBoxFormEmail.setAttribute("name", "email");
            inputBoxFormEmail.setAttribute("placeHolder", "utilisateur@domaine.fr");
            boxFormEmail.appendChild(inputBoxFormEmail);

            const btnValidFormulaire = document.createElement("input");
            btnValidFormulaire.className = "inputBtnValidForm";
            btnValidFormulaire.setAttribute("type", "submit");
            btnValidFormulaire.setAttribute("value", "Envoyer");

            formValidPanier.appendChild(btnValidFormulaire);
            
        
            // const h3formValpan = document.createElement('div');
            // h3formValpan.className = "h3essai";
            // h3formValpan.innerHTML = "ca fonctionne bien c'est bon ça";
            // divFormValidPanier.appendChild(h3formValpan);
            btnValidationPanier.setAttribute("disabled", "disabled"); // on désactive le bouton
        });
       
}else{
    document.querySelector('.h2Main').innerHTML = "Votre panier est vide";
}


//===========================================================================================
//==================== ne pas toucher c'est une sauvegarde  qui fonctionne ==================
//===========================================================================================
    
// let inputBtnQuantite = document.createElement("p");
// inputBtnQuantite.className = "inputPanier";

// // === on affiche une quantité minimum pour la commande
// let calQuantite = 1; // on creer un variable pour pouvoir modifier notre quantité et la rapeller plus tard dans le code
// inputBtnQuantite.innerHTML = calQuantite;

// creatForm.appendChild(inputBtnQuantite);

// // ==== on créer un input pour le bouton "+" quantité produit
// const inputBtnPos = document.createElement("button");
// inputBtnPos.className = "btnPos";
// inputBtnPos.setAttribute("type", "button");
// inputBtnPos.innerHTML = "+";
// creatForm.appendChild(inputBtnPos);
// // =================== on utilise un ecouteur d'évenement pour modifier nos quantité et notre montant de ligne
// // ===== on ecoute un evenement  'click' sur le boutton '-'
// document.querySelector(".btnNeg").addEventListener("click", function() {
//      if (inputBtnQuantite.innerHTML >= 1) {
//          inputBtnQuantite.innerHTML --;
//         textMontant.innerHTML = inputBtnQuantite.innerHTML * objJson[i].price + ' ' + '€';
//         textMontantTotal.innerHTML = inputBtnQuantite.innerHTML * objJson[i].price + ' ' + '€';
//     } 
// });
// // ===== on ecoute un evenement  'click' sur le boutton '+'
// document.querySelector(".btnPos").addEventListener("click", function() {
//     inputBtnQuantite.innerHTML ++; 
//     textMontant.innerHTML = inputBtnQuantite.innerHTML * objJson[i].price + ' ' + '€';
//     textMontantTotal.innerHTML = inputBtnQuantite.innerHTML * objJson[i].price + ' ' + '€';
// });

// // ====================== fin pour les boutons de quantité article ===================

// // === on creer une div pour le montant de la ligne =========

// const colPanierPrixTotal = document.querySelector(".colPanierPrixTotal");

// const montantLigne = document.createElement("div");
// montantLigne.className = "montantLigne";
// colPanierPrixTotal.appendChild(montantLigne);

// // ======== on creer une balise "p" pour afficher le montant total de la ligne

// const textMontant = document.createElement("p");
// textMontant.className = "ligneMontantBaliseP";
// textMontant.innerHTML =  objJson[i].price * inputBtnQuantite.innerHTML + ' ' + '€';
// montantLigne.appendChild(textMontant);

// // // =========== on affiche le resultat du montant a payer ==========
// let montantPanier = (objJson[i].price * 1); // j'ai réussi a en faire des number et non des string
// const textMontantTotal = document.querySelector(".formMontantP");
// textMontantTotal.innerHTML = montantPanier + ' ' + '€';
// }
// const btnValidationPanier = document.createElement('button');
//      btnValidationPanier.className = "btnValidPanier btn";      
//      btnValidationPanier.setAttribute("type", "button");
//      btnValidationPanier.setAttribute("value", "Valider votre pan");
//      btnValidationPanier.innerHTML = "valider votre panier";
//      sectionBox.appendChild(btnValidationPanier); // on insert notre balise a dans la div
// }else{
// document.querySelector('.h2Main').innerHTML = "Votre panier est vide";
// }
