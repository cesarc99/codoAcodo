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


function delSection(Section) {
  const nodoSection = document.getElementById(Section);
  const nodoArticle = nodoSection.children[1];
  while (nodoArticle.children.length > 1) {
    nodoArticle.removeChild(nodoArticle.lastChild);
  }
}


function carga(){
	getDatos("books.db", "libros");
	getDatos("users.db", "usuarios");
	listSection("Usuarios");
    listSection("Libros");
}

document.getElementById("btnConfirmaUser").addEventListener("click", procUser);

document.getElementById("btnConfirmaBook").addEventListener("click", procBook);

function procUser() {
  var respuesta = {"msg": "", "sts": 0};
  var unUser = new User(0, "", "", "");
  var objBtn;
  unUser["Id"]         = document.getElementById("Usuario_Id").value;      
  unUser["NomApe"]     = document.getElementById("Usuario_NomApe").value;
  unUser["Direccion"]  = document.getElementById("Usuario_Direccion").value;
  unUser["Contacto"]   = document.getElementById("Usuario_Contacto").value;
    
  if (document.getElementById('add_U').checked) {
	  objBtn = document.getElementById('add_U');
	  respuesta = add(Users, "User", unUser);
  } else if (document.getElementById('del_U').checked) {
	  objBtn = document.getElementById('del_U');
	  respuesta = del(Users, "User", unUser["Id"]);
  } else if (document.getElementById('upd_U').checked) {
	  objBtn = document.getElementById('upd_U');
	  respuesta = upd(Users, "User", unUser);
  } else {
	  respuesta.msg = "Debe seleccionar una operación (A, B o M)";
	  respuesta.sts = 1;
  }
  
  document.getElementById('mensajeErrorUsuario').innerText = respuesta.msg;
  if (respuesta.sts == 0) {
	objBtn.checked = false;
	document.getElementById("FormUsuarios").reset();
    delSection("Usuarios");
    listSection("Usuarios");
  }
  
}

function procBook() {
  var respuesta = {"msg": "", "sts": 0};
  var unBook = new Book(0, "", "", "", false);
  var objBtn;
  unBook["Id"]         = document.getElementById("Libro_Id").value;
  unBook["Titulo"]     = document.getElementById("Libro_Titulo").value;
  unBook["Autor"]      = document.getElementById("Libro_Autor").value;
  unBook["Ubicacion"]  = document.getElementById("Libro_Ubicacion").value;
  unBook["Disponible"] = true;
    
  if (document.getElementById('add_B').checked) {
	  objBtn = document.getElementById('add_B');
	  respuesta = add(Books, "Book", unBook);
  } else if (document.getElementById('del_B').checked) {
	  objBtn = document.getElementById('del_B');
	  respuesta = del(Books, "Book", unBook["Id"]);
  } else if (document.getElementById('upd_B').checked) {
	  objBtn = document.getElementById('upd_B');
	  respuesta = upd(Books, "Book", unBook);
  } else {
	  respuesta.msg = "Debe seleccionar una operación (A, B o M)";
	  respuesta.sts = 1;
  }
  
  document.getElementById('mensajeErrorLibro').innerText = respuesta.msg;
  if (respuesta.sts == 0) {
	objBtn.checked = false;
	document.getElementById("FormLibros").reset();
    delSection("Libros");
    listSection("Libros");
  }
  
}



setTimeout(carga, 500);
