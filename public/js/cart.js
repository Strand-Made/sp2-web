import { url, getStorage, clearStorage } from "./api/data.js";
import { createNav } from "./components/navbar/mainNav.js";

createNav();
const container = document.querySelector("#cart");

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
    console.log(error);
  }
}

// create html for products
function createCartItems(product) {
  const image = url + product.image.formats.medium.url;
  container.innerHTML += ` 
  <div class="grid w-full">
    <div> 
        <h5 class="text-base text-medium text-purple-900">${product.title} </h5> 
    </div>
    <img class="w-32 mr-1 rounded" src="${image}" alt="${product.title}"/>
    <div class="flex flex-col justify-between">    
        <div class="flex flex-row justify-between items-center">
              <p class="font-medium text-base text-purple-900 ">$ ${product.price} </p>
              <div class="flex items-end">
                <span id="#remove-item" class="bi bi-x-circle-fill mr-3 text-m text-red-800 hover:text-red-600 cursor-pointer p-1 font-bolder" title="remove product" aria-label="remove item" data-id="${product.id}" ></span>
              </div>
         </div>
      </div>
    </div>
      
      `;

  //   const removeButton = document.querySelectorAll("div div div div span");
  //   removeButton.addEventListener("click", removeProduct);
}

function removeProduct() {
  const id = this.dataset.id;
  console.log(id);
}

function clearCart(cartKey) {
  const clearBtn = document.querySelector("section div div #clear-cart");
  clearBtn.addEventListener("click", () => {
    clearStorage(cartKey);
    window.location.reload();
  });
}
