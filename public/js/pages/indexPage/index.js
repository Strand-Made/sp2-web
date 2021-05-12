import { createNav } from "../../components/navbar/mainNav.js";
import { getHeroImage } from "../../components/hero-image/heroImage.js";
import { getProducts } from "../../components/products/products.js";

const container = document.querySelector("#featured-products-catalog");

createNav();
getProducts(true, container);

getHeroImage();
