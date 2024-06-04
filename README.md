# codoAcodo
Phyton full stack

-- 2024-06-04

Definiciones para el backend

A continuación están son las clases definidas para libros y usuarios

Hay que hacer el script correspondiente para la creación de las tablas Books y Users en PostgreSQL con los campos definidos en las clases

Esto lo ponemos en la carpeta pruebas, le ponemos script_DB_Cesar.txt o script_DB_Maria.txt o script_DB_Juan.txt

Luego nos quedamos con uno.


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




-- anterior

Información del curso

Meet: https://meet.google.com/evn-reno-qxh
Drive: https://drive.google.com/drive/folders/1vi56a_BSuB4NYQGTRIBqad1QRA-Ff8Bj
Lista de reproducción: https://www.youtube.com/playlist?list=PLt-b2TBrGUc_3yqC5f3lGvNfCpBzs1MT1
Formulario de presentismo: https://forms.gle/Jc6vnZf26mg3CRsW8
Consultas: https://forms.gle/vESCCsDDkPS47hi27
Grupo del Curso: https://chat.whatsapp.com/CvpM5cHeRIMICFxn1kZJTp
Aula virtual: https://aulasvirtuales.bue.edu.ar/
Planilla de Grupo del profesor: https://docs.google.com/spreadsheets/d/1MJVonlRDbNelhXjc0BPxgAPPMs9uxXlBEpw6MGceVcA/edit#gid=0
Primera presentación: https://docs.google.com/presentation/d/1IAmhswfiUaa56WYy5jWXY54g8FSY5WpFuM140e0MZlU/edit#slide=id.p
Presentación en YouTube: https://www.youtube.com/watch?v=-y5JbMDq9Vo


comandos GIT

git clone
git status
git add archivo1 arhivo2 ...
git add *
git commit -m 'datos del commit'
git push origin main
git fetch
git pull
git stash
git stash pop

Algunas definiciones

No integramos por ahora y nos olvidamos del responsive, hacemos los puntos por separado, luego se unifican criterios de color, fonts, cosas, para que quede homogéneo.

Empezamos por los formularios, cada uno tiene uno para hacer

Necesitamos:

4 formularios

- - - - - - - - -  

Formulario: ABM de Usuarios con 4 datos

Identificación: un codigo de usuario (texto)
Nombre y apellido: (texto)
Dirección: (texto)
Contacto: (texto) luego lo reemplazaremos por un link a whasapp con el nro de celular

- - - - - - - - -  

Formulario: ABM de Libros con 4 datos

Identificación: codigo del libro (texto)
Título del libro: (texto)
Autor: (texto)
Ubicación: un código que referencia la ubicación física del libro en la biblioteca (texto)

- - - - - - - - -  

Formulario: Operación

Registro de préstamo o devolución de un libro

Identificación: codigo del libro (texto)
Radio: Préstamo / Devolución

Por ahora no valida, no tenemos acceso al backend tal vez podamos hacer un servicio de prueba pero aún no dio ese tema

- - - - - - - - -  

Formulario: Contacto

Usar el modelo de formulario de contacto que se hizo en clase y cambiar los campos correspondientes para cada uno de los formularios definidos


https://drive.google.com/drive/folders/19BV0ayTc4j5qXJS-7JBC394DksWX2rEK (grid.html)
https://drive.google.com/drive/folders/1t01WV4sKVIv0q__1uDQBTZG2YFJRIPOg (grid.css)


- - - - - - - - -  

Con respecto a los nombres de campo, para que no se produzcan conflictos debemos definir una lista de nombres de campo, usaremos estos:

Libro_Id
Libro_Titulo
Libro_Autor
Libro_Ubicacion

Usuario_Id
Usuario_NomApe
Usuario_Direccion
Usuario_Contacto

Contacto_Nombre
Contacto_Motivo
Contacto_Consulta

- - - - - - - - -  

3 grillas de consulta

Lista de libros prestados

tiene los datos: 
Libro_Id, Libro_Titulo, Usuario_Id, Usuario_NomApe

Lista de libros disponibles

tiene los datos: 
Libro_Id, Libro_Titulo, Libro_Autor, Libro_Ubicacion

Lista de Usuarios

tiene los datos: 
Usuario_Id, Usuario_NomApe, Usuario_Direccion, Usuario_Contacto

- - - - - - - - -

