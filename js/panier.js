let paramsStringPanier = new URLSearchParams(window.location.search);

const PanierId = paramsStringPanier.get("id");
console.log(PanierId);
//======================ca marche=======================

getEssai(urlApiProd).then(function(response) {
    console.log(response);
    console.log(response._id)
        const colImage = document.querySelector(".colPanierImage");
        const imagePanier = document.createElement('img');
        imagePanier.className = ('imageDuPanier');
        imagePanier.src += response.imageUrl;
        colImage.appendChild(imagePanier);

        const colName = document.querySelector(".colPanierName");
        const namePanier = document.createElement("p");
        namePanier.className = ("namePanier");
        namePanier.innerHTML = (response.name); 
        colName.appendChild(namePanier);

        const colOption = document.querySelector(".colPanierOption");
        const optionPanier = document.createElement("p");
        optionPanier.className = ("optionPanier");
        optionPanier.innerHTML = (response.price); 
        colOption.appendChild(optionPanier); 

        const colPrice = document.querySelector(".colPanierPrice");
        const pricePanier = document.createElement("p");
        pricePanier.className = ("pricePanier");
        pricePanier.innerHTML = (response.price /100 + ' ' + '€'); 
        colPrice.appendChild(pricePanier); 
});

//====================== calcul du montant total a payer ===========

