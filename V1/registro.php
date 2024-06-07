<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$response = array("registro_exitoso" => false, "errores" => "Datos incompletos");

if (isset($_POST["nombre_cte"])) {
    include "./db/connection.php";
    try {
        $stmt = $conn->prepare("INSERT INTO tab_cliente VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        if ($stmt) {
            $stmt->bind_param(
                "ssssssssssss",
                $_POST["nombre_cte"],
                $_POST["apellido_cte"],
                $_POST["telefono_cte"],
                $_POST["correo_cte"],
                $_POST["ser_dom_cte"],
                $_POST["cp_cte"],
                $_POST["estado_cte"],
                $_POST["alc_mun_cte"],
                $_POST["col_cte"],
                $_POST["calle_cte"],
                $_POST["no_ext_cte"],
                $_POST["no_int_cte"]
            );

            if ($stmt->execute()) {
                if ($conn->affected_rows > 0) {
                    $response["registro_exitoso"] = true;
                    unset($response["errores"]);
                } else {
                    $response["errores"] = "No se realizaron cambios en la base de datos";
                }
            } else {
                $response["errores"] = "Error al ejecutar la consulta: " . $stmt->error;
            }
        } else {
            $response["errores"] = "Error al preparar la consulta: " . $conn->error;
        }
    } catch (Exception $e) {
        $response["errores"] = $e->getMessage();
    }
}
echo json_encode($response);
