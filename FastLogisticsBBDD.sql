drop database proyectojava;

Create database proyectojava;
use proyectojava;

CREATE TABLE `productos` (
  `idproducto` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nombreProducto` varchar(100) NOT NULL,
  `descripcion` text NOT NULL
);


CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `passuser` varchar(100) NOT NULL,
  `type` int (1) NOT NULL,   /*1(admin), 2(repartidor), 3(limpiador)*/
  `nombre_empleado` varchar(100) NOT NULL
);

CREATE TABLE `tareas`(
	`idtarea` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `direccion` varchar(100) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `finalizada` bit DEFAULT 0, /* 1 finalizada, 0 no finalizada */
    FOREIGN KEY (idusuario) REFERENCES usuarios(idusuario)
);

CREATE TABLE `productostareas`(
	`idtarea` int(11) NOT NULL,
	`idproducto` int(11) NOT NULL,
    FOREIGN KEY (idtarea) REFERENCES tareas(idtarea) on delete cascade,
    FOREIGN KEY (idproducto) REFERENCES productos(idproducto)
);

INSERT INTO `productos` (`idproducto`, `nombreProducto`, `descripcion`) VALUES
(1, 'Lejía', 'Producto desinfectante'),
(2, 'Limpia cristales', 'Limpiador de cristales xD'),
(3, 'Fregasuelos', 'Productos para limpiar manchas del suelo.'),
(4, 'Cubos', 'Para llevar agüita.'),
(5, 'Escoba', 'Para barrer mai frien.'),
(6, 'Recogedor', 'Para recoger la basurita.'),
(7, 'bayetas', 'Para limpiar superfícies.');


INSERT INTO `usuarios` (`idusuario`, `usuario`, `passuser`,`type`, `nombre_empleado`) VALUES
(1, 'admin', 'admin', 1, 'admin'),
(2, 'pol_lozano', '1234', 2, 'Pol Lozano'),
(3, 'eric_muntane', '12345', 2, 'Eric Muntane'),
(4, 'manuel_pretel', '123456', 2, 'Manuel Pretel'),
(5, 'repartidor', '123', 2, 'repartidor'),
(6, 'limpiador', '123', 3, 'limpiador'),
(12, 'prueba', 'prueba', 2, 'empleado');


INSERT INTO `tareas` (`idtarea`, `direccion`, `idusuario`) VALUES
(1, 'Calle 1, Ciudad 1', 5),
(2, 'Avenida 2, Ciudad 2', 2),
(3, 'Carrera 3, Ciudad 3', 3),
(4, 'Calle 4, Ciudad 4', 5),
(5, 'Avenida 5, Ciudad 5', 2),
(6, 'Carrera 6, Ciudad 6', 3),
(7, 'Calle 7, Ciudad 7', 5),
(8, 'Avenida 8, Ciudad 8', 2),
(9, 'Carrera 9, Ciudad 9', 3),
(10, 'Calle 10, Ciudad 10', 5),
(11, 'Avenida 11, Ciudad 11', 5),
(12, 'Carrera 12, Ciudad 12', 3),
(13, 'Calle 13, Ciudad 13', 2),
(14, 'Avenida 14, Ciudad 14', 2),
(15, 'Carrera 15, Ciudad 15', 3),
(16, 'Calle 16, Ciudad 16', 2),
(17, 'Avenida 17, Ciudad 17', 2),
(18, 'Carrera 18, Ciudad 18', 3),
(19, 'Calle 19, Ciudad 19', 5),
(20, 'Avenida 20, Ciudad 20', 2),
(21, 'Carrera 21, Ciudad 21', 3),
(22, 'Calle 22, Ciudad 22', 5),
(23, 'Avenida 23, Ciudad 23', 2),
(24, 'Carrera 24, Ciudad 24', 3),
(25, 'Calle 25, Ciudad 25', 5),
(26, 'Avenida 26, Ciudad 26', 2),
(27, 'Carrera 27, Ciudad 27', 3),
(28, 'Calle 28, Ciudad 28', 5),
(29, 'Avenida 29, Ciudad 29', 2),
(30, 'Carrera 30, Ciudad 30', 3);


INSERT INTO `productostareas` (`idtarea`,  `idproducto`) VALUES
	(1, 1),
	(1, 4),
	(1, 7),
	(2, 1),
	(2, 3),
	(2, 5),
	(3, 2),
	(4, 3),
	(4, 4),
	(5, 1),
	(5, 2),
	(6, 6),
	(6, 7),
	(7, 4),
	(8, 5),
	(9, 2),
	(9, 7),
	(10, 3),
	(10, 6),
    (11, 1),
	(11, 4),
	(11, 7),
	(12, 1),
	(12, 3),
	(12, 5),
	(13, 2),
	(14, 3),
	(14, 4),
	(15, 1),
	(15, 2),
	(16, 6),
	(16, 7),
	(17, 4),
	(18, 5),
	(19, 2),
	(19, 7),
	(20, 3),
	(20, 6),
    (21, 1),
	(21, 4),
	(21, 7),
	(22, 1),
	(22, 3),
	(22, 5),
	(23, 2),
	(24, 3),
	(24, 4),
	(25, 1),
	(25, 2),
	(26, 6),
	(26, 7),
	(27, 4),
	(28, 5),
	(29, 2),
	(29, 7),
	(30, 3),
	(30, 6);
    
    


/*
START TRANSACTION;

INSERT INTO tareas (direccion, idusuario)
VALUES ('Calle Falsa 123', 1);

SET @idtarea = LAST_INSERT_ID();

INSERT INTO productostareas (idtarea, idproducto)
VALUES (@idtarea, 1),
       (@idtarea, 2),
       (@idtarea, 3);

COMMIT;
*/

select * from tareas;
select * from productostareas;

select tareas.idtarea, tareas.direccion, tareas.finalizada, usuarios.idusuario, usuarios.usuario
from tareas join usuarios on tareas.idusuario = usuarios.idusuario;

select count(idusuario)
from usuarios
where type=2;

SELECT * FROM usuarios u LEFT JOIN tareas t ON u.idusuario = t.idusuario WHERE type = 2 ORDER BY u.idusuario;
 