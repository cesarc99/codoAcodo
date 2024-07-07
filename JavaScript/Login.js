// Manejo de Login

var Users = [], unUser, Accesses = [], unAccess;
getDatos("userAccess.db", "access");
getDatos("users.db", "usuarios");

document.getElementById("btnLogin").addEventListener("click", procLogin);
document.getElementById("btnIngresar").addEventListener("click", procIngreso);

function procLogin() {
	var modal, span;

	modal = document.getElementById("myModal");					// Get the modal
	span = document.getElementsByClassName("close")[0];			// Get the <span> element that closes the modal
	modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	modal.style.display = "none";
	}
	
	// When the user clicks anywhere outside of the modal, close it
/*
	window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
	}
*/

}
  

function procIngreso() {
	// validar usuario y Password (Ahora solo registra el momento del ingreso)
	// mensaje de error
	// una hora de permanencia
	
	var loginTime, idxU, idxP, usr, pass;

	usr = document.getElementById("Usuario_Id").value;
	pass = document.getElementById("Usuario_Password").value;
	loginTime = new Date();
	loginTime = loginTime.getTime();
	
	idxU = Users.findIndex(e => e.Id == usr);
	idxP = Accesses.findIndex(e => e.Id == usr);
	if (idxU > -1 && idxP > -1) {
		unUser = Users[idxU];
		unAccess = Accesses[idxP];
		if (unAccess.Password == pass) {
			sessionStorage.setItem("Biblioteca", loginTime);
			window.location.replace("./Pages/Consultas.html");
		} else {
			document.getElementById("mensajeErrorUsuario").innerText = "No existe Usuario o Password Incorrecta";
		}
	} else {
		document.getElementById("mensajeErrorUsuario").innerText = "No existe Usuario o no tiene Password";		
	}	
}

