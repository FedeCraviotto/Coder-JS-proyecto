/*En todas las funciones de modificar 1 solo ejercicio, ya sea para anotar, agregar, eliminar, o generar proxima, inicializaba las variables al tope del preConfirm. Abajo solo reasignaba.
Ahora las inicializo directo en la validación. Ojo
En: btnProxSesionUno, btnEliminarEjercicio seguro
Y tal vez en btnAnotarRepsUno*/


// Designar un nuevo nombre de sesión y cant ejercicios
if (!nombreDeSesion) {
  Swal.showValidationMessage(`Recuerda ingresar un nombre de sesión`);
} else if (
  rutina.find((s) => s.nombre.toLowerCase() == nombreDeSesion.toLowerCase())
) {
  Swal.showValidationMessage(
    `Ya existe una sesión con ese nombre! Elige otro...`
  );
} else if (!cantidadDeEjercicios || isNaN(cantidadDeEjercicios)) {
  Swal.showValidationMessage(
    `Ingresa una cantidad de ejercicios para la sesión`
  );
} else if (cantidadDeEjercicios > 8 || cantidadDeEjercicios <= 0) {
  Swal.showValidationMessage(
    `La cantidad de ejercicios debe ser un número entre 1 y 8 inclusive`
  );
} else {
  return "Todo bien";
}
// Designar nombre de ejercicio
if (!nombreDeEjercicio || nombreDeEjercicio.length <= 0) {
  Swal.showValidationMessage(`Debes ingresar un nombre para el ejercicio`);
} else if (nombreDeEjercicio.length > 26) {
  Swal.showValidationMessage(
    `El nombre del ejercicio no debe superar los 26 caracteres`
  );
} else {
  return "Todo bien";
}

if (cantSeries > 6 || cantSeries <= 0) {
  Swal.showValidationMessage(`Máximo 6 series, mínimo 1`);
} else if (!cantSeries || isNaN(cantSeries)) {
  Swal.showValidationMessage(
    `Debes ingresar un número para la cantidad de series`
  );
} else {
  return "Tutti bene";
}

if (!minReps || !maxReps) {
  Swal.showValidationMessage(
    `Debes completar los campos con repeticiones mínimas y máximas. Recuerda ingresar solo números mayores a 0`
  );
} else if (maxReps <= minReps) {
  Swal.showValidationMessage("El máximo no puede ser igual o menor al mínimo");
} else {
  ("todo bien");
}

if (!peso && peso !== 0) {
    Swal.showValidationMessage(`Debes ingresar un peso válido`);
  } else if (isNaN(peso) || peso <= 0) {
    Swal.showValidationMessage(`El peso debe ser mayor a 1 (kg)`);
  } else {
  ("todo bien");
}

// Nombre de sesión SOLO, que exista

if (!nombreDeSesion) {
    Swal.showValidationMessage(`Recuerda completar este campo`);
  } else if (indiceDeSesion < 0) {
    Swal.showValidationMessage(
      `Nombre de sesión inválido. Intenta con otro.`
    );
  } else {
  'ok' }

// Ingresar reps realizadas
if (!cantReps || isNaN(cantReps) || cantReps < 0) {
    Swal.showValidationMessage(
      `Debes llenar este campo. Recuerda ingresar un número positivo`
    );
  } else {
  }


// Nombre de sesión Y de ejercicio AMBOS JUNTOS

if (!nombreDeSesion || !nombreDeEjercicio) {
    Swal.showValidationMessage(`Recuerda completar ambos campos`);
  } else {
    let indiceDeSesion = rutina.indexOf(
      rutina.find(
        (sesion) =>
          sesion.nombre.toLowerCase() == nombreDeSesion.toLowerCase()
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
            ejercicio.nombre.toLowerCase() ==
            nombreDeEjercicio.toLowerCase()
        )
      );
      if (indiceDeEjercicio < 0) {
        Swal.showValidationMessage(
          `Nombre de ejercicio inexistente. Intenta con otro.`
        );
      } else {


        'acción - OJO QUE esta todo anidado en el ELSE'
      }
    }
}