CREATE TABLE jugadores(
	id_jugador SERIAL PRIMARY KEY,
	nombre VARCHAR(40) NOT NULL,
	edad INT NOT NULL,
	salario INT NOT NULL
);

INSERT INTO jugadores(nombre, edad, salario)
VALUES ('Carlos Darwin Quintero', 35, 300000);

INSERT INTO jugadores(nombre, edad, salario)
VALUES ('Facundo SUAREZ', 28, 100000000);

INSERT INTO jugadores(nombre, edad, salario)
VALUES ('Cristian Barrios', 25, 350000);

INSERT INTO jugadores(nombre, edad, salario)
VALUES ('Adrian Ramos', 37, 380000);

DELETE FROM jugadores
WHERE id_jugador = 4;

SELECT * FROM jugadores;