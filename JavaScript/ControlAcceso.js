// Control de acceso simple con date() y una hora de permanencia

var loginTime = sessionStorage.getItem("Biblioteca");
var nowTime = new Date();
nowTime = nowTime.getTime();

if ((nowTime - loginTime) > 3600000 && false) { // 1 hora de timeout "&& true o && false" habilita o deshabilita el timeout   
	if (window.location.href.indexOf("carousel") > -1) {
		if (window.parent.location == window.location.href) {
			window.location.replace("Index.html");
		}
	} else {
		window.location.replace("../Index.html");
	}
}

