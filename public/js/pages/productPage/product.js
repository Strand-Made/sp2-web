import { url, getStorage } from "../../api/data.js";
import { createNav } from "../../components/navbar/mainNav.js";
import {
  addToFav,
  addItemToCart,
} from "../../components/products/product-utilities/productClickActions.js";
import { getSimilarProducts } from "./utilities/productUtilities.js";
import messageBox from "../../utilities/messageBox.js";

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
    displayProduct(container, result);
  } catch (error) {
    messageBox(container, "error", "An error has occured!");
  }
})();

// function creating the html
function displayProduct(container, product) {
  document.title = `HomeSmart | ${product.title}`;

  let productImgSrc = product.image_url;
  // if the product dont have a image url go to thumbnail url
  if (!product.image_url) {
    productImgSrc = url + `${product.image.formats.thumbnail.url}`;
  }
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
                                <div class="flex flex-col md:justify-self-end md:w-full ">
                                    <h1 class="text-2xl md:text-center mb-2 font-medium">${product.title}</h1>
                                    <div class="w-full sm:max-w-xl">
                                      <img class="rounded w-full" src="${productImgSrc}" alt="${product.title}" />
                                    </div>
                                </div>

                                  <div class="shadow-sm w-5/6 mt-2 mx-auto  md:col-start-2  md:col-end-2 md:row-start-2 md:row-end-2 bg-gray-100 rounded max-w-lg md:h-36 md:place-self-start md:justify-self-center md:p-3">
                                      <div class="flex flex-row justify-between m-2">
                                        <p class="text-2xl font-bold text-purple-900 md:text-xl">$ ${product.price}</p>
                                        <span class="bi ${favClass} cursor-pointer text-red-800 text-xl" aria-label="add to favourites" data-id="${product.id}"  ></span>
                                      </div>

                                      <div class="flex flex-row mx-1 justify-center items-center">
                                        <button id="add-to-cart" class="btn-yellow text-sm ml-2 order-2 md:text-xs" data-id="${product.id}" data-title="${product.title}" data-price=${product.price} >Add to cart</button>
                                        <button class="btn-gray text-sm order-1"> Click & Collect </button>
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
                                
                                  <div class="my-3 w-full md:col-start-2 md:col-end-2 md:row-start-1 md:row-end-1 md:place-self-start md:justify-self-center md:max-w-lg">
                                    <div class="bg-gray-100 md:w-full">
                                      <h2 class="text-l font-medium text-center">Product info</h2>
                                  </div>
                                    <div class=" md:border-gray-100 md:border-2 md:border-t-0 md:rounded-b md:h-40">
                                      <p class="leading-relaxed max-w-prose text-gray-700 mx-2 text-sm">${product.description}</p>
                                    </div>
                                 </div>
                          
    `;
  const favButton = document.querySelector("div div div span");
  favButton.addEventListener("click", addToFav);
  const cartButton = document.querySelector("div div div #add-to-cart");
  cartButton.addEventListener("click", addItemToCart);

  // create similar products
  getSimilarProducts(id);
}
