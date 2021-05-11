import { getUsername, logOutUser, getStorage } from "../../api/data.js";
import { mobileNav } from "./mobileNav.js";

const navContainer = document.querySelector("#main-nav");
const secondNav = document.querySelector("#second-nav");
const adminNav = document.querySelector("#admin-nav");

export function createNav() {
  // check if user is logged in
  const loggedIn = getUsername();

  const logOutButton = `<button id="logout" class="text-red-300 font-medium hover:text-red-600 text-xs"
                          type="button"> Log Out </button>`;

  const loginButton = `<div class="bg-purple-900 flex justify-end">
                          <a href="admin.html" 
                          class="text-purple-200 px-1 text-xs"> 
                          Admin
                          </a>
                        </div> 
                          `;

  let navLinks = ` ${loginButton}`;

  // if user is logged in display logout btn and message
  if (loggedIn) {
    navLinks = ` 
        <div class="text-xs w-full px-1 text-purple-800 bg-purple-800 items-baseline flex md:flex-col md:justify-center md:items-center justify-between">
        <p class="text-gray-50">
          Logged in as:
          <span class="font-medium">${loggedIn}</span>
        </p> 
          <div class="flex md:flex-row space-x-2">
            <a href="dashboard.html" class="text-gray-50 hover:text-gray-300">Dashboard </a>
            ${logOutButton} 
          </div>
        </div>
        
      `;
  }

  adminNav.innerHTML = `${navLinks}`;
  // create mainnav
  navContainer.innerHTML = `
      <div
        class="container max-w-screen-lg sm:mx-auto px-2 flex flex-wrap items-center justify-between">
        <div class="w-full flex justify-between">
          <a href="/" class="text-xl font-coconpro text-purple-100">
            HomeSmart
          </a>
          <button
            class="cursor-pointer text-xl leading-none  sm:hidden outline-none focus:outline-none"
            type="button"
            id="nav-toggle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon-menu w-9 fill-current text-purple-100 hover:bg-purple-400 transition-colors duration-300 ease-in-out rounded-full p-1"
            >
              <path
                class="secondary"
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
          <ul class="hidden sm:flex md:items-center md:justify-items-center space-x-2">
          
            <li class="flex items-center mt-1">
              <a class="block cursor-pointer" href="favourites.html">
              <span class="bi bi-heart text-xl text-purple-100" aria-label="your favourites"></span>
              </a>
            </li>
            <li class="flex items-center">
            <a href="cart.html" class="cursor-pointer">
              <div class="relative">
                <span class="bi bi-cart2 text-2xl text-purple-100" aria-label="shopping cart" ></span>
                <div id="cart-length" class="hidden absolute top-0 left-4 rounded-full px-1 bg-purple-300"> </div>
              </div>
            </a>
            </li>
          </ul>
        </div>


        <div
          class="hidden sm:hidden flex-grow w-full items-center "
          id="navbar"
        >
        
          <ul class="flex flex-col w-full list-none md:hidden text-center text-purple-50">
          <li class="nav-item hover:bg-gray-300">
          <a class="font-medium" href="index.html"> Home </a>
      </li>
            <li class="nav-item hover:bg-gray-300">
        <a class="font-medium" href="products.html"> Products </a>
      </li>
      
      <li class="nav-item hover:bg-gray-300">
        <a class="font-medium" href="cart.html"> 
        <div class="relative">
        
          <p>Cart<p> 
          <div id="cart-length-desktop" class="hidden absolute top-0 left-4 rounded-full px-1 bg-purple-300"> </div>
        </div>
        </a>
      </li>
      <li class="nav-item hover:bg-gray-300">
        <a class="font-medium" href="favourites.html"> Favourites </a>
      </li>
    </ul>
        </div>
        
      </div>
    `;

  // create logout on click and redirect
  const logOutBtn = document.querySelector("#logout");
  if (logOutBtn) {
    logOutBtn.addEventListener("click", () => {
      logOutUser();
      location.href = "index.html";
    });
  }
  // second nav
  secondNav.innerHTML = ` 
    
      <ul class="flex flex-row">
        <li class="px-3 py-1 text-xs hover:bg-purple-500 hover:text-purple-100 transition-color duration-300 ease-in-out">
          <a href="index.html" class="text-sm">Home</a>
        </li>
        <li class="px-3 py-1 text-xs hover:bg-purple-500 hover:text-purple-100 transition-color duration-300 ease-in-out">
          <a class="text-sm" href="products.html">Products</a>
        </li>
        <li class="px-3 py-1 text-xs hover:bg-purple-500 hover:text-purple-100 transition-color duration-300 ease-in-out">
          <a href="about.html" class="text-sm">About us</a>
        </li>
      </ul>`;
  // mobile nav toggle
  mobileNav();
  getCartLength();
}
// display number of products in cart
function getCartLength() {
  const cartContainer = document.querySelector("#cart-length");
  const cart = getStorage("cart");

  if (cart) {
    cartContainer.classList.remove("hidden");
    cartContainer.innerHTML = `<p class="text-xs text-purple-100">${cart.length}</p>`;
  }
}
