<?php
if (isset($_POST["cp"])) {
    include "db/connection.php";
    //Para prevenir las SQL Injection
    $cp = mysqli_real_escape_string($conn, $_POST["cp"]);

    $sql = "SELECT estado, alc_mun, col FROM cat_colonia WHERE cp = '$cp'";
    $result = $conn->query($sql);

    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}
