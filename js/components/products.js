import { url } from "../api/data.js";

let featuredList = [];

export async function getProducts(isFeatured, prodContainer) {
  let newUrl = url + "/products";
  const container = document.querySelector(prodContainer);
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
    console.log(error);
  }
}

function sliceText(text, length) {
  const slicedText = text.slice(length);
  return slicedText;
}

// Create html for products
function createProducts(array, container) {
  array.forEach((product) => {
    const productDesc = sliceText(product.description, 500);
    const productImage = url + `${product.image.formats.small.url}`;
    container.innerHTML += `<div class="w-full flex flex-row mt-3">
                                  <img class="w-52 mr-3" src="${productImage}" alt="${product.title}"/>
                                  <div class="flex flex-col justify-between w-full">
                                      <div> 
                                          <h5 class="text-xl text-purple-900">${product.title} </h5> 
                                          <p class="text-gray-400 text-sm">${productDesc}... </p>
                                      </div>
                                      <div class="flex flex-row justify-between px-2">
                                          <p class="font-bold text-xl text-purple-900 ">$ ${product.price} </p>
                                          
                                          <div class="flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                            data="${product.id}"
                                            id="heart" 
                                            width="16" height="16" fill="currentColor" 
                                            class="bi bi-heart block mr-3" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                            </svg>
            
                                              <button class="btn-yellow">Buy </button> 
                                          </div>
                                      </div>
                                  </div>


                              </div>
                              
                              `;
  });
}
