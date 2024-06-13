// definimos las coleccion como Array y la variable que va a contener una clase

var Books = [], unBook;

function listSection(Section) {
  const nodoSection = document.getElementById(Section);
  const nodoArticle = nodoSection.children[1];
  var nodoBook, tableBooks;
  tableBooks = "<table><tr><th>Código</th><th>Título</th><th>Ubicación</th></tr>";
  for (let i = 0; i < Books.length; i++){
    unBook = Books[i];
	if (unBook["Disponible"]){
      if (Section == "Libros_Prestamo") {
	    tableBooks += "<tr><td>" + unBook["Id"] + "</td><td>" + unBook["Titulo"] + "</td><td>" +  unBook["Ubicacion"] + "</td><td>";
	    tableBooks += '<i class="fa-solid fa-arrow-right-from-bracket" onclick="DevolucionPrestamo(this.parentElement.parentElement)"></i>';
	    tableBooks += "</td></tr>";
	  }
	} else {
      if (Section == "Libros_Devolucion") {
	    tableBooks += "<tr><td>" + unBook["Id"] + "</td><td>" + unBook["Titulo"] + "</td><td>" +  unBook["Ubicacion"] + "</td><td>";
	    tableBooks += '<i class="fa-solid fa-arrow-right-from-bracket" onclick="DevolucionPrestamo(this.parentElement.parentElement)"></i>';
	    tableBooks += "</td></tr>";
	  }		
	}	
  }
  tableBooks += "</table>";
  nodoArticle.innerHTML = tableBooks;  
}

function carga(){
	getDatos("books.db", "libros");
	listSection("Libros_Prestamo");
    listSection("Libros_Devolucion");
}

function DevolucionPrestamo(elem){
	var respuesta = {"msg": "", "sts": 0, "devolucion": false};
	var msgPrestamo = document.getElementById('mensajeErrorPrestamo');
	var msgDevolucion = document.getElementById('mensajeErrorDevolucion');
	respuesta = stsDevPres(Books, "Book", elem.cells[0].textContent);
	if (respuesta.devolucion) {
      msgPrestamo.innerText = respuesta.msg;
      msgDevolucion.innerText = "";
	} else {
      msgPrestamo.innerText = "";
      msgDevolucion.innerText = respuesta.msg;
	}
	if (respuesta.sts == 0) {
	  msgPrestamo.style.color = "white";
	  msgDevolucion.style.color = "white";
	  listSection("Libros_Prestamo");
      listSection("Libros_Devolucion");
	} else {
	  msgPrestamo.style.color = "rgba(240, 7, 7, 0.74)";
	  msgDevolucion.style.color = "rgba(240, 7, 7, 0.74)";
	}
 }


setTimeout(carga, 500);
