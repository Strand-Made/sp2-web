import { url, saveToStorage } from "../api/data.js";
import { createProducts } from "../data/createProduct.js";
import messageBox from "./messageBox.js";

let featuredList = [];

export async function getProducts(isFeatured, prodContainer) {
  let newUrl = url + "/products";
  const container = prodContainer;
  try {
    const response = await fetch(newUrl);
    const result = await response.json();

    featuredList = result;
    // filter out featured products
    if (isFeatured) {
      featuredList = result.filter((product) => product.featured === true);
      return createProducts(featuredList, container);
    } else {
      return createProducts(featuredList, container);
    }
  } catch (error) {
    messageBox(container, "bg-red-900 text-red-100", "An error has occured");

    console.log(error);
  }
}
