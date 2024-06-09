const $navRegistro = document.getElementById("nav-registro");
const $navBusqueda = document.getElementById("nav-busqueda");
const $container = document.querySelector(".container");
const $busquedaContainer = document.querySelector(".busqueda-container");

function navFunction() {
  $navRegistro.classList.toggle("active");
  $navBusqueda.classList.toggle("active");
  $container.classList.toggle("visible");
  $busquedaContainer.classList.toggle("visible");
}

$navRegistro.addEventListener("click", navFunction);
$navBusqueda.addEventListener("click", navFunction);
