const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./src/config/db");
const mainRouter = require("./src/api/routes/main");
const cloundinary = require("cloudinary").v2;

const app = express();

cloundinary.config({
  cloud_name: procees.env.CLOUD_NAME,
  api_key: procees.env.API_KEY,
  api_secret: procees.env.API_SECRET,
});

connectDB();

app.use(cors());
app.use(express.json());

//rutas de acceso
app.user("/api/v1", mainRouter);

app.use("*", (req, res, next) => {
  return res.status(404).json("Ruta no encontrada");
});

// levantar servidor
app.listen(3000, () => {
  console.log("Servidor levantado: http://localhost:3000");
});
