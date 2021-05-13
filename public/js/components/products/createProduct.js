import { url, saveToStorage, getStorage } from "../../api/data.js";

function sliceText(text, length) {
  const slicedText = text.slice(length);
  return slicedText;
}

export function createProducts(array, container) {
  container.innerHTML = "";
  const favourites = getStorage("favourites");
  array.map((product) => {
    let favClass = "bi-heart";
    // if prod is in favs return it
    const isFavourite = favourites.filter((fav) => {
      return parseInt(fav.id) === product.id;
    });

    if (isFavourite.length) {
      favClass = "bi-heart-fill";
    }
    let qnty = 1;

    let productImgSrc = product.image_url;
    // if the product dont have a image url go to thumbnail url
    if (!product.image_url) {
      productImgSrc = url + `${product.image.formats.thumbnail.url}`;
    }
    const productDesc = product.description;

    container.innerHTML += `
    <div class="flex flex-row justify-center sm:max-w-m sm:mr-3 my-2 sm:flex-col sm:w-52">
      <a class="w-full mr-2" href="product.html?id=${product.id}">
        <img class="rounded w-full h-full md:h-40" src="${productImgSrc}" alt="${product.title}"/>
      </a>
      <div class="flex flex-col justify-between w-full">
          <div class=""> 
              <h5 class="text-l font-medium text-purple-900">${product.title} </h5> 
               <p class="text-gray-400 w-36 text-xs truncate">${productDesc}</p>
          </div>
          <div class="flex flex-row justify-between items-baseline space-x-1">
              <p class="font-bold text-l text-purple-900">$ ${product.price} </p>                
               <div class="flex justify-center items-center">
                  <span class="bi ${favClass} mr-3 cursor-pointer text-red-800" data-id="${product.id}" aria-label="favourite button"  ></span>
                  <button id="add-to-cart" class="btn-yellow"  
                    data-id="${product.id}" 
                    data-price="${product.price}" 
                    data-qnty="${qnty}" 
                   data-title="${product.title}">
                    Buy 
                </button> 
              </div>
           </div>
      </div>
    </div>
                                
                                `;
  });
  const favButton = document.querySelectorAll("div div div div div span");
  favButton.forEach((button) => {
    button.addEventListener("click", addToFav);
  });

  const cartButton = document.querySelectorAll("div div div div div button");
  cartButton.forEach((button) => {
    button.addEventListener("click", addItemToCart);
  });
}

// Add product to favourites
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

export function addItemToCart() {
  const cartKey = "cart";
  const currentCart = getStorage(cartKey);
  const id = this.dataset.id;
  const price = this.dataset.price;
  let qnty = this.dataset.qnty;
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

function addedToCartMessage(product) {
  const classes =
    "flex flex-col md:flex-row transition-opacity duration-500 ease-in-out bg-gray-100 shadow-inner p-1 justify-between items-center";
  const addedToCart = document.querySelector("#added-to-cart");
  addedToCart.className += `${classes}`;
  addedToCart.innerHTML = `<p class="text-gray-900 text-sm">
                            <span class="bi bi-cart-check-fill text-l"></span> 
                            ${product} added to cart 
                            </p>
                            
                            <a class="btn-yellow font-medium" href="cart.html">Check it out</a>
                            <button id="remove-msg" class="btn-gray">Keep shopping</button>
                            `;
  const removeMessage = document.querySelector("#remove-msg");
  removeMessage.addEventListener("click", () => {
    addedToCart.classList.add("hidden");
  });
}
