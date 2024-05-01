

document.addEventListener("DOMContentLoaded", function () {

       const formulario = document.getElementById('FormContacto');
       const mensajeError = document.getElementById('mensajeError');
   
       formulario.addEventListener('submit', function (evento) {
           evento.preventDefault(); // Previene el envío del formulario para poder validarlo con Javascript
   
           let nombre = document.getElementById('Contacto_Nombre').value;
           let motivo = document.getElementById('Contacto_Motivo').value;
           let email = document.getElementById('Contacto_Email').value;
           let consulta = document.getElementById('Contacto_Mensaje').value;
           let tipoU = document.getElementById('Tipo_Usuario').value;
           
   
           // Validación de los campos
           if (nombre.trim() === '') {
               mensajeError.innerText = 'Debe ingresar un nombre.';
               
               return;
           }
   
           if (motivo.trim() === '') {
               mensajeError.innerText = 'Debe inicar el motivo de su contacto.';
               return;
           }

           if (tipoU.trim() === 'Nulo') {
            mensajeError.innerText = 'Debe elegir el tipo de usuario.';
            return;
        }

           if (email.trim() === '') {
              mensajeError.innerText = 'Debe ingresar una Dirección de Correo Electrónico.';
              return;
          }
  
          if (!validarEmail(email)) {
              mensajeError.innerText = 'El formato del Correo Electrónico no es válido.';
              return;
          }
           if (consulta.trim() === '') {
              mensajeError.innerText = 'Debe ingresar el texto de la consulta o queja.';
              return;
          }
  
          
           // Si todo está correcto, se puede proceder a enviar el formulario o hacer alguna otra acción
           mensajeError.innerText = '';
           alert('Formulario enviado con éxito!');
           formulario.submit(); // Descomentar esta línea para permitir el envío del formulario
       });
   
       function validarEmail(email) {
              const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(String(email).toLowerCase());
          }

   });