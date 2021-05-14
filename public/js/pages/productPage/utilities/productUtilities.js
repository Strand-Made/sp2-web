import { url } from "../../../api/data.js";
import messageBox from "../../../utilities/messageBox.js";

export async function getSimilarProducts(id) {
  let newUrl = url + "/products";
  const container = document.querySelector("#similar-products");
  // transfrom id string to number
  const idNumb = +id;
  try {
    const response = await fetch(newUrl);
    const result = await response.json();
    // filter out active product
    const filteredResult = result.filter((product) => {
      if (product.id !== idNumb) {
        return product;
      }
    });
    createSimilarProducts(container, filteredResult);
    // FIX ARRAY LENGTH !!!!!!!!!!!!
    console.log("Things to do here !!", "Fix array length");
  } catch (error) {
    messageBox(container, "error occured getting suggestions. ");
  }
}

// create html for similiar products
function createSimilarProducts(container, array) {
  array.map((product) => {
    let productImgSrc = product.image_url;
    // if the product dont have a image url go to thumbnail url
    if (!product.image_url) {
      productImgSrc = url + `${product.image.formats.thumbnail.url}`;
    }
    container.innerHTML += `
                                <div class="flex flex-wrap mr-2 max-w-sm">
                                    <div class="flex-row">
                                        <div class=""> 
                                          <a href="product.html?id=${product.id}">
                                            <h5 class="text-m font-medium text-gray-900">${product.title}</h5> 
                                            <img class="h-20 w-36 md:h-36 rounded" src="${productImgSrc}" alt="${product.title}" />
                                         </a>
                                        </div>
                                        <div class="flex justify-between my-2">
                                            <p class="text-md text-purple-900 font-medium">$ ${product.price} </p>
                                            <a href="product.html?id=${product.id}" class="btn-yellow text-xs py-1 px-2 cursor-pointer">View </a> 
                                        </div>
                                    </div>
                                </div>
        
        `;
  });
}
