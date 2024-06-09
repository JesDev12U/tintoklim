DROP DATABASE IF EXISTS tintoklim;

CREATE DATABASE tintoklim;
USE tintoklim;

CREATE TABLE tab_cliente(
	id_num_cte INT(6) ZEROFILL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    nombre_cte VARCHAR(60) NOT NULL,
    apellido_cte VARCHAR(60) NOT NULL,
    telefono_cte VARCHAR(10) NOT NULL UNIQUE,
    correo_cte VARCHAR(60) NOT NULL UNIQUE,
    ser_dom_cte BOOLEAN NOT NULL,
    cp_cte VARCHAR(5),
    estado_cte VARCHAR(30),
    alc_mun_cte VARCHAR(40),
    col_cte VARCHAR(40),
    calle_cte VARCHAR(30),
    no_ext_cte VARCHAR(10),
    no_int_cte VARCHAR(10)
);
