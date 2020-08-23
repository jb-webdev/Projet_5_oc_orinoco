// // ===================    on récupère l'id produit dans l'adresse URL =========== 
if (idUrl != null){
    get(urlApi).then(function(response) {

        document.querySelector(".h2Main").innerHTML = "Votre sélection";
        const prodSel = document.getElementById("produitSelectionner"); // je crée une constante pour recuperer ma balise section avec son id.
    
        const boxSel = document.createElement('div');  // je crée une balise div.
        boxSel.className = "boxSelection";  // je lui donne un nom de class.
        prodSel.appendChild(boxSel);        // j'insère ma div dans la section.
    
        // === création d'une balise pour l'image ===
        const divBoxSelmg = document.createElement('div');
        divBoxSelmg.className = 'boxSelectionImg';
        boxSel.appendChild(divBoxSelmg);


        const imageSelection = document.createElement('img');
        imageSelection.className = 'imgSelection';
        imageSelection.setAttribute("alt", response.name);
        imageSelection.setAttribute("title", "super appareil photo" + " " + response.name);
        imageSelection.src = response.imageUrl;
        divBoxSelmg.appendChild(imageSelection);
                
        // === création d'une balise pour le nom du produit ===
        const divBoxName = document.createElement('p');
        divBoxName.className = "boxSelectionName box";
        divBoxName.innerHTML += response.name;  
        boxSel.appendChild(divBoxName);
    
        // === création d'une balise pour la description du produit ===
        const divBoxDescription = document.createElement('p');
        divBoxDescription.className = "boxSelectionDescription";
        divBoxDescription.innerHTML += response.description;
        boxSel.appendChild(divBoxDescription);
    
        // === création d'une balise pour les options des lentilles ===        
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
    
        // === création d'une balise pour accueilir le prix et les boutons panier ===
        const divBoxPanier = document.createElement('div');
        divBoxPanier.className = "boxSelectionBtnPanier";
        boxSel.appendChild(divBoxPanier);
    
        // === création d'une balise pour le prix ==================
        const divBoxPrice = document.createElement('p');
        divBoxPrice.className = "boxSelectionPrice box";
        divBoxPrice.innerHTML += "Prix : " + " " + response.price /100 + ' ' + '€';
        divBoxPanier.appendChild(divBoxPrice);
        
        // === création d'un bouton ajout au panier =================
        const btnPanier = document.createElement('button');  // on crée un btn pour le liens vers la page info produit.
        btnPanier.className = "btnPanier btn";      // on lui donne une classe.
        btnPanier.setAttribute("type", "button");
        btnPanier.setAttribute("value", "acheter");// on affiche un  message.
        btnPanier.innerHTML = "ajouter";
        divBoxPanier.appendChild(btnPanier); // on insert notre btn dans la div
    
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

        // =================== on utilise un écouteur d'évenement pour modifier nos quantités et notre montant du panier.
        document.querySelector(".btnNeg").addEventListener("click", function() {
            if (inputBtnQuantite.innerHTML >= 2) {
                inputBtnQuantite.innerHTML --;
            } 
        });
                
        document.querySelector(".btnPos").addEventListener("click", function() {
            inputBtnQuantite.innerHTML ++; 
        });
    
    
        // =========== on récupère les valeurs pour crée notre ligne panier ============
        const id = idUrl;
        const quantite = document.querySelector(".inputPanier").innerHTML; // on récupère la quantité produit
        const option = document.querySelector('.option').value; // on récupère l'option du produit
        const name = response.name; // on écupèree le nom du produit
        const price = response.price/100; // on récupère le prix du produit
        const urlImage = response.imageUrl; // on récupère l'image du produit
        const description = response.description; // on récupère la déscription du produit
        // je crée une class pour mon objet
        class ligneDuPanier {
            constructor(id, name, quantite, option, price, urlImage, description) {
                this.id = id;
                this.nom = name;
                this.quantite = quantite;
                this.option = option;
                this.price = price;
                this.urlImage = urlImage;
                this.description = description
            }
        }
        // j'utilise un écouteur d'evenements pour ajouter les informations choisi par l'utilisateur

        document.querySelector(".btnPanier").addEventListener('click', function() {
            const option = document.querySelector('.option').value;
            if(option === "all"){
                alert("veuillez choisir une option !");
            } else {
                const quantiteAjout = document.querySelector(".inputPanier").innerHTML; // recupere notre quantité d'article à ajouter
            
                if (localStorage.getItem("panier") === null) { //si le panier d'origine est null alors on écrit dans le Localstorage

                    const ligne = new ligneDuPanier(id, name, quantiteAjout, option, price, urlImage, description);
                    let Panier = [];
                    
                    Panier.push(ligne); // je pouse les renseigneemnt dans le localstorage
                    localStorage.setItem("panier", JSON.stringify(Panier));
                    
                    let quantiteNav = quantite; // je pousse la quantite dans mon localstorage
                    localStorage.setItem("quantite", JSON.stringify(quantiteNav));
                    
                } else { // si on revient pour ajouter un autre article alors
                    
                    const dataPanier = JSON.parse(localStorage.getItem("panier"));

                    let produitTrouve = false;
                    for (let x in dataPanier) {
                        if (dataPanier[x].id == idUrl && dataPanier[x].option === option) {
                
                            produitTrouve = true;

                            // j'augmente la quantité de mon porduit
                            dataPanier[x].quantite = Number(dataPanier[x].quantite) + Number(document.querySelector(".inputPanier").innerHTML);
                        }
                    };
                    if (!produitTrouve) {
                        const ligne = new ligneDuPanier(id, name, quantiteAjout, option, price, urlImage, description);
                        dataPanier.push(ligne);
                    };

                    // Sauvegarde notre ligne panier et notre quantité panier
                    localStorage.setItem("panier", JSON.stringify(dataPanier));  
                    localStorage.setItem("quantite", JSON.stringify(dataPanier.length));
                    
                };
                window.location.href = "index.html"; //on retourne à notre page produits
            };
        });
    });
    
} else {
    document.querySelector(".h2Main").innerHTML = "Aucun produit sélectionné !";
};
headerPanier();


// ============== affichage quantite panier ========================