import { url } from "../api/data.js";

export async function getHeroImage() {
  let newUrl = url + "/home";
  const container = document.querySelector("#hero-image");

  try {
    const response = await fetch(newUrl);
    const result = await response.json();

    const image = url + result.hero_banner.url;
    const imageAlt = result.hero_banner_alt_text;

    container.innerHTML += `
                            <div class="hero-banner" > 
                                <div class="relative w-full overflow-hidden">
                                    <img class="w-full" src="${image}" alt="${imageAlt}"/>
                                    <div class="absolute inset-y-0 right-0 w-6/12 bg-wave-pattern bg-right ">
                                        <div class="flex flex-col"> 
                                            <h1 class="text-4xl font-black text-gray-50 my-3"> Smart gadgets for smart people </h1>
                                            <a class="btn-purple w-32" href="products.html"> Browse <a/>
                                        </div>
                                    </div>
                                </div>
                            </div>
    `;
  } catch (error) {
    console.log(error);
  }
}
