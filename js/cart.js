let products = [];
let cartsUrl = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let userID = 25801;

//Función de validación de datos:
(function () {
    'use strict'
  
    var form = document.getElementById("form")

        form.addEventListener('submit', function (event) {
            event.preventDefault()
         
            if (!form.checkValidity() ) {
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
          if (form.checkValidity() ) {
            swal("Has comprado con éxito", " ", "success");

          }
        }, false)
      })
    ();


 // Muestra el carrito:
function showCart() {
    let htmlContentToAppend = "";
    for (let i = 0; i < products.articles.length; i++) {
        let cartInfo = products.articles[i];
        
        htmlContentToAppend += `
   
        <tr>
        <td><img src= "` + cartInfo.image + `"  width="200" height="200" alt="product image" class="img-thumbnail"> </td>
        <td>` + cartInfo.name + `</td>
        <td>` + cartInfo.currency + " " +`<span id="cost">` +  cartInfo.unitCost + `</span> </td>
        <td> <input type="number" min="1" style="width:50px" id="count" value="` + cartInfo.count + `" onclick="resultSubTotal () , calculoEnvio()"></td> 
              <td id="unitCosto"> <b>` + cartInfo.currency + " " +`<span id="result">` + cartInfo.unitCost + ` </span> </b></td>
        </tr>
   
    `
        document.getElementById("tbody").innerHTML += htmlContentToAppend;
        document.getElementById("unitCost").innerHTML = cartInfo.unitCost ; 
    }
}


//Calculo de subTotal:
function resultSubTotal () {
    let cost = document.getElementById("cost").innerHTML;
    let count = document.getElementById ("count").value;

    let resultado = parseInt(count * cost);
    
    document.getElementById("result").innerHTML = resultado;
    document.getElementById("unitCost").innerHTML = resultado;
}


//Calculo del precio de envio y precio final:
function calculoEnvio (){
    let subtotal = document.getElementById("result").innerHTML;
    let premium = document.getElementById("premium");
    let express = document.getElementById("express");
    let standard = document.getElementById("standard");
    if (premium.checked == true) {
        let envioPremium = parseInt (subtotal * premium.value);
        document.getElementById("costoEnvio").innerHTML = envioPremium;
        let sumaTotalPremium = (parseInt (subtotal) + parseInt(envioPremium));
        document.getElementById("costsTotal").innerHTML= sumaTotalPremium;
    } else if (express.checked == true) {
        let envioExpress = parseInt(subtotal * express.value);
        document.getElementById("costoEnvio").innerHTML= envioExpress;
        let sumaTotalExpress = (parseInt (subtotal) + parseInt(envioExpress));
        document.getElementById("costsTotal").innerHTML= sumaTotalExpress;
    } else if(standard.checked == true) {
        let envioStandard = parseInt (subtotal * standard.value);
        document.getElementById ("costoEnvio").innerHTML = envioStandard;
        let sumaTotalStandard = (parseInt (subtotal) + parseInt(envioStandard));
        document.getElementById("costsTotal").innerHTML= sumaTotalStandard;
    }

}



//Elección de método de pago y desabilitación de campos:
function checkbox () {
    let checkboxCredito = document.getElementById("credito");
    let checkboxTransferencia = document.getElementById("transferencia");
    let numTarjeta = document.getElementById("numTarjeta");
    let codSeguridad = document.getElementById("codSeguridad");
    let vencimiento = document.getElementById("vencimiento");
    let cuenta = document.getElementById("cuenta");

    if (checkboxTransferencia.checked) {
       numTarjeta.setAttribute("disabled","");
       codSeguridad.setAttribute("disabled", " ");
       vencimiento.setAttribute("disabled" , " ");
       cuenta.removeAttribute("disabled", " ");
       document.getElementById("formaDePago").innerHTML= "Transferencia bancaria";
        return true;
    } else if (checkboxCredito.checked) {
        numTarjeta.removeAttribute("disabled", " ");
       codSeguridad.removeAttribute("disabled", " ");
       vencimiento.removeAttribute("disabled" , " ");
       cuenta.setAttribute("disabled", " ");
       document.getElementById("formaDePago").innerHTML= "Tarjeta de crédito";
       return true;
    } else {
        numTarjeta.removeAttribute("diseabled", "");
        codSeguridad.removeAttribute("diseabled", "");
        vencimiento.removeAttribute("diseabled", "");
        cuenta.removeAttribute("diseabled", "");
        return false;
    }
}




document.addEventListener("DOMContentLoaded", function (e) {
    let cartUrl = CART_INFO_URL + userID + EXT_TYPE;
    getJSONData(cartUrl).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            showCart();
            calculoEnvio();
            checkbox();            
        }
    });
});