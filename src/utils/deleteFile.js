const cloudinary = require("cloudinary").v2;

const deleteFile = (url) => {
  const imgSplited = url.split("/");
  const folderName = imagSplited.at(-2); //seleccionar los elementos al revés desde el final con el .at
  const fileName = imagSplited.at(-1).split(".")[0];//seleccionar los elementos al revés desde el final con el .at y separar la extensión del nombre de archivo

  cloudinary.uploader.destroy(`${folderName}/${fileName}`, () => {
    console.log("Imagen eliminada");
  });
};

module.exprots = { deleteFile };
