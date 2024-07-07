// definimos las coleccion como Array y la variable que va a contener una clase

var Books = [], unBook, Users = [], unUser;

// document.getElementById("btnConfirmaUser").addEventListener("click", procUser);
document.getElementById("btnConfirmaUser").addEventListener("click", procUserApi);
document.getElementById("btnConfirmaBook").addEventListener("click", procBook);

document.getElementById("btnBorraUser").addEventListener("click", aliasResetUsuarios);
document.getElementById("btnBorraBook").addEventListener("click", aliasResetLibros);

document.getElementById("Usuario_Id").onchange = function() {dataById(event)};
document.getElementById("Libro_Id").onchange = function() {dataById(event)};

function aliasResetLibros() {
	resetFormEvent("book_action", "FormLibros", "mensajeErrorLibro", false);
}

function aliasResetUsuarios() {
	resetFormEvent("user_action", "FormUsuarios", "mensajeErrorUsuario", false);
}
	  
function resetFormEvent(action, formId, msgId, evt) {
  document.getElementById(formId).reset();
  document.getElementById(formId).style.opacity="0.3";
  disableEnableElements(elemForm(formId), true, false);
  if (document.querySelector('input[name=' + action + ']')) {
    document.querySelectorAll('input[name=' + action + ']').forEach((elem) => {
  	  elem.checked = false;
	  if (evt) {
	    elem.addEventListener("change", function(event) {
		                                    var item = event.target.value;
											disableEnableElements(elemForm(formId), true, false);
		                                    disableEnableElements(elemForm(formId), false, ((item == "del_U" || item == "del_B" ||
											                                                 item == "upd_U" || item == "upd_B") ? true : false));	
		                                    document.getElementById(formId).style.opacity="1";
		                                    document.getElementById(msgId).innerHTML = "";
		                                });
	  }
    });
  }
}

resetFormEvent("user_action", "FormUsuarios", "mensajeErrorUsuario", true);
resetFormEvent("book_action", "FormLibros", "mensajeErrorLibro", true);

function listSection(Section) {
  const nodoSection = document.getElementById(Section);
  const nodoArticle = nodoSection.children[1];
  var nodoBook, nodoUser, tableBooks, tableUsers;
  if (Section == "Libros"){
	tableBooks = "<table><tr><th>Código</th><th>Título</th><th>Ubicación</th></tr>";
    for (let i = 0; i < Books.length; i++){
      unBook = Books[i];
	  tableBooks += "<tr><td>" + unBook["Id"] + "</td><td>" + unBook["Titulo"] + "</td><td>" +  unBook["Ubicacion"] + "</td></tr>";
/*
      nodoBook = nodoArticle.children[0].cloneNode(true);
      nodoBook.children[0].innerText = unBook["Id"];
      nodoBook.children[1].innerText = unBook["Titulo"];
      nodoBook.children[2].innerText = unBook["Ubicacion"];
      nodoArticle.appendChild(nodoBook);
*/
	}
	tableBooks += "</table>";
	nodoArticle.innerHTML = tableBooks;
  } else {
	tableUsers = "<table><tr><th>Código</th><th>Nombre y Apellido</th><th>Contacto</th></tr>";
    for (let i = 0; i < Users.length; i++){
      unUser = Users[i];
	  tableUsers += "<tr><td>" + unUser["Id"] + "</td><td>" + unUser["NomApe"] + "</td><td>" +  unUser["Contacto"] + "</td></tr>";
/*
      nodoUser = nodoArticle.children[0].cloneNode(true);
      nodoUser.children[0].innerText = unUser["Id"];
      nodoUser.children[1].innerText = unUser["NomApe"];
      nodoUser.children[2].innerText = unUser["Contacto"];
      nodoArticle.appendChild(nodoUser);
*/
	}
	tableUsers += "</table>";
	nodoArticle.innerHTML = tableUsers;
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

function procUser() {
  var respuesta = {"msg": "", "sts": 0};
  var unUser = new User(0, "", "", "");
  var objBtn, msg;
  msg = document.getElementById('mensajeErrorUsuario');
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
  
  msg.innerText = respuesta.msg;
  if (respuesta.sts == 0) {
	msg.style.color = "white";
	objBtn.checked = false;
	aliasResetUsuarios();
//    delSection("Usuarios");
    listSection("Usuarios");
  } else {
	msg.style.color = "rgba(240, 7, 7, 0.74)";
  }
}

function procUserApi() {
  var respuesta = {"msg": "", "sts": 0};
  var unUser = new User(0, "", "", "");
  var objBtn, msg;
  msg = document.getElementById('mensajeErrorUsuario');
  unUser["Id"]         = document.getElementById("Usuario_Id").value;
  if (document.getElementById('del_U').checked || document.getElementById('upd_U').checked) {
	alert(unUser["Id"]);
  }	
/*
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
  
  msg.innerText = respuesta.msg;
  if (respuesta.sts == 0) {
	msg.style.color = "white";
	objBtn.checked = false;
	aliasResetUsuarios();
//    delSection("Usuarios");
    listSection("Usuarios");
  } else {
	msg.style.color = "rgba(240, 7, 7, 0.74)";
  }
*/
}


function procBook() {
  var respuesta = {"msg": "", "sts": 0};
  var unBook = new Book(0, "", "", "", false);
  var objBtn, msg;
  msg = document.getElementById('mensajeErrorLibro');
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
  
  msg.innerText = respuesta.msg;
  if (respuesta.sts == 0) {
	msg.style.color = "white";
	objBtn.checked = false;
	aliasResetLibros();
//    delSection("Libros");
    listSection("Libros");
  } else {
	msg.style.color = "rgba(240, 7, 7, 0.74)";
  }
}

setTimeout(carga, 500);
