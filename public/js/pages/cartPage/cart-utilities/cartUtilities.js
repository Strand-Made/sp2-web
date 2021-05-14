import { url, getStorage, saveToStorage } from "../../../api/data.js";

// create html for products
export function createCartItems(products, container) {
  let productImgSrc = products.image_url;
  // if the product dont have a image url go to thumbnail url
  if (!products.image_url) {
    productImgSrc = url + `${products.image.formats.thumbnail.url}`;
  }

  container.innerHTML += ` 
    <li class="w-full border-b-2 border-gray-50 flex items-center justify-between">
      <div class=" flex flex-row mt-3">
        <a href="product.html?id=${products.id}"><img class="w-20 mr-1 rounded md:w-36" src="${productImgSrc}" alt="${products.title}"/></a>
        <div class="flex flex-col justify-between">
            <div class="flex flex-col items-center justify-center md:items-start"> 
              <h5 class="text-l font-medium text-gray-900 mr-3">${products.title} </h5> 
            </div>
            <div> 
              <p class="text-sm text-gray-600 w-40 md:w-96 truncate">${products.description} </p> 
            </div>
            <div class="justify-items-end w-full">
              <p class="text-sm font-medium text-purple-700 ">$ ${products.price} </p>
            </div>
          </div>
      </div>
      <div class="justify-items-end items-end">
        <span class="removeItem bi bi-x-circle-fill text-m text-red-800 block hover:text-red-600 cursor-pointer font-bolder"
          title="remove product" aria-label="remove item" data-id="${products.id}" ></span>
      </div>
    </li>
        
        `;
  // remove item on click
  const removeButton = document.querySelectorAll(".removeItem");
  removeButton.forEach((button) => {
    button.addEventListener("click", removeProduct);
  });
}

function removeProduct() {
  const tokenKey = "cart";
  const id = this.dataset.id;

  const cartArray = getStorage(tokenKey);
  // find product clicked
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
