const btnBusqueda = document.getElementById("btn-busqueda");
const errorBusqueda = document.getElementById("error-busqueda");
const miBusqueda = document.getElementById("miBusqueda");
const $loader = document.querySelector(".loader-container");

const userInfoId = document.getElementById("user-info-id");
const userInfoNombre = document.getElementById("user-info-nombre");
const userInfoApellido = document.getElementById("user-info-apellido");
const userInfoTelefono = document.getElementById("user-info-telefono");
const userInfoCorreo = document.getElementById("user-info-correo");
const userInfoSerDom = document.getElementById("user-info-serdom");
const userInfoCP = document.getElementById("user-info-cp");
const userInfoEstado = document.getElementById("user-info-estado");
const userInfoAlcMun = document.getElementById("user-info-alcmun");
const userInfoCol = document.getElementById("user-info-col");
const userInfoCalle = document.getElementById("user-info-calle");
const userInfoNExt = document.getElementById("user-info-next");
const userInfoNInt = document.getElementById("user-info-nint");

const clearUserInfo = () => {
  userInfoId.value = "";
  userInfoNombre.value = "";
  userInfoApellido.value = "";
  userInfoTelefono.value = "";
  userInfoCorreo.value = "";
  userInfoSerDom.value = "";
  userInfoCP.value = "";
  userInfoEstado.value = "";
  userInfoAlcMun.value = "";
  userInfoCol.value = "";
  userInfoCalle.value = "";
  userInfoNExt.value = "";
  userInfoNInt.value = "";
};

function handlerBtnBusqueda(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "./busqueda.php", true);
  xhr.responseType = "json";

  xhr.onload = function () {
    $loader.style.display = "flex";
    if (xhr.status === 200) {
      errorBusqueda.textContent = "";
      let data = xhr.response;
      btnBusqueda.disabled = false;
      if (data.length === 0) {
        errorBusqueda.textContent = "Cliente no encontrado";
        $loaderContainer.style.display = "none";
        clearUserInfo();
        btnBusqueda.disabled = true;
        return;
      }

      data.forEach((el) => {
        userInfoId.value = el.id_num_cte;
        userInfoNombre.value = el.nombre_cte;
        userInfoApellido.value = el.apellido_cte;
        userInfoTelefono.value = el.telefono_cte;
        userInfoCorreo.value = el.correo_cte;
        userInfoSerDom.value = el.ser_dom_cte === "1" ? "Si" : "No";
        userInfoCP.value = el.cp_cte;
        userInfoEstado.value = el.estado_cte;
        userInfoAlcMun.value = el.alc_mun_cte;
        userInfoCol.value = el.col_cte;
        userInfoCalle.value = el.calle_cte;
        userInfoNExt.value = el.no_ext_cte;
        userInfoNInt.value = el.no_int_cte;
      });
    } else {
      errorBusqueda.textContent("Error: " + xhr.status);
    }
    $loader.style.display = "none";
  };

  xhr.onerror = function () {
    $loader.style.display = "none";
    errorBusqueda.textContent("Error en la solicitud al servidor");
  };

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("criterio=" + encodeURIComponent(miBusqueda.value));
}

miBusqueda.addEventListener("input", function (e) {
  if (miBusqueda.value !== "") btnBusqueda.disabled = false;
  else btnBusqueda.disabled = true;
});

miBusqueda.addEventListener("keydown", (e) => {
  if (
    e.key === "Backspace" ||
    e.key === "Delete" ||
    (e.ctrlKey && e.key === "x")
  ) {
    clearUserInfo();
    errorBusqueda.textContent = "";
  } else if (e.key !== "Enter") clearUserInfo();
  if (e.key === "Enter") handlerBtnBusqueda(e);
});

btnBusqueda.addEventListener("click", handlerBtnBusqueda);
