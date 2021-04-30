export function mobileNav() {
  const navbarToggle = document.querySelector("#nav-toggle");
  // toggle navbar on/off on click
  navbarToggle.addEventListener("click", () => {
    const navbar = document.querySelector("#navbar");
    navbar.classList.toggle("hidden");
  });
}
