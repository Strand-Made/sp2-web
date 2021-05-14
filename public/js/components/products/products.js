import { url } from "../../api/data.js";
import { createProducts } from "../products/createProduct.js";
import messageBox from "../../utilities/messageBox.js";

export async function getProducts(isFeatured, prodContainer) {
  let featuredList = [];
  let newUrl = url + "/products";
  const container = prodContainer;
  try {
    const response = await fetch(newUrl);
    const result = await response.json();

    featuredList = result;
    // if is featured is true, return only featured products else return all
    if (isFeatured) {
      featuredList = result.filter((product) => product.featured === true);
      return createProducts(featuredList, container);
    } else {
      return createProducts(featuredList, container);
    }
  } catch (error) {
    messageBox(container, "error", "An error has occured");

    console.log(error);
  }
}
