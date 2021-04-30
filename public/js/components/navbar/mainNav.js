import { getUsername, logOutUser } from "../../api/data.js";
import { mobileNav } from "./mobileNav.js";

const navContainer = document.querySelector("#main-nav");
const secondNav = document.querySelector("#second-nav");

export function createNav() {
  // check if user is logged in
  const loggedIn = getUsername();

  const logOutButton = `<button class="bg-red-300 text-red-900 rounded shadow-inner hover:bg-red-400 px-1"
                          type="button"> Log Out </button>`;

  const loginButton = `<a href="admin.html" class="bg-purple-300 text-purple-900 rounded shadow-inner hover:bg-purple-400 px-1"> 
  Log in </a>`;

  let navLinks = `  <li class="nav-item hover:bg-gray-300">
                    <div class="flex justify-between">
                        <a class="font-medium" href="index.html"> Home </a>
                        ${loginButton}
                        </div>
                    </li>
                   
                    `;

  // if user is logged in display logout btn and message
  if (loggedIn) {
    navLinks = ` 
    <li class="nav-item hover:bg-gray-200 mb-3">
        <div class="bg-purple-900 text-purple-50 p-2 rounded flex justify-between shadow-md"><p>Hi! ${loggedIn}</p> 
        ${logOutButton} </div>
      `;
  }
  // create mainnav
  navContainer.innerHTML = `
      <div
        class="container px-4 py-3 mx-auto flex flex-wrap items-center justify-between"
      >
        <div class="w-full flex justify-between">
          <a href="/" class="text-xl font-coconpro text-purple-900">
            HomeSmart
          </a>
          <button
            class="cursor-pointer text-xl leading-none md:hidden outline-none focus:outline-none"
            type="button"
            id="nav-toggle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon-menu w-9"
            >
              <path
                class="secondary"
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
          <ul class="hidden md:flex">
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="icon-shopping-cart w-9"
                  title="shopping-cart"
                >
                  <path
                    class="primary fill-current text-gray-400"
                    d="M7 4h14a1 1 0 0 1 .9 1.45l-4 8a1 1 0 0 1-.9.55H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
                  />
                  <path
                    class="secondary fill-current text-gray-900"
                    d="M17.73 19a2 2 0 1 1-3.46 0H8.73a2 2 0 1 1-3.42-.08A3 3 0 0 1 5 13.17V4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v10h11a1 1 0 0 1 0 2H6a1 1 0 0 0 0 2h12a1 1 0 0 1 0 2h-.27z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="icon-heart w-9"
                  title="favourites"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    class="primary fill-current text-gray-400"
                  />
                  <path
                    class="secondary fill-current text-gray-900"
                    d="M12.88 8.88a3 3 0 1 1 4.24 4.24l-4.41 4.42a1 1 0 0 1-1.42 0l-4.41-4.42a3 3 0 1 1 4.24-4.24l.88.88.88-.88z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="icon-user-circle w-9"
                  title="admin-login"
                >
                  <g>
                    <path
                      class="secondary fill-current text-gray-400"
                      d="M3.66 17.52a10 10 0 1 1 16.68 0C19.48 16.02 17.86 16 16 16H8c-1.86 0-3.48.01-4.34 1.52z"
                    />
                    <path
                      class="primary fill-current text-gray-900"
                      d="M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                    />
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div
          class="hidden bg-gray-200 flex-grow items-center transition-all duration-500 ease-in-out"
          id="navbar"
        >
          <ul class="flex flex-col w-full list-none md:hidden text-gray-900">
            ${navLinks}
            </li>
            <li class="nav-item hover:bg-gray-300">
        <a class="font-medium" href="products.html"> Products </a>
      </li>
      
      <li class="nav-item hover:bg-gray-300">
        <a class="font-medium" href="cart.html"> Cart </a>
      </li>
      <li class="nav-item hover:bg-gray-300">
        <a class="font-medium" href="favourites.html"> Favourites </a>
      </li>
      <li class="nav-item hover:bg-gray-300">
        <a class="font-medium" href="dashboard.html"> Admin </a>
      </li>

          </ul>
        </div>
      </div>
    `;
  // create logout on click and redirect
  const logOutBtn = document.querySelector("nav div div ul li div button");
  if (logOutBtn) {
    logOutBtn.addEventListener("click", () => {
      logOutUser();
      location.href = "index.html";
    });
  }
  // second nav
  secondNav.innerHTML = ` 
    
      <ul class="flex flex-row">
        <li class="pr-2 hover:bg-gray-300">
          <a>Products</a>
        </li>
        <li class="pr-2 hover:bg-gray-300">
          <a>Products</a>
        </li>
        <li class="pr-2 hover:bg-gray-300">
          <a>Products</a>
        </li>
      </ul>`;
  // mobile nav toggle
  mobileNav();
}
