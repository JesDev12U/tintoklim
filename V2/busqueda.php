<?php
if (isset($_POST["criterio"])) {
    include "db/connection.php";
    //Para prevenir las SQL Injection
    $criterio = mysqli_real_escape_string($conn, $_POST["criterio"]);

    $sql = "SELECT * FROM tab_cliente WHERE telefono_cte = '$criterio' OR correo_cte = '$criterio'";
    $result = $conn->query($sql);

    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}
