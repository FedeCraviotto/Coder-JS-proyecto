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

if (!peso) {
  Swal.showValidationMessage(`Debes ingresar un peso válido. Mayor a 1(kg)`);
} else if (isNaN(peso) || peso <= 0) {
  Swal.showValidationMessage(`Debes ingresar un númnero mayor a 1 (kg)`);
} else {
  ("todo bien");
}
