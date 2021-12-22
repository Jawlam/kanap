// RECUPERATION DE L'ID 
// création d'une nouvelle URL + searchParams pour extraire le parametre id 
let paramsUrl = new URL(window.location.href).searchParams;
// ajout de l'id à url 
let orderId = paramsUrl.get('name');

const orderNumber = document.getElementById('orderId');

orderNumber.innerHTML = orderId