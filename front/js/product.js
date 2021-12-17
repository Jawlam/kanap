// RECUPERATION DE L'ID 
// création d'une nouvelle URL + searchParams pour extraire le parametre id 
let paramsUrl = new URL(window.location.href).searchParams;
// ajout de l'id à url 
let idProduct = paramsUrl.get('id');

// SELECTION DU PRODUIT GRACE A SON ID

// declaration des variables utiles 
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

// ajout de l'id pour le produit selectionné
fetch("http://localhost:3000/api/products/" + idProduct)
  .then(res => res.json())
  .then(data => {
    // modification des variables avec les données 
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;
    console.log(data)
    // Ajout du nombre de couleurs
    for (color in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[color]
      );
    }
  })
  .catch(_error => {
    alert('Le serveur ne répond pas, veuillez actualiser la page!');
  });

// RECUPERATION DES QUANTITES ET COULEURS CHOISIS 

// declaration des variables utiles 
  const selectQuantity = document.getElementById('quantity');
  const selectColors = document.getElementById('colors');

  // ajout d'une gestion d'évènements 
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
  event.preventDefault();
if (selectQuantity.value == 0 || selectColors.value == null){
  alert("Veuillez verifier vos couleurs ou quantités ");
  return;
}


 //declaration de la selection du product 
  const selectedProduct= {
    id: idProduct,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };

   // mise en place du local storage
  let localStorageProduct = JSON.parse(localStorage.getItem('products')) || [];
  
  // ajout de la selection dans le local storage
  /*const addLocalStorageProduct = () => {
  // recuperation de la selection dans le tableau 
  localStorageProduct.push(selectedProduct);
  localStorage.setItem('product', JSON.stringify(localStorageProduct));
  

  }*/
   

  let update = false;
  
  // if (localStorageProduct) {
  // verification du panier 
   localStorageProduct.forEach (function (productOk) {
    if (productOk.id === idProduct && productOk.color === selectColors.value) {
      productOk.quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
      // productOk.quantity = productOk.quantity + selectQuantity.value;
      localStorage.setItem('products', JSON.stringify(localStorageProduct));
      update = true;
      //addConfirm();
    }
  });

  if (!update) {
    localStorageProduct.push(selectedProduct);
    localStorage.setItem('products', JSON.stringify(localStorageProduct));
    update = true;
  }

  if (update) {
    alert("votre canapé est ajouté à votre panier");
  }
  //
    /*if (!update) {
    addLocalStorageProduct();
    addConfirm();
    }
  }*/

  // si aucun produit enregistré  
  /*else {
    // création de tableau avec les selections
    localStorageProduct = [];
    addLocalStorageProduct();
    addConfirm();
    console.log(localStorageProduct)
  }*/
});