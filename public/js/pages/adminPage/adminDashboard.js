import { createNav } from "../../components/navbar/mainNav.js";
import { url, getToken } from "../../api/data.js";
import messageBox from "../../utilities/messageBox.js";
import { displayAdminProducts } from "../../components/products/adminProducts.js";
import { updateWindow } from "../../utilities/reloadTimer.js";
// create nav
createNav();

const form = document.querySelector("#add-products-form");

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
  // inputs
  const title = document.querySelector("#product_title");
  const description = document.querySelector("#product_description");
  const price = document.querySelector("#product_price");
  const image = document.querySelector("#product_image");
  const featured = document.querySelector("#product_featured");
  // input values
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
  // get image from regex passed object
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
    // create html for products
    displayAdminProducts(result, productContainer, url);
  } catch (error) {
    console.log("Error occured when getting products", error);
    messageBox(errorContainer, "error", "An error has occured");
  }
})();
