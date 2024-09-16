const mongoose = require("mongoose");
const Comic = require("../models/comics");
require("dotenv").config();
const { connectDB } = require("../config/db");

connectDB();


const seedComics = async () => {
  try {
    await Comic.deleteMany(); // Limpiar la colección primero
    await Comic.insertMany(comics);
    console.log("Seed completado");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

seedComics();
