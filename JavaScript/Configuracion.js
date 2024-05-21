// definimos las coleccion como Array y la variable que va a contener una clase

var Books = [], unBook, Users = [], unUser;

function listSection(Section) {
  const nodoSection = document.getElementById(Section);
  const nodoArticle = nodoSection.children[1];
  var nodoBook, nodoUser;
  if (Section == "Libros"){
    for (let i = 0; i < Books.length; i++){
      unBook = Books[i];
      nodoBook = nodoArticle.children[0].cloneNode(true);
      nodoBook.children[0].innerText = unBook["Id"];
      nodoBook.children[1].innerText = unBook["Titulo"];
      nodoBook.children[2].innerText = unBook["Ubicacion"];
      nodoArticle.appendChild(nodoBook);
	}
  } else {
    for (let i = 0; i < Users.length; i++){
      unUser = Users[i];
      nodoUser = nodoArticle.children[0].cloneNode(true);
      nodoUser.children[0].innerText = unUser["Id"];
      nodoUser.children[1].innerText = unUser["NomApe"];
      nodoUser.children[2].innerText = unUser["Contacto"];
      nodoArticle.appendChild(nodoUser);
	}
  }
}

function carga(){
	getDatos("books.db", "libros");
	getDatos("users.db", "usuarios");
	listSection("Usuarios");
    listSection("Libros");
}

setTimeout(carga, 500);


