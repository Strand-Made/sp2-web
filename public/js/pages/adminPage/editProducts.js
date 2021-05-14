import { url, getToken } from "../../api/data.js";
import { createNav } from "../../components/navbar/mainNav.js";
import messageBox from "../../utilities/messageBox.js";
import { deleteProduct } from "../../components/products/product-utilities/deleteProduct.js";
// create nav
createNav();

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
if (!id) {
  window.location.href = "/";
}

const form = document.querySelector("#edit-products-form");
// inputs
const title = document.querySelector("#product_title");
const productId = document.querySelector("#product_id");
const description = document.querySelector("#product_description");
const price = document.querySelector("#product_price");
const featured = document.querySelector("#product_featured");
const errorContainer = document.querySelector("#form-error");

async function getDetails() {
  let newUrl = url + "/products/" + id;
  try {
    const response = await fetch(newUrl);
    const result = await response.json();
    title.value = result.title;
    productId.value = result.id;
    description.value = result.description;
    price.value = result.price;
    featured.checked = result.featured;
    document.title = `Edit ${result.title} | HomeSmart`;

    deleteProduct(id);
  } catch (error) {
    console.log(error);
  }
}
getDetails();

form.addEventListener("submit", editProduct);

function editProduct(event) {
  event.preventDefault();
  // input values
  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value;
  const featuredValue = featured.checked;
  const prodIdVal = productId.value;

  if (
    titleValue.length === 0 ||
    descriptionValue.length === 10 ||
    priceValue === 0
  ) {
    return messageBox(errorContainer, "warning", "Please check your inputs.");
  }
  updateProduct(
    titleValue,
    descriptionValue,
    priceValue,
    prodIdVal,
    featuredValue
  );
}

async function updateProduct(title, description, price, id, featured) {
  let newUrl = url + "/products/" + id;
  const data = JSON.stringify({
    title,
    description,
    price,
    featured,
  });
  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(newUrl, options);
    const result = await response.json();
    if (result.updated_at) {
      messageBox(errorContainer, "success", "Update Successful");
    }
  } catch (error) {
    messageBox(
      errorContainer,
      "error",
      "An error ocurred when updating product. Please try again"
    );
  }
}
