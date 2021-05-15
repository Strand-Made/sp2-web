import { getStorage, saveToStorage } from "../../../api/data.js";

// Add item to favourites
export function addToFav() {
  const favKey = "favourites";
  this.classList.toggle("bi-heart");
  this.classList.toggle("bi-heart-fill");
  const id = this.dataset.id;

  const currentFavs = getStorage(favKey);

  const productExst = currentFavs.find(function (fav) {
    return fav.id === id;
  });

  if (!productExst) {
    const product = {
      id,
    };
    currentFavs.push(product);
    saveToStorage(favKey, currentFavs);
  } else {
    const filteredFavs = currentFavs.filter((favourite) => favourite.id !== id);
    saveToStorage(favKey, filteredFavs);
  }
}
// add item to cart
export function addItemToCart() {
  const cartKey = "cart";
  const currentCart = getStorage(cartKey);
  const id = this.dataset.id;
  const price = this.dataset.price;
  const title = this.dataset.title;

  const productToAdd = currentCart.find((product) => product.id !== id);
  const product = {
    id,
    price,
  };
  if (!productToAdd) {
    currentCart.push(product);
  } else {
    currentCart.push(product);
  }

  saveToStorage(cartKey, currentCart);
  // display message that item is addded to cart
  addedToCartMessage(title);
}

// display message that item is addded to cart
function addedToCartMessage(product) {
  const classes =
    "flex flex-col md:flex-row transition-opacity duration-500 ease-in-out bg-gray-100 shadow-inner p-1 justify-between items-center";
  const addedToCart = document.querySelector("#added-to-cart");
  addedToCart.className += `${classes}`;
  addedToCart.innerHTML = `<p class="text-gray-900 text-sm">
                              <span class="bi bi-cart-check-fill text-l"></span> 
                              ${product} added to cart 
                              </p>
                              
                              <a class="btn-yellow font-medium mb-2 sm:mb-0" href="cart.html">Check it out</a>
                              <button id="remove-msg" class="btn-gray">Keep shopping</button>
                              `;
  // remove message on click
  const removeMessage = document.querySelector("#remove-msg");
  removeMessage.addEventListener("click", () => {
    addedToCart.classList.add("hidden");
  });
}
