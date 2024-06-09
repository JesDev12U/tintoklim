DROP DATABASE IF EXISTS tintoklim;

CREATE DATABASE tintoklim;
USE tintoklim;

CREATE TABLE tab_cliente(
	id_num_cte INT(6) ZEROFILL AUTO_INCREMENT UNIQUE,
    nombre_cte VARCHAR(60) NOT NULL,
    apellido_cte VARCHAR(60) NOT NULL,
    telefono_cte VARCHAR(10) PRIMARY KEY NOT NULL,
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

CREATE TABLE cat_colonia(
	cp VARCHAR(5),
    estado VARCHAR(30) NOT NULL,
    alc_mun VARCHAR(40) NOT NULL,
    col VARCHAR(40)
);
