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

const checkSubmit = () => {
  if (
    nombre.value === "" ||
    apellidos.value === "" ||
    correoE === "" ||
    telefono === "" ||
    (CP.required && CP.value) === "" ||
    (estado.required && estado.value) === "" ||
    (alcMun.required && alcMun.value) === "" ||
    (calle.required && calle.value) === "" ||
    (nExt.required && nExt.value === "")
  )
    submitForm.disabled = true;
  else submitForm.disabled = false;
};

const formatStr = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

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
});

apellidos.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  checkSubmit();
});

calle.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  checkSubmit();
});

nExt.addEventListener("keypress", function (e) {
  if (this.value.length === MAX_LENGTH_NUMS) e.preventDefault();
});

nExt.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  checkSubmit();
});

nInt.addEventListener("keypress", function (e) {
  if (this.value.length === MAX_LENGTH_NUMS) e.preventDefault();
});

nInt.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  checkSubmit();
});

serDomSi.addEventListener("change", function (e) {
  if (this.checked) {
    nExt.required = true;
    checkSubmit();
  }
});

serDomNo.addEventListener("change", function (e) {
  if (this.checked) {
    nExt.required = false;
    checkSubmit();
  }
});

CP.addEventListener("input", function (e) {
  checkSubmit();
  if (this.value.length === 5) {
    colonias.innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./cp.php", true);
    xhr.responseType = "json";

    xhr.onload = function () {
      if (xhr.status === 200) {
        let data = xhr.response;

        if (data.length === 0) {
          alert("No se encontró el código postal");
          clearServDom();
          checkSubmit();
          return;
        }

        data.forEach((el) => {
          estado.value = formatStr(el.estado);
          alcMun.value = formatStr(el.alc_mun);
          let option = document.createElement("option");
          option.text = option.value = formatStr(el.col);
          colonias.appendChild(option);
        });
        checkSubmit();
      } else {
        console.error("Error: " + xhr.status);
      }
    };

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send("cp=" + encodeURIComponent(CP.value));
  } else {
    clearServDom();
  }
});
