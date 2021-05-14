import { addItemToCart } from "../../../components/products/product-utilities/productClickActions.js";
import { url, clearStorage } from "../../../api/data.js";

export function createFavProducts(products, container) {
  let productImgSrc = products.image_url;
  // if the product dont have a image url go to thumbnail url
  if (!products.image_url) {
    productImgSrc = url + `${products.image.formats.thumbnail.url}`;
  }
  container.innerHTML += ` 
    <li class="border-b-2 border-gray-50 p-2">
      <div class=" flex flex-row mt-3 justify-center">
        <a href="product.html?id=${products.id}"><img class="w-20 mr-1 rounded md:w-36" src="${productImgSrc}" alt="${products.title}"/></a>
        <div class="flex w-6/12 flex-col justify-between">
            <div> 
              <h5 class="text-l font-medium text-gray-900">${products.title} </h5> 
            </div>
            <div class="flex flex-roww justify-between w-">
              <p class="text-sm font-medium text-gray-700 ">$ ${products.price} </p>
              
              <div class="flex justify-center items-center">
                <span class="bi-heart-fill mr-3" data-id="${products.id}" ></span>
                <button class="btn-yellow w-20 text-xs p-0 py-1 px-2" data-title="${products.title}" data-id="${products.id}" data-price="${products.price}"> Add to cart </button>
              </div>
            </div>
          </div>
      </div>
    </li>
    
    `;
  const addToCartBtn = document.querySelectorAll("div div div div button");
  addToCartBtn.forEach((button) => {
    button.addEventListener("click", addItemToCart);
  });
}

// Clear storage on click
export function clearFavs() {
  const favouriteKey = "favourites";
  clearStorage(favouriteKey);
  location.reload();
}
