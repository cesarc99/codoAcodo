// definimos las coleccion como Array y la variable que va a contener una clase

var Books = [], unBook;

function listSection(Section) {
  const nodoSection = document.getElementById(Section);
  const nodoArticle = nodoSection.children[1];
  var nodoBook;
  for (let i = 0; i < Books.length; i++){
    unBook = Books[i];
	if (unBook["Disponible"]){
      if (Section == "Libros_Prestamo") {
        nodoBook = nodoArticle.children[0].cloneNode(true);
        nodoBook.children[0].innerText = unBook["Id"];
        nodoBook.children[1].innerText = unBook["Titulo"];
        nodoBook.children[2].innerText = unBook["Ubicacion"];
		nodoBook.children[3].innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket" onclick="DevolucionPrestamo(this.parentElement.parentElement)"></i>'
        nodoArticle.appendChild(nodoBook);
	  }
	} else {
      if (Section == "Libros_Devolucion") {
        nodoBook = nodoArticle.children[0].cloneNode(true);
        nodoBook.children[0].innerText = unBook["Id"];
        nodoBook.children[1].innerText = unBook["Titulo"];
        nodoBook.children[2].innerText = unBook["Ubicacion"];
		nodoBook.children[3].innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket" onclick="DevolucionPrestamo(this.parentElement.parentElement)"></i>'
        nodoArticle.appendChild(nodoBook);
	  }		
	}	
  }
}

function delSection(Section) {
  const nodoSection = document.getElementById(Section);
  const nodoArticle = nodoSection.children[1];
  while (nodoArticle.children.length > 1) {
    nodoArticle.removeChild(nodoArticle.lastChild);
  }
}

function carga(){
	getDatos("books.db", "libros");
	listSection("Libros_Prestamo");
    listSection("Libros_Devolucion");
}

function DevolucionPrestamo(elem){
	var respuesta = {"msg": "", "sts": 0, "devolucion": false};
	respuesta = stsDevPres(Books, "Book", elem.children[0].innerText);
	if (respuesta.devolucion) {
      document.getElementById('mensajeErrorPrestamo').innerText = respuesta.msg;
      document.getElementById('mensajeErrorDevolucion').innerText = "";
	} else {
      document.getElementById('mensajeErrorPrestamo').innerText = "";
      document.getElementById('mensajeErrorDevolucion').innerText = respuesta.msg;
	}
	if (respuesta.sts == 0) {
      delSection("Libros_Prestamo");
      delSection("Libros_Devolucion");
	  listSection("Libros_Prestamo");
      listSection("Libros_Devolucion");
  }

}

setTimeout(carga, 500);
