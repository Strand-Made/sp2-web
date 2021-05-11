import { url } from "../api/data.js";
import messageBox from "./messageBox.js";

export async function getHeroImage() {
  let newUrl = url + "/home";
  const container = document.querySelector("#hero-image");

  try {
    const response = await fetch(newUrl);
    const result = await response.json();

    const image = url + result.hero_banner.url;
    const imageAlt = result.hero_banner_alt_text;

    container.innerHTML += `
                            <div class="hero-banner w-full" > 
                                <div class="w-full overflow-hidden">
                                  <div class="relative">
                                      <div class="relative">
                                        <img class="w-full h-auto filter brightness-75 saturate-150" src="${image}" alt="${imageAlt}"/>
                                        <div class="flex flex-col justify-center items-center absolute bottom-5 top-5 right-0 left-0 z-50"> 
                                            <h1 class="text-xl md:text-3xl text-center font-black text-gray-50 my-3"> Smart gadgets for smart people </h1>
                                            <div class="flex justify-center">
                                              <a class="btn-purple text-xs w-24" href="products.html"> Browse </a>
                                            </div>
                                        </div>
                                      </div>
                                      <img class="w-full absolute bottom-0" src="./assets/wave-haikei.svg" alt="decorative waves" />
                                      
                                  </div>
                                </div>
                            </div>
    `;
  } catch (error) {
    messageBox(container, "error", "Error occured fetching image");
  }
}
