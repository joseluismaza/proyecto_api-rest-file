const comicsRouter = require("express").Router();
const {
  getComicById,
  getComicByCategory,
  getComics,
  updateComics,
  deleteComics,
  postComics,
  getComicsByPrice,
  getComicsAdmin,
} = require("../controllers/comics");
const { isAdmin, isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");

comicsRouter.get("/not-verified", [isAdmin], getComicsAdmin);
comicsRouter.get("/precio/:precio", getComicsByPrice);
comicsRouter.get("/categoria/:categoria", getComicByCategory);
comicsRouter.get("/:id", getComicById);
comicsRouter.get("/", getComics);
comicsRouter.post("/", [isAuth], upload.single("imagen"), postComics);
comicsRouter.put("/:id", [isAdmin], upload.single("imagen"), updateComics);
comicsRouter.delete("/:id", [isAdmin], deleteComics);

module.exports = comicsRouter;
