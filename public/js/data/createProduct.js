import { url, saveToStorage, getStorage } from "../api/data.js";

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

    const productDesc = sliceText(product.description, 500);
    const productImage = url + `${product.image.formats.small.url}`;
    container.innerHTML += `<div class=" flex flex-row mt-3 justify-center">
                                    <img class="w-5/12 mr-1 rounded" src="${productImage}" alt="${product.title}"/>
                                    <div class="flex w-6/12 flex-col justify-between">
                                        <div> 
                                            <h5 class="text-xl text-purple-900">${product.title} </h5> 
                                            <p class="text-gray-400 text-sm  truncate">${productDesc}... </p>
                                        </div>
                                        <div class="flex flex-row justify-between w-">
                                            <p class="font-bold text-xl text-purple-900 ">$ ${product.price} </p>
                                            
                                            <div class="flex justify-center items-center">
                                            <i class="bi ${favClass} mr-3 cursor-pointer text-red-800" data-id="${product.id}"  ></i>
  
                                                <button id="add-to-cart" class="btn-yellow"  data-id="${product.id}" data-price="${product.price}">Buy </button> 
                                            </div>
                                        </div>
                                    </div>
  
  
                                </div>
                                
                                `;
  });
  const favButton = document.querySelectorAll("div div div div div i");
  favButton.forEach((button) => {
    button.addEventListener("click", addToFav);
  });

  const cartButton = document.querySelectorAll("div div div div div button");
  cartButton.forEach((button) => {
    button.addEventListener("click", addItemToCart);
  });
}

// Add product to favourites
function addToFav() {
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

function addItemToCart() {
  console.log("click");
  const cartKey = "cart";
  const currentCart = getStorage(cartKey);
  const id = this.dataset.id;
  const price = this.dataset.price;

  const productToAdd = currentCart.find((product) => product.id === id);
  if (!productToAdd) {
    const product = {
      id,
      price,
    };
    currentCart.push(product);
  }
  saveToStorage(cartKey, currentCart);
}
