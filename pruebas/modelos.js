// estas clases para libros y usuarios 

class Book {
  constructor(Id, Titulo, Autor, Ubicacion) {
    this.Id = Id;
    this.Titulo = Titulo;
    this.Autor = Autor;
    this.Ubicacion = Ubicacion;
  }
  toString() {
    return "[ " + this.Id + ", " + this.Titulo + ", " + this.Autor + ", " + this.Ubicacion + " ]"; 
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

// definimos las colecciones como Arrays y la variable que va a contener una clase

var Books = [], unBook, Users = [], unUser;

// así creamos objetos y agregamos el objeto a la coleccion

unBook = new Book(1, "Papillon", "Hery Carriere", "Ubicacion 1");
Books.push(unBook);

unUser = new User(2, "Juan Perez", "Direccion 28", "Contacto 28");
Users.push(unUser);

// así usamos las funciones add, upd, del
// el primer argumento es la coleccion el último es el objeto a agregar o modificar, 
// en la baja solamente va la clave que se quiere borrar 

add(Books, "Book", unBook);
upd(Books, "Book", unBook);
del(Books, "Book", 1);

add(Users, "User", unUser);
upd(Users, "User", unUser);
del(Users, "User", 2);
