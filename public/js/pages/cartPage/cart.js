import { url, getStorage, clearStorage } from "../../api/data.js";
import { createNav } from "../../components/navbar/mainNav.js";
import messageBox from "../../utilities/messageBox.js";
import { createCartItems } from "./cart-utilities/cartUtilities.js";

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
    // get cart products
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
    // create cart items
    createCartItems(result, container);
  } catch (error) {
    console.log("Error fetching products", error);
    messageBox(
      container,
      "error",
      "Error fetching products, Please try again later"
    );
  }
}
// clear cart on btn click
function clearCart(cartKey) {
  const clearBtn = document.querySelector("section div div #clear-cart");
  clearBtn.addEventListener("click", () => {
    clearStorage(cartKey);
    window.location.reload();
  });
}
