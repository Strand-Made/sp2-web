import { createNav } from "./components/navbar/mainNav.js";
import { url, getToken } from "./api/data.js";
import messageBox from "./components/messageBox.js";
// create nav
createNav();

const form = document.querySelector("#add-products-form");
const title = document.querySelector("#product_title");
const description = document.querySelector("#product_description");
const price = document.querySelector("#product_price");
const image = document.querySelector("#product_image");
const featured = document.querySelector("#product_featured");
const errorContainer = document.querySelector("#form-error");
const adminToken = getToken();
console.log(adminToken);
// if no token in storage, redirect to login page
if (!adminToken.length) {
  window.location.href = "admin.html";
}
// Create product
form.addEventListener("submit", postProduct);

function postProduct(event) {
  event.preventDefault();
  const titleVal = title.value.trim();
  const descriptionVal = description.value.trim();
  const priceVal = price.value;
  const imageVal = image.value;
  const featuredVal = featured.checked;

  if (titleVal.length === 0 || descriptionVal.length === 5) {
    return messageBox(
      errorContainer,
      "bg-yellow-300 text-yellow-900 p-3 rounded",
      "Please check your values."
    );
  }

  createNewProduct(titleVal, descriptionVal, priceVal, imageVal, featuredVal);
}

// post new product
async function createNewProduct(title, description, price, image, featured) {
  let newUrl = url + "/products";
  const data = JSON.stringify({
    title: title,
    description: description,
    price: price,
    image: image,
    featured: featured,
  });
  const token = getToken();
  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(newUrl, options);
    const result = await response.json();
  } catch (error) {}
}

// Get products and create html

(async () => {
  const productContainer = document.querySelector("#edit-products-products");
  const errorContainer = document.querySelector("#form-error");
  let newUrl = url + "/products";
  try {
    const response = await fetch(newUrl);
    const result = await response.json();

    displayAdminProducts(result, productContainer);
  } catch (error) {
    console.log(error);
    messageBox(
      errorContainer,
      "bg-red-200 text-red-900 rounded",
      "An error has occured"
    );
  }
})();

function displayAdminProducts(array, container) {
  container.innerHTML = "";
  array.map((product) => {
    const productImgSrc = url + `${product.image.formats.small.url}`;

    container.innerHTML += `<div class=" flex flex-row justify-center my-2">
                                    <img class="w-4/12 mr-1 rounded" src="${productImgSrc}" alt="${product.title}"/>
                                    <div class="flex w-6/12 flex-col justify-between">
                                        <div> 
                                            <h5 class="text-m text-purple-900">${product.title} </h5> 
                                            
                                        </div>
                                        <div class="flex flex-row justify-between w-">
                                            <p class=" text-m text-purple-900 ">$ ${product.price} </p>
                                            
                                            <div class="flex justify-center items-center">
                                
  
                                                <a href="editProduct.html?id=${product.id}" id="edit-product" class="btn-yellow cursor-pointer">Edit </a> 
                                            </div>
                                        </div>
                                    </div>
  
  
                                </div>
                                
                                `;
  });
}
