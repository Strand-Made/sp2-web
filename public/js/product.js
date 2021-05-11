import { url, getStorage } from "./api/data.js";
import { createNav } from "./components/navbar/mainNav.js";
import { addToFav, addItemToCart } from "./data/createProduct.js";
import messageBox from "./components/messageBox.js";

createNav();

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
if (!id) {
  window.location.href = "/";
}

// fetch product & create html
(async () => {
  let newUrl = url + `/products/${id}`;
  try {
    const container = document.querySelector("#product-container");
    const response = await fetch(newUrl);
    const result = await response.json();
    console.log(result);
    displayProduct(container, result);
  } catch (error) {
    messageBox(container, "error", "An error has occured!");
  }
})();
// function creating the html
function displayProduct(container, product) {
  document.title = `HomeSmart | ${product.title}`;

  const productImage = url + `${product.image.formats.small.url}`;
  const favourites = getStorage("favourites");
  let favClass = "bi-heart";
  // if prod is in favs return it
  const isFavourite = favourites.filter((fav) => {
    return parseInt(fav.id) === product.id;
  });

  if (isFavourite.length) {
    favClass = "bi-heart-fill";
  }
  container.innerHTML = `
                          <div class="grid mt-3 md:grid-col-3 md:grid-row-2 gap-2 lg:place-items-center">
                                <div class="flex flex-col md:w-full ">
                                    <h1 class="text-2xl mb-2 font-medium">${product.title}</h1>
                                    <img class="rounded w-full border-2" src="${productImage}" alt="${product.title}" />
                                </div >
                                  <div class="md:col-start-2 md:row-start-1 md:col-end-2 bg-gray-100 rounded md:h-36 md:place-self-center md:justify-self-center md:p-3">
                                    <div class="flex flex-row justify-between m-2">
                                        <p class="text-2xl font-bold text-purple-900 md:text-xl">$ ${product.price}</p>
                                        <span class="bi ${favClass} cursor-pointer text-red-800 text-xl" aria-label="add to favourites" data-id="${product.id}"  ></span>
                                    </div>
                                      <div class="flex flex-row justify-center">
                                        <button id="add-to-cart" class="btn-yellow order-2 p-3 m-2 w-40 md:text-xs" data-id="${product.id}" data-price=${product.price} >Add to cart</button>
                                        <button class=" btn-gray order-1"> Click & Collect </button>
                                      </div>
                                      <div class="flex justify-between items-baseline mx-1"> 
                                        <div class="flex items-baseline">
                                            <span class="bi bi-truck mr-1" aria-label="Delivery time"></span><p class="text-gray-500 text-xs"> 2-3 days </p>
                                         </div>
                                        
                                        <div class="flex justify-end">
                                          <p class="text-xs text-gray-500">In Storage (100+)</p>
                                        </div>
                                      </div>
                                       
                                  </div>
                                
                                  <div class="my-3 md:col-start-2 md:row-start-1 md:row-end-1 md:col-end-2 md:place-self-start md:justify-self-center">
                                  <div class="bg-gray-100 md:w-full">
                                    <h2 class="text-l font-medium text-center">Product info</h2>
                                  </div>
                                    <p class="leading-relaxed max-w-prose text-gray-700 text-sm">${product.description}</p>
                                 </div>
                            </div>
    `;
  const favButton = document.querySelector("div div div span");
  favButton.addEventListener("click", addToFav);
  const cartButton = document.querySelector("div div div #add-to-cart");
  cartButton.addEventListener("click", addItemToCart);

  // create similar products
  getSimiliarProducts(id);
}

async function getSimiliarProducts(id) {
  let newUrl = url + "/products";
  const container = document.querySelector("#similar-products");
  // transfrom id string to number
  const idNumb = +id;
  try {
    const response = await fetch(newUrl);
    const result = await response.json();
    // filter out active product
    const filteredResult = result.filter((product) => {
      if (product.id !== idNumb) {
        return product;
      }
    });
    console.log(container);
    createSimiliarProducts(container, filteredResult);
    // FIX ARRAY LENGTH !!!!!!!!!!!!
    console.log("Things to do here !!", "Fix array length");
  } catch (error) {
    messageBox(container, "error occured getting suggestions. ");
  }
}
// create similar products
function createSimiliarProducts(container, array) {
  array.map((product) => {
    const productImage = url + `${product.image.formats.small.url}`;
    container.innerHTML += `
                            <div class="flex flex-wrap">
                                <div class="flex-row">
                                    <div> 
                                      <a href="product.html?id=${product.id}"
                                        <h5 class="text-m font-medium text-gray-900">${product.title}</h5> 
                                        <img class="w-40 rounded" src="${productImage}" alt="${product.title}"
                                     </a>
                                    </div>
                                    <div class="flex justify-between my-2">
                                        <p class="text-md text-purple-900 font-medium">$ ${product.price} </p>
                                        <a href="product.html?id=${product.id}" class="btn-yellow cursor-pointer">Buy </a> 
                                    </div>
                                </div>
                            </div>
    
    `;
  });
}
