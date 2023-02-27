const AUTO = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let minCount = undefined;
let maxCount = undefined;
let productsArray = [];

function productSortAsc() {
  let products = productsArray.products;
  products.sort(function (a, b) {
    if (a.cost < b.cost) { return -1 };
    if (a.cost > b.cost) { return 1 };
    return 0;
  })
}
function productSortDesc() {
  let products = productsArray.products;
  products.sort(function (a, b) {
    if (a.cost > b.cost) { return -1 };
    if (a.cost < b.cost) { return 1 };
    return 0;
  })
}
function productSoldCount() {
  let products = productsArray.products;
  products.sort(function (a, b) {
    let aCount = parseInt(a.soldCount);
    let bCount = parseInt(b.soldCount);
    if (aCount > bCount) { return -1 };
    if (aCount < bCount) { return 1 };
    return 0;
  })
}

function setProductsID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}

function showProductsList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < productsArray.products.length; i++) {
    let products = productsArray.products[i];

    if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
      ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {

      htmlContentToAppend += `
      <div onclick="setProductsID(${products.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="list-group-item list-group-item-action">
        <div class="row">
        <div class="col-3">
          <img src="` + products.image + `" alt="product image" class="img-thumbnail">
         </div>
        <div class="col">
        <div class="d-flex w-100 justify-content-between">
        <div class="mb-1">
        <h4>` + products.name + " " + " - " + products.currency + " " + products.cost + `</h4> 
         <p> ` + products.description + `</p> 
         </div>
        <small class="text-muted">` + products.soldCount + ` artículos</small> 
        </div>

        </div>
        </div>
        </div>`;

      document.getElementById("containerProducts").innerHTML = htmlContentToAppend;
    }
  }
}


document.addEventListener("DOMContentLoaded", function (e) {
  let url = PRODUCTS_URL + localStorage.catID + EXT_TYPE;
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
      document.getElementById("subtitle").innerHTML = productsArray.catName;
      showProductsList();
    }
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList();
  });

  document.getElementById("sortProductAsc").addEventListener("click", function () {
    productSortAsc();
    showProductsList();
  });

  document.getElementById("sortProductDesc").addEventListener("click", function () {
    productSortDesc();
    showProductsList();
  });

  document.getElementById("sortByProductCount").addEventListener("click", function () {
    productSoldCount();
    showProductsList();
    debugger;
  });

  document.getElementById("rangeFilterCount").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
      minCount = parseInt(minCount);
    }
    else {
      minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
      maxCount = parseInt(maxCount);
    }
    else {
      maxCount = undefined;
    }

    showProductsList();
  });

});


