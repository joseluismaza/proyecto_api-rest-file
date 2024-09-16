const Comic = require("../models/comics");
const deleteFile = require("../../utils/deleteFile");

const getComics = async (req, res, next) => {
  try {
    const comics = await Comic.find({ verified: true }); //permitimos que solo los usuarios administradores
    return res.status(200).json(comics);
  } catch (error) {
    return res
      .status(400)
      .json("No se han podido obtener los datos de los comics");
  }
};

const getComicsAdmin = async (req, res, next) => {
  try {
    const comics = await Comic.find({ verified: false });
    return res.status(200).json(comics);
  } catch (error) {
    return res
      .status(400)
      .json("No se han podido obtener los datos de los comics");
  }
};

const getComicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comics = await Comic.findById(id);
    return res.status(200).json(comics);
  } catch (error) {
    return res.status(400).json("No se encuentra ningún cómic con ese nombre");
  }
};

const getComicByCategory = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const comics = await Comic.find({ categoria });
    return res.status(200).json(comics);
  } catch (error) {
    return res.status(400).json("No hay ningún cómic en esa categoria");
  }
};

const getComicsByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params;
    const comics = await Comic.find({ precio: { $lte: precio } });
    return res.status(200).json(comics);
  } catch (error) {
    return res.status(400).json("No hay ningún cómic con ese precio");
  }
};

const postComics = async (req, res, next) => {
  try {
    const newComic = new Comic(req.body);
    if (req.file) {
      newComic.imagen = req.file.path;
    }
    //cuando un usuario crea un comic el campo verified será false.
    //cuando un usuario administrador crea un comic el campo estara en true.
    if (req.user.rol === "admin") {
      newComic.verified = true;
    } else {
      newComic.verified = false;
    }
    const comicSaved = await newComic.save();
    return res.status(201).json(comicSaved);
  } catch (error) {
    return res.status(400).json("No se ha publicado ningún cómic");
  }
};

const updateComics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newComic = new Comic(req.body);
    newComic._id = id; // el ID nuevo sea igual al viejo

    if (req.file) {
      newComic.imagen = req.file.path;
      const oldComic = await Comic.findById(id);
      deleteFile(oldComic.imagen);
    }

    const comicUpdated = await Comic.findByIdAndUpdate(id, newComic, {
      new: true,
    });
    return res.status(200).json(comicUpdated);
  } catch (error) {
    return res.status(400).json("No se ha actualizado ningún cómic");
  }
};

const deleteComics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comicDeleted = await Comic.findByIdAndDelete(id);
    deleteFile(deleteComics.imagen);
    return res.status(200).json(comicDeleted);
  } catch (error) {
    return res.status(400).json("El borrado no ha sido satisfactorio");
  }
};

module.exports = {
  getComics,
  getComicsAdmin,
  getComicByCategory,
  getComicById,
  getComicsByPrice,
  postComics,
  updateComics,
  deleteComics,
};
