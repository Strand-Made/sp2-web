import { createNav } from "../../components/navbar/mainNav.js";
import { url, getToken } from "../../api/data.js";
import messageBox from "../../utilities/messageBox.js";
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

// if no token in storage, redirect to login page
if (!adminToken.length) {
  window.location.href = "admin.html";
}
// Create product
form.addEventListener("submit", postProduct);

// on submit form
function postProduct(event) {
  event.preventDefault();
  const titleVal = title.value.trim();
  const descriptionVal = description.value.trim();
  const priceVal = price.value;
  const imageFile = image.value;
  const featuredVal = featured.checked;
  // Regular expression to test if image url is a url
  const regexExpression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  const trueUrl = imageFile.match(regexExpression);
  // if url dont match regex return error
  if (!trueUrl) {
    return messageBox(
      errorContainer,
      "warning",
      "Please include a valid image url"
    );
  }
  const prodImg = trueUrl[0];
  // Check if there is values in the inputs
  if (titleVal.length === 0 || descriptionVal.length === 5) {
    return messageBox(errorContainer, "warning", "Please check your values.");
  }

  createNewProduct(titleVal, descriptionVal, priceVal, prodImg, featuredVal);
}

// post new product
async function createNewProduct(title, description, price, image, featured) {
  let newUrl = url + "/products";

  const data = JSON.stringify({
    title: title,
    description: description,
    price: price,
    image_url: image,
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
    console.log(result);

    if (result.title) {
      updateWindow(
        messageBox(
          errorContainer,
          "success",
          "Upload Successful! Window will reload in 3 seconds"
        )
      );
    } else if (result.error) {
      messageBox(errorContainer, "error", "An error occured creating product");
    }
  } catch (error) {
    console.log("Error occured when fetching", error);
    messageBox(errorContainer, "error", "An error has occured");
  }
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
    messageBox(errorContainer, "error", "An error has occured");
  }
})();

// Create html for admin products
function displayAdminProducts(array, container) {
  container.innerHTML = "";
  array.map((product) => {
    let productImgSrc = product.image_url;
    // if the product dont have a image url go to thumbnail url
    if (!product.image_url) {
      productImgSrc = url + `${product.image.formats.thumbnail.url}`;
    }

    container.innerHTML += `<div class="flex flex-row md:flex-col md:w-auto p-3 my-2 sm:mx-2">
                                    <div class="w-40 mr-2 md:w-32 md:h-24">
                                      <img class="rounded object-contain" src="${productImgSrc}" alt="${product.title}"/>
                                    </div>
                                    <div class="flex w-6/12 md:w-full flex-col justify-between">
                                        <div> 
                                            <h5 class="text-m text-purple-900">${product.title} </h5> 
                                        </div>
                                        <div class="flex flex-row justify-between w-full">
                                            <p class="text-m md:text-sm text-purple-900 ">$ ${product.price} </p>
                                            
                                            <div class="flex justify-center items-center">
                                                <a href="editProduct.html?id=${product.id}" id="edit-product" class="btn-yellow cursor-pointer text-sm">Edit </a> 
                                            </div>
                                        </div>
                                    </div>
  
  
                                </div>
                                
                                `;
  });
}

// reload window after 3 seconds
function updateWindow(message) {
  message;
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}
