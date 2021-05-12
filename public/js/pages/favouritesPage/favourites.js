import { createNav } from "../../components/navbar/mainNav.js";
import { url, getStorage, clearStorage } from "../../api/data.js";
import { addItemToCart } from "../../data/createProduct.js";
import messageBox from "../../utilities/messageBox.js";

// create navbar
createNav();
const favouriteKey = "favourites";
const container = document.querySelector("#products-list");

function getFavourites() {
  const favourites = getStorage(favouriteKey);

  if (!favourites.length) {
    container.innerHTML = `<div class="flex flex-col justify-center items-center">
                                    <i class="bi bi-emoji-frown-fill text-3xl text-purple-400"> </i>
                                    <p class="text-gray-900">Your shopping cart is empty</p>
                                    <div>
                                        <a class="text-purple-900 font-medium hover:text-gray-700 cursor-pointer" href="products.html">
                                        Return to shopping
                                        </a>
                                </div>
                            </div>`;
  } else {
    const favId = favourites.map((item) => item.id);
    // Find unique ids and fetch data
    let uniqueFavItems = [...new Set(favId)];
    uniqueFavItems.forEach((item) => {
      getItems(item, favourites);
    });
  }

  // clear favourites button
  const clearButton = document.querySelector("#clear-favs");
  clearButton.addEventListener("click", clearOnClick);

  // If favourites is empty
  if (favourites.length === 0) {
    clearButton.style.display = "none";
    container.innerHTML = `
      <div class="flex flex-col justify-center items-center w-full">
        <p>Your favourites is empty</p>
        <div>
        <a class="bg-purple-700 hover:bg-purple-800 text-gray-50 rounded p-1 " href="products.html"> Browse products</a>
        </div>
      </div>`;
  }
}

getFavourites();

// Clear storage on click
function clearOnClick() {
  console.log("click");
  clearStorage(favouriteKey);
  location.reload();
}

// fetch item by id
async function getItems(id) {
  let newUrl = url + "/products/" + id;
  try {
    const response = await fetch(newUrl);
    const result = await response.json();
    createFavProducts(result);
  } catch (error) {
    messageBox(
      container,
      "error",
      "Error occured getting favourites. Please try again later"
    );
  }
}

function createFavProducts(products) {
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
