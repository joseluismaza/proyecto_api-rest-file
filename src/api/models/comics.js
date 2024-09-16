const mongoose = require("mongoose");

const comicsSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  precio: { type: Number, required: true },
  paginas: { type: Number, required: true },
  categoria: { type: String, required: true, enum: ["superheroes", "misterio", "medieval", "fantasia"], },
  verified: { type: Boolean, required: true, default: false },
}, {
  timestamps: true,
  collection: "comics",
});

const Comic = mongoose.model("comics", comicsSchema, "comics");
module.exports = Comic;