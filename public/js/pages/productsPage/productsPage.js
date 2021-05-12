import { createNav } from "../../components/navbar/mainNav.js";
import { createProducts } from "../../components/products/createProduct.js";
import { url } from "../../api/data.js";
import messageBox from "../../utilities/messageBox.js";

createNav();
const container = document.querySelector("#products-container");

(async () => {
  let newUrl = url + "/products";
  try {
    const response = await fetch(newUrl);
    const result = await response.json();
    console.log(result);
    createProducts(result, container);
    filterProducts(result);
  } catch (error) {
    messageBox(
      container,
      "error",
      "error occured getting products! Please try again later."
    );
  }
})();

// filter on search
function filterProducts(products) {
  const filterInput = document.querySelector("#filter-products");
  filterInput.onkeyup = function (event) {
    const filterValue = event.target.value.trim().toLowerCase();
    const filteredProducts = products.filter((product) => {
      if (product.title.toLowerCase().includes(filterValue)) {
        return true;
      } else if (product.description.toLowerCase().includes(filterValue)) {
        return true;
      }
    });
    createProducts(filteredProducts, container);
  };
}
