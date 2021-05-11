import { url, getStorage, clearStorage, saveToStorage } from "./api/data.js";
import { createNav } from "./components/navbar/mainNav.js";
import messageBox from "./components/messageBox.js";

createNav();
const container = document.querySelector("#cart");
const cartButtonsContainer = document.querySelector("#cart-actions");

function getCart() {
  const cartKey = "cart";
  const cartItems = getStorage(cartKey);
  const totalPrice = document.querySelector("#price");
  // if cart is empty display message
  if (!cartItems.length) {
    container.innerHTML = `<div class="flex flex-col justify-center items-center">
                                    <i class="bi bi-emoji-frown-fill text-3xl text-purple-400"> </i>
                                    <p class="text-gray-900">Your shopping cart is empty</p>
                                    <div>
                                        <a class="text-purple-900 font-medium hover:text-gray-700 cursor-pointer" href="products.html">
                                        Return to shopping
                                        </a>
                                </div>
                            </div>`;
    totalPrice.innerHTML = "<p>0</p>";
    cartButtonsContainer.classList.add("hidden");
  } else {
    const cartIds = cartItems.map((item) => item.id);
    cartIds.map((product) => {
      getItems(product);
    });

    // numb to intreger by + shorthand and reduce the array
    const prices = cartItems.map((price) => +price.price);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalPrice.innerHTML = `<p class="text-xl"> $${prices.reduce(reducer)}</p>`;
  }
  // clear cart on click & reload page
  clearCart(cartKey);
}
getCart();

// Fetch products from api
async function getItems(id) {
  let newUrl = url + "/products/" + id;
  try {
    const response = await fetch(newUrl);
    const result = await response.json();
    createCartItems(result);
  } catch (error) {
    messageBox(
      container,
      "error",
      "Error fetching products, Please try again later"
    );
  }
}

// create html for products
function createCartItems(products) {
  const image = url + products.image.formats.medium.url;
  container.innerHTML += ` 
  <li class="w-full border-b-2 border-gray-50 p-2 flex items-center justify-between">
    <div class=" flex flex-row mt-3">
      <img class="w-20 mr-1 rounded md:w-36" src="${image}" alt="${products.title}"/>
      <div class="flex flex-col justify-between">
          <div class="flex flex-col items-center justify-center"> 
            <h5 class="text-l font-medium text-gray-900 mr-3">${products.title} </h5> 
          </div>
          <div> 
            <p class="text-sm text-gray-600 w-80 truncate">${products.description} </p> 
          </div>
          <div class="justify-items-end w-full">
            <p class="text-sm font-medium text-purple-700 ">$ ${products.price} </p>
          </div>
        </div>
    </div>
    <div class="justify-items-center items-center">
      <span id="#remove-item" class="removeItem bi bi-x-circle-fill text-m text-red-800 block hover:text-red-600 cursor-pointer font-bolder"
        title="remove product" aria-label="remove item" data-id="${products.id}" ></span>
    </div>
  </li>
      
      `;

  const removeButton = document.querySelectorAll(".removeItem");
  removeButton.forEach((button) => {
    button.addEventListener("click", removeProduct);
  });
}

function removeProduct() {
  const tokenKey = "cart";
  const id = this.dataset.id;

  const cartArray = getStorage(tokenKey);
  const productExst = cartArray.find(function (product) {
    return product.id === id;
  });
  // if the product exist, delete it and update storage
  if (productExst) {
    const newArray = cartArray;
    newArray.pop();
    saveToStorage(tokenKey, newArray);
    window.location.reload();
  }
}

function clearCart(cartKey) {
  const clearBtn = document.querySelector("section div div #clear-cart");
  clearBtn.addEventListener("click", () => {
    clearStorage(cartKey);
    window.location.reload();
  });
}
