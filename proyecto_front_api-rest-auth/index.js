const printComics = (comics) => {
  for (const comic of comics) {
    document.body.innerHTML += `
    <div class="comic">
      <h3>${comic.nombre}</h3>
      <div>
        <img src="${comic.imagen}">
      </div>
      <p>${comic.precio} €</p>
    </div>
    `
  }

}

fetch("http://localhost:3000/api/v1/comics/")
  .then((res) => res.json())
  .then((comics) => {
    printComics(comics);
  });