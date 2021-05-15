import { url, getStorage } from "../../api/data.js";
import {
  addToFav,
  addItemToCart,
} from "./product-utilities/productClickActions.js";

export function createProducts(array, container) {
  container.innerHTML = "";
  const favourites = getStorage("favourites");
  array.map((product) => {
    let favClass = "bi-heart";
    // if prod is in favs return it
    const isFavourite = favourites.filter((fav) => {
      return parseInt(fav.id) === product.id;
    });

    if (isFavourite.length) {
      favClass = "bi-heart-fill";
    }

    let productImgSrc = product.image_url;
    // if the product dont have a image url go to thumbnail url
    if (!product.image_url) {
      productImgSrc = url + `${product.image.formats.thumbnail.url}`;
    }
    const productDesc = product.description;

    container.innerHTML += `
    <div class="flex flex-row justify-center sm:max-w-m sm:mr-3 my-2 sm:flex-col sm:w-52">
      <a class="w-full mr-2" href="product.html?id=${product.id}">
        <img class="rounded w-full h-40 md:h-40 md:w-full" src="${productImgSrc}" alt="${product.title}"/>
      </a>
      <div class="flex flex-col justify-between w-full">
          <div class=""> 
              <h5 class="text-l font-medium text-purple-900">${product.title} </h5> 
               <p class="text-gray-500 w-36 text-xs truncate">${productDesc}</p>
          </div>
          <div class="flex flex-row justify-between items-baseline space-x-1">
              <p class="font-bold text-l text-purple-900">$ ${product.price} </p>                
               <div class="flex justify-center items-center">
                  <span class="bi ${favClass} mr-3 cursor-pointer text-red-800" data-id="${product.id}" aria-label="favourite button"  ></span>
                  <button id="add-to-cart" class="btn-yellow"  
                    data-id="${product.id}" 
                    data-price="${product.price}" 
                   data-title="${product.title}">
                    Buy 
                </button> 
              </div>
           </div>
      </div>
    </div>
                                
                                `;
  });
  // on click add item to favs
  const favButton = document.querySelectorAll("div div div div div span");
  favButton.forEach((button) => {
    button.addEventListener("click", addToFav);
  });
  // on click add item to cart
  const cartButton = document.querySelectorAll("div div div div div button");
  cartButton.forEach((button) => {
    button.addEventListener("click", addItemToCart);
  });
}
