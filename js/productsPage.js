import { mobileNav } from "./components/navbar.js";
import { getProducts } from "./components/products.js";

mobileNav();

getProducts(false, "#products-container");
