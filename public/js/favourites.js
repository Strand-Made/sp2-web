import { createNav } from "./components/navbar/mainNav.js";
import { url, getStorage, clearStorage } from "./api/data.js";

// create navbar
createNav();
const favouriteKey = "favourites";
const container = document.querySelector("#products-container");

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
    console.log(result);
    createFavProducts(result);
  } catch (error) {
    console.log(error);
  }
}

function createFavProducts(products) {
  const image = url + products.image.formats.medium.url;
  container.innerHTML += ` <div class=" flex flex-row mt-3 justify-center">
  <img class="w-5/12 mr-1 rounded" src="${image}" alt="${products.title}"/>
  <div class="flex w-6/12 flex-col justify-between">
      <div> 
          <h5 class="text-xl text-purple-900">${products.title} </h5> 
      </div>
      <div class="flex flex-row justify-between w-">
          <p class="font-bold text-xl text-purple-900 ">$ ${products.price} </p>
          
          <div class="flex justify-center items-center">
          <i data-id="${products.id}" class="bi-heart-fill mr-3"></i>
          <button class=""> Add to cart </button>
          </div>
      </div>
  </div>
</div>
  
  `;
}
