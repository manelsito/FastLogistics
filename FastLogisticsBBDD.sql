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
  `nombre_empleado` varchar(100) NOT NULL DEFAULT ''
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
(1, 'Detergente multiusos', 'Producto para limpiar varias superficies.'),
(2, 'Limpiador de cristales', 'Producto para limpiar ventanas y espejos.'),
(3, 'Desinfectante', 'Producto desinfectante para limpiar superficies.'),
(4, 'Fregasuelos', 'Producto para limpiar el suelo.'),
(5, 'Cepillo', 'Para limpiar manchas difíciles en superficies duras.'),
(6, 'Bayetas de microfibra', 'Para limpiar y secar varias superficies.'),
(7, 'Quitamanchas', 'Producto para eliminar manchas en telas.'),
(8, 'Desatascador', 'Para desatascar tuberías y desagües.'),
(9, 'Ambientador', 'Para perfumar y refrescar el ambiente.');



INSERT INTO `usuarios` (`idusuario`, `usuario`, `passuser`,`type`, `nombre_empleado`) VALUES
(1, 'admin', 'admin', 1, 'admin'),
(2, 'pol', '1234', 2, 'Pol Lozano'),
(3, 'manel', '12345', 2, 'Manel Agudo'),
(4, 'manuel', '123456', 2, 'Manuel Pretel'),
(5, 'repartidor', '123', 2, 'repartidor'),
(6, 'limpiador', '123', 3, 'limpiador');


INSERT INTO `tareas` (`idtarea`, `direccion`, `idusuario`) VALUES
(1, 'Carrer del Rosselló, 123', 5),
(2, 'Avinguda Diagonal, 678', 2),
(3, 'Carrer de la Marina, 456', 3),
(4, 'Carrer de Balmes, 789', 5),
(5, 'Passeig de Gràcia, 1011', 2),
(6, 'Carrer de la Rambla, 1213', 3),
(7, 'Carrer de Muntaner, 1415', 5),
(8, 'Avinguda Meridiana, 1617', 2),
(9, 'Carrer de Sants, 1819', 3),
(10, 'Carrer de Gracia, 2021', 4),
(11, 'Avinguda del Paral·lel, 2223', 4),
(12, 'Carrer de Mallorca, 2425', 4),
(13, 'Carrer de Pau Claris, 2627', 2),
(14, 'Avinguda del Tibidabo, 2829', 2),
(15, 'Carrer de Diputació, 3031', 3),
(16, 'Carrer de Balmes, 3233', 4),
(17, "Avinguda del Portal de l'Angel, 3435", 2),
(18, 'Carrer de Tarragona, 3637', 3),
(19, 'Carrer del Consell de Cent, 3839', 4),
(20, 'Avinguda de la Merce, 4041', 2),
(21, 'Carrer de Valencia, 4243', 2),
(22, 'Carrer de la Diputació, 4445', 5),
(23, 'Avinguda de la Diagonal, 4647', 2),
(24, 'Carrer de la Gran Via, 4849', 3),
(25, 'Carrer de Balmes, 5051', 5),
(26, 'Passeig de Sant Joan, 5253', 2),
(27, 'Carrer del Pintor Fortuny, 5455', 3),
(28, "Carrer de l'Hospital, 5657", 5),
(29, 'Carrer de Roger de Flor, 5859', 2),
(30, 'Carrer de la Marina, 6061', 3);



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