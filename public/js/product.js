import { url, getStorage } from "./api/data.js";
import { createNav } from "./components/navbar/mainNav.js";
import { addToFav, addItemToCart } from "./data/createProduct.js";
import messageBox from "./components/messageBox.js";

createNav();

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
if (!id) {
  window.location.href = "/";
}

// fetch product & create html
(async () => {
  let newUrl = url + `/products/${id}`;
  try {
    const container = document.querySelector("#product-container");
    const response = await fetch(newUrl);
    const result = await response.json();
    console.log(result);
    displayProduct(container, result);
  } catch (error) {
    console.log(error);
    messageBox(
      container,
      "bg-red-300 text-red-900 p-3 rounded",
      "An error has occured!"
    );
  }
})();
// function creating the html
function displayProduct(container, product) {
  document.title = `HomeSmart | ${product.title}`;

  const productImage = url + `${product.image.formats.small.url}`;
  const favourites = getStorage("favourites");
  let favClass = "bi-heart";
  // if prod is in favs return it
  const isFavourite = favourites.filter((fav) => {
    return parseInt(fav.id) === product.id;
  });

  if (isFavourite.length) {
    favClass = "bi-heart-fill";
  }
  container.innerHTML = `
                            <div class="flex flex-col mt-2">
                                <div class="flex flex-col">
                                    <h1 class="text-2xl mb-2 font-medium">${product.title}</h1>
                                    <img class="max-w-md rounded" src="${productImage}" alt="${product.title}" />
                                </div>
                                <div class="">
                                    <div class="flex flex-row justify-between my-2">
                                        <p class="text-2xl font-bold text-purple-900">$ ${product.price}</p>
                                        <i class="bi ${favClass} mr-3 cursor-pointer text-red-800 text-xl" aria-label="add to favourites" data-id="${product.id}"  ></i>
                                    </div>
                                    <div class="flex flex-row justify-center">
                                        <button id="add-to-cart" class="bg-yellow-400 hover:bg-yellow-600 shadow-md font-medium text-yellow-900 text-center rounded order-2 p-3 m-2 w-40" data-id="${product.id}" data-price=${product.price} >Add to cart</button>
                                        <button class="bg-gray-100 hover:bg-yellow-300 shadow-md font-medium text-gray-900 text-center rounded order-1 p-3 m-2 w-36"> Click & Collect </button>
                                    </div>
                                </div>
                                <div class="my-3">
                                    <h2 class="text-xl font-medium text-center">Description</h2>
                                    <p class="leading-relaxed max-w-prose text-gray-700 text-md">${product.description}</p>
                                 </div>
                            </div>
    `;
  const favButton = document.querySelector("div div div i");
  favButton.addEventListener("click", addToFav);
  const cartButton = document.querySelector("div div div #add-to-cart");
  cartButton.addEventListener("click", addItemToCart);

  // create similar products
  getSimiliarProducts(id);
}

async function getSimiliarProducts(id) {
  let newUrl = url + "/products";
  const container = document.querySelector("#similar-products");
  // transfrom id string to number
  const idNumb = +id;
  try {
    const response = await fetch(newUrl);
    const result = await response.json();
    // filter out active product
    const filteredResult = result.filter((product) => {
      if (product.id !== idNumb) {
        return product;
      }
    });
    console.log(container);
    createSimiliarProducts(container, filteredResult);
    // FIX ARRAY LENGTH !!!!!!!!!!!!
    console.log("Things to do here !!", "Fix array length");
  } catch (error) {
    console.log(error);
  }
}
// create similar products
function createSimiliarProducts(container, array) {
  array.map((product) => {
    const productImage = url + `${product.image.formats.small.url}`;
    container.innerHTML += `
                            <div class="flex flex-wrap">
                                <div class="flex-row">
                                    <div> 
                                      <a href="product.html?id=${product.id}"
                                        <h5 class="text-m font-medium text-gray-900">${product.title}</h5> 
                                        <img class="w-40 rounded" src="${productImage}" alt="${product.title}"
                                     </a>
                                    </div>
                                    <div class="flex justify-between my-2">
                                        <p class="text-md text-purple-900 font-medium">$ ${product.price} </p>
                                        <a href="product.html?id=${product.id}" class="btn-yellow cursor-pointer">Buy </a> 
                                    </div>
                                </div>
                            </div>
    
    `;
  });
}
