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
    return "[ " + this.Id + ", " + this.Titulo + ", " + this.Autor + ", " + this.Ubicacion + this.Disponible + " ]"; 
  }
}

class User {
  constructor(Id, NomApe, Direccion, Contacto) {
    this.Id        = Id;       
    this.NomApe    = NomApe;   
    this.Direccion = Direccion;
    this.Contacto  = Contacto; 
  }
  toString() {
    return "[ " + this.Id + ", " + this.NomApe + ", " + this.Direccion + ", " + this.Contacto + " ]"; 
  }
}

// estas son las funciones del (Baja), upd (modificacion), add (Alta)
// sirven para cualquier coleccion de datos, 
// para que funcione la clave de todas las clases debe ser .Id

function del(tabObj, tipoObj, clave) {
  var respuesta = {"msg": "", "sts": 0};
  var idx = tabObj.findIndex(e => e.Id == clave);
  var unObj;
  if (idx > -1) {
    unObj = tabObj[idx];
    tabObj.splice(idx, 1);
    respuesta.msg = "Baja exitosa de " + tipoObj + ": " + unObj.toString();
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
    respuesta.msg = "Modificación exitosa de " + tipoObj + ": " + clase.toString();
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
  var unObj;
  if (idx < 0) {
    tabObj.splice(tabObj.length, 0, clase);
    respuesta.msg = "Alta exitosa de " + tipoObj + ": " + clase.toString();
    respuesta.sts = 0;
  } else {
    unObj = tabObj[idx];
    respuesta.msg = "Ya existe " + tipoObj + ": " + unObj.toString();
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
    } else {
      Users = data;
    }
  }
  )
  .catch(error => console.log("Ocurrió un error! " + destino + " " + error));
}
