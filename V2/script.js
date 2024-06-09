//API para los codigos postales de México
const API_URL = "https://sepomex.icalialabs.com/api/v1/zip_codes";

const MAX_LENGTH_NUMS = 10;

const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const correoE = document.getElementById("correo-e");
const telefono = document.getElementById("telefono");
const CP = document.getElementById("cp");
const estado = document.getElementById("estado");
const alcMun = document.getElementById("alc-mun");
const colonias = document.getElementById("colonia");
const calle = document.getElementById("calle");
const nExt = document.getElementById("n-ext");
const nInt = document.getElementById("n-int");
const submitForm = document.getElementById("submit-form");
const serDomSi = document.getElementById("ser-dom-si");
const serDomNo = document.getElementById("ser-dom-no");

const errorNom = document.getElementById("error-nom");
const errorApellidos = document.getElementById("error-apellidos");
const errorCorreo = document.getElementById("error-correo");
const errorTelefono = document.getElementById("error-telefono");
const errorCalle = document.getElementById("error-calle");
const errorNExt = document.getElementById("error-n-ext");
const errorCP = document.getElementById("error-cp");

const loaderContainer = document.querySelector(".loader-container");

const servDomContainer = document.querySelector(".serv-dom-container");
const container = document.querySelector(".container");

const checkSubmit = () => {
  if (
    nombre.value === "" ||
    apellidos.value === "" ||
    !isCorrectEmail(correoE.value) ||
    correoE.value === "" ||
    !isCorrectPhoneNumber(telefono.value) ||
    telefono.value === "" ||
    (CP.required && (CP.value === "" || CP.value.length !== 5)) ||
    (estado.required && estado.value === "") ||
    (alcMun.required && alcMun.value === "") ||
    (calle.required && calle.value === "") ||
    (nExt.required && nExt.value === "")
  )
    submitForm.disabled = true;
  else submitForm.disabled = false;
};

const formatStr = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/gi, "")
    .toUpperCase();

const formatStrComplete = (str) => str.trim();

const formatEmail = (email) => email.trim().toLowerCase();

const isCorrectEmail = (email) => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
};

const isCorrectPhoneNumber = (phone) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};

const clearServDom = () => {
  estado.value = "";
  alcMun.value = "";
  colonias.innerHTML = "";
};

document.addEventListener("DOMContentLoaded", checkSubmit);

//Formatos adecuados de los campos
CP.addEventListener("keypress", function (e) {
  let char = e.key;
  if (!/[0-9]/.test(char) || this.value.length === 5) e.preventDefault();
});

nombre.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  checkSubmit();

  if (this.value.length > 60) {
    this.value = this.value.slice(0, 60);
  }
  errorNom.textContent = nombre.value === "" ? "Campo obligatorio" : "";
});

nombre.addEventListener("change", function (e) {
  this.value = formatStrComplete(this.value);
});

apellidos.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  checkSubmit();

  if (this.value.length > 60) {
    this.value = this.value.slice(0, 60);
  }
  errorApellidos.textContent =
    apellidos.value === "" ? "Campo obligatorio" : "";
});

apellidos.addEventListener("change", function (e) {
  this.value = formatStrComplete(this.value);
});

correoE.addEventListener("input", function (e) {
  this.value = this.value
    .replace(/[^a-zA-Z0-9@.]/g, "")
    .replace(/\.{2,}/g, ".") // Elimina puntos consecutivos
    .toLowerCase()
    .trim();
  if (this.value.length > 60) {
    this.value = this.value.slice(0, 60);
  }
  checkSubmit();
  errorCorreo.textContent =
    correoE.value === ""
      ? "Campo obligatorio"
      : !isCorrectEmail(correoE.value)
      ? "Correo inválido, formato requerido: usuario@dominio.ext"
      : "";
});

telefono.addEventListener("input", function (e) {
  this.value = this.value.trim().replace(/\D/g, "");
  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }
  checkSubmit();
  errorTelefono.textContent =
    telefono.value === ""
      ? "Campo obligatorio"
      : !isCorrectPhoneNumber(telefono.value)
      ? "Teléfono inválido, este debe ser de 10 dígitos"
      : "";
});

calle.addEventListener("input", function (e) {
  if (this.value.length > 30) {
    this.value = this.value.slice(0, 30);
  }
  this.value = formatStr(this.value);
  checkSubmit();

  errorCalle.textContent = calle.value === "" ? "Campo obligatorio" : "";
});

calle.addEventListener("change", function (e) {
  this.value = formatStrComplete(this.value);
});

nExt.addEventListener("keypress", function (e) {
  if (this.value.length === MAX_LENGTH_NUMS) e.preventDefault();
});

nExt.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  checkSubmit();

  errorNExt.textContent = nExt.value === "" ? "Campo obligatorio" : "";
});

nExt.addEventListener("change", function (e) {
  this.value = formatStrComplete(this.value);
});

nInt.addEventListener("keypress", function (e) {
  if (this.value.length === MAX_LENGTH_NUMS) e.preventDefault();
});

nInt.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  checkSubmit();
});

nInt.addEventListener("change", function (e) {
  this.value = formatStrComplete(this.value);
});

serDomSi.addEventListener("change", function (e) {
  if (this.checked) {
    calle.required = true;
    nExt.required = true;
    CP.required = true;
    checkSubmit();
    servDomContainer.classList.add("visible");
    container.style.transform = "scale(0.85)";

    let mediaQuery = window.matchMedia(
      "(max-width: 584px), (max-height: 765px)"
    );

    function handleScreenChange(e) {
      if (e.matches && serDomSi.checked) container.style.transform = "scale(1)";
      else container.style.transform = "scale(0.85)";
    }
    mediaQuery.addEventListener("change", handleScreenChange);

    handleScreenChange(mediaQuery);
  }
});

serDomNo.addEventListener("change", function (e) {
  if (this.checked) {
    calle.required = false;
    nExt.required = false;
    CP.required = false;
    checkSubmit();
    servDomContainer.classList.remove("visible");
    container.style.transform = "scale(1)";
  }
});

CP.addEventListener("input", function (e) {
  errorCP.textContent = CP.value === "" ? "Campo obligatorio" : "";
  if (this.value.length === 5) {
    colonias.innerHTML = "";
    loaderContainer.style.display = "flex";
    fetch(`${API_URL}?zip_code=${this.value}`)
      .then((response) => response.json())
      .then((data) => {
        colonias.innerHTML = "";

        if (data.zip_codes.length === 0) {
          errorCP.textContent = "El CP ingresado no existe";
          loaderContainer.style.display = "none";
          clearServDom();
          checkSubmit();
          submitForm.disabled = true;
          return;
        }

        data.zip_codes.forEach((zip_code) => {
          estado.value = formatStr(zip_code.d_estado);
          alcMun.value = formatStr(zip_code.d_mnpio);
          let option = document.createElement("option");
          option.text = option.value = formatStr(zip_code.d_asenta);
          colonias.appendChild(option);
        });
        checkSubmit();
        loaderContainer.style.display = "none";
      });
  } else {
    clearServDom();
  }
});
