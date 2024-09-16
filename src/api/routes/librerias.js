const libreriaRouter = require("express").Router();
const {
  getLibrerias,
  postLibrerias,
  updateLibrerias,
  deleteLibrerias,
  getLibreriaById,
} = require("../controllers/librerias");
const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");

libreriaRouter.get("/", getLibrerias);
libreriaRouter.get("/:id", getLibreriaById);
libreriaRouter.post("/", [isAdmin], upload.single("imagen"), postLibrerias);
libreriaRouter.put("/:id", [isAdmin], upload.single("imagen"), updateLibrerias);
libreriaRouter.delete("/:id", [isAdmin], deleteLibrerias);

module.exports = libreriaRouter;
