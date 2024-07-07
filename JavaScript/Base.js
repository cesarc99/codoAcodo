// clases para libros y usuarios 

class Book {
  constructor(Id, Titulo, Autor, Ubicacion, Disponible) {
    this.Id = Id;
    this.Titulo = Titulo;
    this.Autor = Autor;
    this.Ubicacion = Ubicacion;
    this.Disponible = Disponible;
  }
  toStringArray() {
    return "[ " + this.Id + ", " + this.Titulo + ", " + this.Autor + ", " + this.Ubicacion + ", " + this.Disponible + " ]"; 
  }
}

class User {
  constructor(Id, NomApe, Direccion, Contacto) {
    this.Id        = Id;       
    this.NomApe    = NomApe;   
    this.Direccion = Direccion;
    this.Contacto  = Contacto; 
  }
  toStringArray() {
    return "[ " + this.Id + ", " + this.NomApe + ", " + this.Direccion + ", " + this.Contacto + " ]"; 
  }
}

class UserAccess {
  constructor(Id, Password) {
    this.Id        = Id;       
    this.Password  = Password;   
  }
  toStringArray(masterPassword) {
	if (masterPassword == "MonsterInc") {
		return "[ " + this.Id + ", " + this.Password + " ]";
	} else {
		return "[ " + this.Id + ", " + "No autorizado" + " ]";
	}
  }
  accessControl(Pass) {
    return (Pass == this.Password); 
  }
}

// estas son las funciones del (Baja), upd (modificacion), add (Alta)
// sirven para cualquier coleccion de datos, 
// para que funcione la clave de todas las clases debe ser .Id

function del(tabObj, tipoObj, clave) {
  var respuesta = {"msg": "", "sts": 0};
  var idx = tabObj.findIndex(e => e.Id == clave);
  var unObj, txt, wClase;
  if (idx > -1) {
    unObj = tabObj[idx];
    txt = Object.values(unObj).toString();
	txt = txt.split(",");
	if (tipoObj == "User") {
		wClase = new User(txt[0], txt[1], txt[2], txt[3]);
	} else {
		wClase = new Book(txt[0], txt[1], txt[2], txt[3], txt[4]);
	}
    tabObj.splice(idx, 1);
    respuesta.msg = "Baja exitosa de " + tipoObj + ": " + wClase.toStringArray();
    respuesta.sts = 0;
  } else {
    respuesta.msg = "No existe " + tipoObj + " con clave: " + clave;
    respuesta.sts = 1;
  }
  return respuesta;
}

function upd(tabObj, tipoObj, clase) {
  var respuesta = {"msg": "", "sts": 0};
  var idx = tabObj.findIndex(e => e.Id == clase.Id);
  if (idx > -1) {
    tabObj[idx] = clase;
    respuesta.msg = "Modificación exitosa de " + tipoObj + ": " + clase.toStringArray();
    respuesta.sts = 0;
  } else {
    respuesta.msg = "No existe " + tipoObj + " con clave: " + clase.Id;
    respuesta.sts = 1;
  }
  return respuesta;
}


function add(tabObj, tipoObj, clase) {
  var respuesta = {"msg": "", "sts": 0};
  var idx = tabObj.findIndex(e => e.Id == clase.Id);
  var unObj, txt, wClase;
  if (idx < 0) {
    tabObj.splice(tabObj.length, 0, clase);
    respuesta.msg = "Alta exitosa de " + tipoObj + ": " + clase.toStringArray();
    respuesta.sts = 0;
  } else {
    unObj = tabObj[idx];
    txt = Object.values(unObj).toString();
	txt = txt.split(",");
	if (tipoObj == "User") {
		wClase = new User(txt[0], txt[1], txt[2], txt[3]);
	} else {
		wClase = new Book(txt[0], txt[1], txt[2], txt[3], txt[4]);
	}
    respuesta.msg = "Ya existe " + tipoObj + ": " + wClase.toStringArray();
    respuesta.sts = 1;
  }
  return respuesta;
}

function stsDevPres(tabObj, tipoObj, clave) {
  var respuesta = {"msg": "", "sts": 0, "devolucion": false};
  var idx = tabObj.findIndex(e => e.Id == clave);
  var unObj, txt, wClase;
  if (idx > -1) {
    unObj = tabObj[idx];	
	sts = unObj["Disponible"] ? "Préstamo exitoso de " : "Devolución exitosa de ";
	respuesta.devolucion = unObj["Disponible"] ? true : false;
	unObj["Disponible"] = !unObj["Disponible"];
	tabObj[idx] = unObj;
    txt = Object.values(unObj).toString();
	txt = txt.split(",");
	wClase = new Book(txt[0], txt[1], txt[2], txt[3], txt[4]);
    respuesta.msg = sts + tipoObj + ": " + wClase.toStringArray();
    respuesta.sts = 0;
  } else {
    respuesta.msg = "No existe " + tipoObj + " con clave: " + clave;
    respuesta.sts = 1;
  }
  return respuesta;
}

// funcion para obtener los datos 

async function getDatos(file, destino) {
  var txt;
  fetch("https://simuladordatos.netlify.app/db/" + file)
  .then(response => response.json())
  .then(data => {
    if (destino == "libros") {
      Books = data;
    } else if (destino == "usuarios") {
      Users = data;
    } else {
	  Accesses = data;
	}
  }
  )
  .catch(error => console.log("Ocurrió un error! " + destino + " " + error));
}

function disableEnableElements(elems, boolValue, del){
	if (del) {
		document.getElementById(elems[0]).disabled = boolValue;
		document.getElementById(elems[4]).disabled = boolValue;
		document.getElementById(elems[5]).disabled = boolValue;
	} else {
      for (elem of elems){
    	  document.getElementById(elem).disabled = boolValue;
      } 	
	}
}

function elemForm(formId) {
  var obj, arr, arrId = []; 
  obj = document.getElementById(formId);
  arr = Array.from(obj.elements);
  for (tag of arr){
  	if (tag.id){
	  arrId.push(tag.id);
	}
  }
  return arrId;
}

function  fetchData(url, method, callback, data_request = null) {
  const options = {
    method: method,
    headers: {
        'Content-Type': 'application/json',
    },
    body: data_request ? JSON.stringify(data_request) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };

  fetch(url, options)
  .then(response => response.json())
  .then(data_response => {
    callback(data_response);
  })
  .catch(error => console.log("Ocurrió un error! " + error));
}


