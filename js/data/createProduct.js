import { url, saveToStorage, getStorage } from "../api/data.js";

function sliceText(text, length) {
  const slicedText = text.slice(length);
  return slicedText;
}

export function createProducts(array, container) {
  container.innerHTML = "";
  array.map((product) => {
    const productDesc = sliceText(product.description, 500);
    const productImage = url + `${product.image.formats.small.url}`;
    container.innerHTML += `<div class=" flex flex-row mt-3 justify-center">
                                    <img class="w-5/12 mr-1" src="${productImage}" alt="${product.title}"/>
                                    <div class="flex w-6/12 flex-col justify-between">
                                        <div> 
                                            <h5 class="text-xl text-purple-900">${product.title} </h5> 
                                            <p class="text-gray-400 text-sm  truncate">${productDesc}... </p>
                                        </div>
                                        <div class="flex flex-row justify-between w-">
                                            <p class="font-bold text-xl text-purple-900 ">$ ${product.price} </p>
                                            
                                            <div class="flex justify-center items-center">
                                            <i data-id="${product.id}" class="bi bi-heart mr-3"></i>
  
                                                <button id="add-to-cart" class="btn-yellow" data-img="${productImage}" data-price="${product.price}" data-id="${product.id}" data-title="${product.title}" data-description="${product.description}" data-quantity="${product.quantity}" >Buy </button> 
                                            </div>
                                        </div>
                                    </div>
  
  
                                </div>
                                
                                `;
  });
  const favButton = document.querySelectorAll("div div div div div i");
  favButton.addEventListener("click", addToFav);
}

// Add product to favourites
function addToFav() {
  const favKey = "favourites";
  this.classList.toggle("heart-fill");
  this.classList.toggle("heart");
  const title = this.dataset.title;
  const id = this.dataset.id;
  const description = this.dataset.description;
  const price = this.dataset.price;

  const currentFavs = getStorage(favKey);

  const productExst = currentFavs.find(function (fav) {
    return fav.id === id;
  });

  if (!productExst) {
    const product = {
      title: title,
      id: id,
      description: description,
      price: price,
    };
    currentFavs.push(product);
    saveToStorage(favKey, currentFavs);
  }
}
