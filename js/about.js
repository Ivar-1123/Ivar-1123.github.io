document.getElementById("openButton").addEventListener("click", menuOpen);
document.getElementById("closeButton").addEventListener("click", menuOpen);

function menuOpen() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("nav-open");
}
