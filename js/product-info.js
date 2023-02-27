let productsInfoArray = [];
let productsCommentsArray = [];

function setProductsID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
  }
  

function showProductsInfo() {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div onclick="setProductsID(${productsInfoArray.id})" class="list-group-item list-group-item-action cursor-active">
    <div class="list-group-item list-group-item-action">
    <div class="row">
    <div class="mb-1">
    <h2> ` + productsInfoArray.name + ` </h2>  
    <h4>Precio</h4> 
    <p> ` + productsInfoArray.currency + " " + productsInfoArray.cost + `</p>
    <br>
    <h4>Descripción</h4> 
    <p> ` + productsInfoArray.description + `</p>
    <br>
    <h4>Categoría</h4> 
    <p> ` + productsInfoArray.category + `</p>
    <br>
    <h4>Cantidad vendidos</h4> 
    <p> ` + productsInfoArray.soldCount + `</p>
    <br>
    <h4>Imagenes ilustrativas</h4> 
    <p>`
    for (let i = 0; i < productsInfoArray.images.length; i++) {
        let images = productsInfoArray.images[i];
        htmlContentToAppend +=
            ` <span>   <img src="` + images + `" width="300" height="300" alt="product image" class="img-thumbnail"> </span>`
    } `  
    </p>
    </div>
    </div>
    </div>
    </div>`;
    document.getElementById("productsInfo").innerHTML += htmlContentToAppend;


}

function showProductsComments() {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">
    <div class="row">
    <div class="mb-1">
    <h4>Comentarios</h4> 
    ` 
    for (let i = 0; i < productsCommentsArray.length; i++) {
        let comment = productsCommentsArray[i];
        htmlContentToAppend += `
        <p>`+ comment.user +  " " + comment.dateTime + ` </p>
        <p> ` + comment.description + ` </p>
        <p>`
      for (let x = 0; x < comment.score; x++) {
        htmlContentToAppend += `<span class="fa fa-star checked" style="right:0px;"></span>`;
      }
      for (let x = 0; x < (5-comment.score); x++) {
        htmlContentToAppend += `<span class="fa fa-star" style="right:0px;"></span>`;
      }
       
    
  }
  `</p>
    </div>
    </div>
    </div>
    </div>`;
    document.getElementById("comments").innerHTML += htmlContentToAppend;


}
document.addEventListener("DOMContentLoaded", function (e) {
     let infoUrl = PRODUCT_INFO_URL + localStorage.productID + EXT_TYPE;
      getJSONData(infoUrl).then(function (resultObj) {
          if (resultObj.status === "ok") {
              productsInfoArray = resultObj.data;
              showProductsInfo();
              relatedProducts() ;
  
          }
      });
   
      let productsCommentsURL = PRODUCT_INFO_COMMENTS_URL + localStorage.productID + EXT_TYPE;
      getJSONData(productsCommentsURL).then(function (resultObj) {
          if (resultObj.status === "ok") {
              productsCommentsArray = resultObj.data
              console.log(productsCommentsArray);
              showProductsComments();
  
          }
      });


});

function relatedProducts() {

    let htmlContentToAppend = "";
    htmlContentToAppend += `
    
    <div class="list-group-item list-group-item-action">
    <div class="row">
    <div class="mb-1">
    <div class="d-flex w-100 justify-content-between" id="coments">
    <h4>Productos relacionados</h4> 
    <br>
    <p>`
    for (let i = 0; i < productsInfoArray.relatedProducts.length; i++) {
        let relProducts = productsInfoArray.relatedProducts[i];
        htmlContentToAppend +=
            `
            <div onclick="setProductsID(${relProducts.id})" class="mb-1">
            <span>   <img src="` + relProducts.image + `" width="300" height="300" alt="product image" class="img-thumbnail"> </span>
            <br>
             <p> ` + relProducts.name + `</p>
             </div>;`
            
    } 
    `</p>
    </div>
    </div>
    </div>
    </div>`;
    document.getElementById("comments").innerHTML += htmlContentToAppend;






}   