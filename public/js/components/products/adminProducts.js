// Create html for admin products
export function displayAdminProducts(array, container, url) {
  container.innerHTML = "";
  array.map((product) => {
    let productImgSrc = product.image_url;
    // if the product dont have a image url go to thumbnail url
    if (!product.image_url) {
      productImgSrc = url + `${product.image.formats.thumbnail.url}`;
    }

    container.innerHTML += `<div class="flex flex-row md:flex-col md:w-auto p-3 my-2 sm:mx-2">
                                    <div class="w-40 mr-2 md:w-32 md:h-24">
                                      <img class="rounded object-contain" src="${productImgSrc}" alt="${product.title}"/>
                                    </div>
                                    <div class="flex w-6/12 md:w-full flex-col justify-between">
                                        <div> 
                                            <h5 class="text-m text-purple-900">${product.title} </h5> 
                                        </div>
                                        <div class="flex flex-row justify-between w-full">
                                            <p class="text-m md:text-sm text-purple-900 ">$ ${product.price} </p>
                                            
                                            <div class="flex justify-center items-center">
                                                <a href="editProduct.html?id=${product.id}" id="edit-product" class="btn-yellow cursor-pointer text-sm">Edit </a> 
                                            </div>
                                        </div>
                                    </div>
  
  
                                </div>
                                
                                `;
  });
}
