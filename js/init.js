const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
document.getElementById("user").innerHTML = localStorage.getItem("usuario");
document.getElementById("emailEmail").value = localStorage.getItem("usuario");
console.log(emailEmail);

function mostrarDatos (){
  let datosPersona = JSON.parse(localStorage.getItem("datosPerson"));
  document.getElementById("nombre").value = datosPersona.nombre;
  document.getElementById("segundoNombre").value= datosPersona.segundoNombre;
  document.getElementById("apellido").value = datosPersona.apellido;
  document.getElementById("segundoApellido").value = datosPersona.segundoApellido;
  document.getElementById("numero").value= datosPersona.numero;
 

}

mostrarDatos ();
function redirPageCart() {
  window.location = "cart.html";
}

function redirMyProfile() {
  window.location = "my-profile.html";
}

function redirSignOff() {
  localStorage.clear();
  window.location = "index.html";
}