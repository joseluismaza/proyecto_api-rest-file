const mainRouter = require("express").Router();
const comicsRouter = require("./comics");
const libreriasRouter = require("./librerias");
const usersRouter = require("./users");

mainRouter.use("/comics", comicsRouter);
mainRouter.use("/librerias", libreriasRouter);
mainRouter.use("/users", usersRouter);

module.exports = mainRouter;
