import { createNav } from "./components/navbar/mainNav.js";
import { getProducts } from "./components/products.js";

createNav();
const container = document.querySelector("#products-container");

getProducts(false, container);
