import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/jugadores", (req, res) => {
  res.send("holaaaaa");
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
