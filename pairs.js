// Nombre de sesión SOLO, que exista
function validarNombreDeSesion(nombreDeSesion, indiceDeSesion) {
  if (!nombreDeSesion) {
    Swal.showValidationMessage(`Recuerda completar este campo`);
  } else if (indiceDeSesion < 0) {
    Swal.showValidationMessage(`Nombre de sesión inválido. Intenta con otro.`);
  } else {
    return indiceDeSesion;
  }
}
/* al cerrar el preconfirm:
return validarNombreDeSesion(nombreDeSesion, indiceDeSesion)
*/

// Ingresar reps realizadas
function validarCantReps(arrayReceptor, cantReps) {
  if (!cantReps || isNaN(cantReps) || cantReps < 0) {
    Swal.showValidationMessage(
      `Debes llenar este campo. Recuerda ingresar un número positivo`
    );
  } else {
    arrayReceptor.push(cantReps);
  }
}

// Nombre de sesión Y de ejercicio AMBOS JUNTOS
function validarNombreSesionYDeEjercicio(nombreDeSesion, nombreDeEjercicio) {
  if (!nombreDeSesion || !nombreDeEjercicio) {
    Swal.showValidationMessage(`Recuerda completar ambos campos`);
  } else {
    let indiceDeSesion = rutina.indexOf(
      rutina.find(
        (sesion) => sesion.nombre.toLowerCase() == nombreDeSesion.toLowerCase()
      )
    );
    if (indiceDeSesion < 0) {
      Swal.showValidationMessage(
        `Nombre de sesión inválido. Intenta con otro.`
      );
    } else {
      let indiceDeEjercicio = rutina[indiceDeSesion].ejercicios.indexOf(
        rutina[indiceDeSesion].ejercicios.find(
          (ejercicio) =>
            ejercicio.nombre.toLowerCase() == nombreDeEjercicio.toLowerCase()
        )
      );
      if (indiceDeEjercicio < 0) {
        Swal.showValidationMessage(
          `Nombre de ejercicio inexistente. Intenta con otro.`
        );
      } else {
        return { indiceDeSesion, indiceDeEjercicio };
      }
    }
  }
}
