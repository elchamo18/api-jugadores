import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/jugadores", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM jugadores");
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
});

//Obtener una tarea por su id
app.get("/jugadores/:id", async (req, res) => {
  // Recuperar el id de la tarea por params
  const id = req.params.id;
  // Hacer un try catch para manejar los errores
  try {
    // Hacer la consulta a la base de datos
    const result = await pool.query(
      "SELECT * FROM jugadores WHERE id_jugador = $1",
      [id]
    );
    // Verificar si la consulta no devolvio ningun resultado
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No se encontro el recurso",
      });
    }
    // Si la consulta devolvio un resultado, devolverlo
    res.json(result.rows[0]);
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
});

// Crear una nueva tarea
app.post("/jugadores", async (req, res) => {
  // Extraer el titulo del body de la peticion
  const { nombre, edad, salario } = req.body;
  // Validar que el title sea un string
  if (!nombre || !edad || !salario) {
    return res.status(400).json({
      message: "Peticion invalida",
    });
  }
  // Manejar el error con un try catch
  try {
    const result = await pool.query(
      "INSERT INTO jugadores(nombre, edad, salario) VALUES($1, $2, $3) RETURNING *",
      [nombre, edad, salario]
    );
    // Devolver una respuesta exitosa
    res.status(201).json({
      message: "jugador creado exitosamente",
      body: result.rows[0],
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
});

// Actualizar una tarea
app.put("/jugadores/:id", async (req, res) => {
  // Recuperar el id de la tarea por params
  const id = req.params.id;
  // Recuperar el estado de la tarea por body
  const { nombre, edad, salario } = req.body;
  // Validar que el title sea un string
  if (!nombre || !edad || !salario) {
    return res.status(400).json({
      message: "Peticion invalida",
    });
  }
  // Manejar errores con un try catch
  try {
    const result = await pool.query(
      "UPDATE jugadores SET nombre = $1, edad= $2, salario=$3 WHERE id_jugador=$4 RETURNING *",
      [nombre, edad, salario, id]
    );
    res.json({
      message: "jugador actualizado exitosamente",
      body: result.rows[0],
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
});

// Eliminar una tarea
app.delete("/jugadores/:id", async (req, res) => {
  // Recuperar el id de la tarea por params
  const id = req.params.id;
  // Manejar errores con un try catch
  try {
    const result = await pool.query("DELETE FROM jugadores WHERE id_jugador = $1", [
      id,
    ]);
    // Verificar si la consulta no devolvio ningun resultado
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "No se encontro el recurso",
      });
    }
    res.sendStatus(204);
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    message: "Recurso no encontrado",
  });
});

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
