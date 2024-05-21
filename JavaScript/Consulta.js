// definimos las coleccion como Array y la variable que va a contener una clase

var Books = [], unBook;

function listSection(Section) {
  const nodoSection = document.getElementById(Section);
  const nodoArticle = nodoSection.children[1];
  var nodoBook;
  for (let i = 0; i < Books.length; i++){
    unBook = Books[i];
	if (unBook["Disponible"]){
      if (Section == "Disponibles") {
        nodoBook = nodoArticle.children[0].cloneNode(true);
        nodoBook.children[0].innerText = unBook["Id"];
        nodoBook.children[1].innerText = unBook["Titulo"];
        nodoBook.children[2].innerText = unBook["Ubicacion"];
        nodoArticle.appendChild(nodoBook);
	  }
	} else {
      if (Section == "Prestados") {
        nodoBook = nodoArticle.children[0].cloneNode(true);
        nodoBook.children[0].innerText = unBook["Id"];
        nodoBook.children[1].innerText = unBook["Titulo"];
        nodoBook.children[2].innerText = unBook["Ubicacion"];
        nodoArticle.appendChild(nodoBook);
	  }		
	}	
  }
}

function carga(){
	getDatos("books.db", "libros");
	listSection("Disponibles");
    listSection("Prestados");
}

setTimeout(carga, 500);


