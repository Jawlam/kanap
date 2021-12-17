//RECUPERATION DATA DE L'API 
fetch('http://localhost:3000/api/products')
    //promise qui recupere reponse et parse le .json
  .then(res => res.json())
    // promise qui affiche les data de la fonction products 
  .then(data => { 
    products(data);
    console.log(data)
  })
  .catch(_error => {
    alert("Le serveur ne répond pas, veuillez actualiser la page!");
  });

  //AFFICHAGE DES PRODUITS

function products(data) {
    // boucle des data dans ma fonction products
    for (product of data) {
        // recuperation de l'id #items dans index.html
        const item = document.getElementById('items');
        /*constante item qui est egale au contenu #items
        et injection avec .innerHTML + de tous les elements recuperer
        a chaque tour de la boucle*/
        item.innerHTML +=`
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
        </a>`;
    }
}
