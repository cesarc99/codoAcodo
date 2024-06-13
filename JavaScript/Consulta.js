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
      if (Section == "Disponibles") {
	    tableBooks += "<tr><td>" + unBook["Id"] + "</td><td>" + unBook["Titulo"] + "</td><td>" +  unBook["Ubicacion"] + "</td></tr>";
	  }
	} else {
      if (Section == "Prestados") {
	    tableBooks += "<tr><td>" + unBook["Id"] + "</td><td>" + unBook["Titulo"] + "</td><td>" +  unBook["Ubicacion"] + "</td></tr>";
	  }		
	}	
  }
  tableBooks += "</table>";
  nodoArticle.innerHTML = tableBooks;  
}

function carga(){
	getDatos("books.db", "libros");
	listSection("Disponibles");
    listSection("Prestados");
}

setTimeout(carga, 500);

