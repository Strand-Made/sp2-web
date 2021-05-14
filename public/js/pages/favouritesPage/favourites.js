import { createNav } from "../../components/navbar/mainNav.js";
import { url, getStorage } from "../../api/data.js";
import {
  clearFavs,
  createFavProducts,
} from "./favourite-utilities/favouriteUtilities.js";
import messageBox from "../../utilities/messageBox.js";

// create navbar
createNav();

const container = document.querySelector("#products-list");
// get favs from storage
function getFavourites() {
  const favouriteKey = "favourites";
  const favourites = getStorage(favouriteKey);
  // if favourites is empty
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
  clearButton.addEventListener("click", clearFavs);

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

// fetch item by id
async function getItems(id) {
  let newUrl = url + "/products/" + id;
  try {
    const response = await fetch(newUrl);
    const result = await response.json();
    createFavProducts(result, container);
  } catch (error) {
    messageBox(
      container,
      "error",
      "Error occured getting favourites. Please try again later"
    );
  }
}
