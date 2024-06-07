const $submitForm = document.getElementById("submit-form");
const $loaderContainer = document.querySelector(".loader-container");
const $avisoExito = document.querySelector(".aviso-exito");
const $avisoFracaso = document.querySelector(".aviso-fracaso");
const $avisoFracasoP = document.querySelector(".aviso-fracaso p");

const $nombre = document.getElementById("nombre");
const $apellidos = document.getElementById("apellidos");
const $correoE = document.getElementById("correo-e");
const $telefono = document.getElementById("telefono");
const $serDomSi = document.getElementById("ser-dom-si");
const $CP = document.getElementById("cp");
const $estado = document.getElementById("estado");
const $alcMun = document.getElementById("alc-mun");
const $colonias = document.getElementById("colonia");
const $calle = document.getElementById("calle");
const $nExt = document.getElementById("n-ext");
const $nInt = document.getElementById("n-int");

const clearForm = () => {
  $nombre.value = "";
  $apellidos.value = "";
  $correoE.value = "";
  $telefono.value = "";
  $CP.value = "";
  $estado.value = "";
  $alcMun.value = "";
  $colonias.innerHTML = "";
  $calle.value = "";
  $nExt.value = "";
  $nInt.value = "";
  $submitForm.disabled = true;
};

$submitForm.addEventListener("click", (e) => {
  e.preventDefault();

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "./registro.php", true);
  xhr.responseType = "json";

  xhr.onload = function () {
    $loaderContainer.style.display = "flex";
    if (xhr.status === 200) {
      let data = xhr.response;
      if (data && data.registro_exitoso) {
        $avisoExito.classList.add("visible");

        setTimeout(() => {
          $avisoExito.classList.remove("visible");
          clearForm();
        }, 4000);
      } else {
        let dataError = data.errores.split(" ");
        if (dataError[0] === "Duplicate")
          $avisoFracasoP.textContent = `El campo ${dataError[2]} ya está en uso`;
        else $avisoFracasoP.textContent = data.error || "Error desconocido";
        $avisoFracaso.classList.add("visible");

        setTimeout(() => {
          $avisoFracaso.classList.remove("visible");
        }, 4000);
      }
    } else {
      $avisoFracasoP.textContent = "Error en la solicitud al servidor";
      $avisoFracaso.classList.add("visible");

      setTimeout(() => {
        $avisoFracaso.classList.remove("visible");
      }, 4000);
    }
    $loaderContainer.style.display = "none";
  };

  xhr.onerror = function () {
    $loaderContainer.style.display = "none";
    $avisoFracasoP.textContent = "Error en la solicitud al servidor";
    $avisoFracaso.classList.add("visible");

    setTimeout(() => {
      $avisoFracaso.classList.remove("visible");
    }, 4000);
  };

  const data = new URLSearchParams();
  data.append("nombre_cte", $nombre.value);
  data.append("apellido_cte", $apellidos.value);
  data.append("telefono_cte", $telefono.value);
  data.append("correo_cte", $correoE.value);
  data.append("ser_dom_cte", $serDomSi.checked);
  data.append("cp_cte", $CP.value || "");
  data.append("estado_cte", $estado.value || "");
  data.append("alc_mun_cte", $alcMun.value || "");
  data.append("col_cte", $colonias.value || "");
  data.append("calle_cte", $calle.value || "");
  data.append("no_ext_cte", $nExt.value || "");
  data.append("no_int_cte", $nInt.value || "");

  $loaderContainer.style.display = "flex";
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
});
