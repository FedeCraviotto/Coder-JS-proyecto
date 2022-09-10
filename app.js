// Variables
let rutina;
let arrayDeEjercicios;
let ejercicioBuscado;
const inputNumeroEjercicio = document.querySelector("#inputNumeroEjercicio");
const inputTranslationQuery = document.querySelector("#translation-query");
const btnExerciseQuery = document.querySelector(".btn-exercise-query");
btnExerciseQuery.disabled = true;
// Swal2 Settings
document.documentElement.style.setProperty("--animate-duration", ".8s");
const progressPopup = Swal.mixin({
  confirmButtonText: "Siguiente",
  showCancelButton: true,
  focusConfirm: false,
  backdrop: false,
  allowOutsideClick: false,
  allowEnterKey: true,
  showClass: {
    popup: "animate__animated animate__fadeIn",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOut",
  },
});
const endPopup = Swal.mixin({
  icon: "success",
  title: "Listo",
  allowEnterKey: true,
  showClass: {
    popup: "animate__animated animate__fadeIn",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOut",
  },
  preConfirm: () => {
    localStorage.setItem("rutina", JSON.stringify(rutina));
    reemplazarSesiones();
  },
});
const translateInputToast = Swal.mixin({
  toast: true,
  position: "top",
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  icon: "info",
  title: "Recuerda ingresar un número. Entre el 1 y el 1326",
});
//Swal2 - welcome
Swal.fire({
  title: "Bienvenido",
  text: 'Tocá "Explicación" para más info sobre la App',
  icon: "info",
  confirmButtonText: "OK",
}).then(() => {
  // load localStorage. If empty, load default routine sample.
  rutina = JSON.parse(localStorage.getItem("rutina")) || [];
  rutina.length == 0 ? leerRutinaAXIOS() : crearTablas();
});
// Load default routine (if no localStorage)
async function leerRutinaAXIOS() {
  try {
    const { data } = await axios("./data/rutina.json");
    rutina = data;
    crearTablas();
    Swal.fire({
      title: "Rutina cargada desde JSON",
      text: "Se ve que no tenías nada guardado en tu navegador. Hemos creado una tabla de muestra",
      icon: "info",
      confirmButtonText: "OK",
    });
  } catch {
    rutina = [];
  }
}
// Fetch API exercises. API HTTP Request settings
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "16d40f4cf1mshbf396cd2ab8b39ep14cb87jsnce4b384b8a95",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};
//EVENTS
// Fetch API Exercise(in Btn because request Quota Limits RapidAPI)
const btnGetExercises = document.querySelector("#getExercises");
btnGetExercises.addEventListener("click", async () => {
  await fetch("https://exercisedb.p.rapid.com/exercises", options) // es --> .p.rapidapi.com
    .then((response) => response.json())
    .then((response) => {
      arrayDeEjercicios = response;
      Swal.fire({
        title: "Lista cargada exitosamente",
        text: 'Tocá "Explicación" para más info sobre la App',
        icon: "success",
        confirmButtonText: "OK",
      });
      toggleExerciseButtons();
    })
    .catch(async (err) => {
      // if callQuota exceded, ask for exercises in local JSON
      const { data } = await axios("./data/exerciseList.json");
      arrayDeEjercicios = data;
      Swal.fire({
        title: "Hubo un problema. Pero tranquilo ;)",
        text: "Lista cargada desde la base de datos local",
        icon: "info",
        confirmButtonText: "Continuar",
      });
      toggleExerciseButtons();
    });
});
//Intro.js
const btnAbout = document.querySelector(".btn-about");
btnAbout.addEventListener("click", () => {
  introJs()
    .setOptions({
      disableInteraction: true,
      exitOnOverlayClick: false,
    })
    .start();
});
//Darkmode
const btnDarkMode = document.querySelector("#darkmode-toggle");
btnDarkMode.addEventListener("change", () => {
  document.querySelector("body").classList.toggle("darkBC");
});
//Exercise API
btnExerciseQuery.addEventListener("click", () => {
  buscarDatosEjercicio();
});
inputNumeroEjercicio.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarDatosEjercicio();
  }
});
//Translate API
document
  .querySelector(".btn-translation-query")
  .addEventListener("click", () => {
    requestTranslation();
  });
inputTranslationQuery.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    requestTranslation();
  }
});
// Core functions
const btnAgregarSesion = document.querySelector(".btn-agregarSesion");
btnAgregarSesion.addEventListener("click", () => {
  progressPopup
    .fire({
      title: "Ingrese nombre de sesión y cantidad de ejercicios",
      html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">
        <input type="text" id="cantidadDeEjercicios" class="swal2-input" placeholder="Cantidad de Ejercicios">`,
      preConfirm: () => {
        const nombreDeSesion =
          Swal.getPopup().querySelector("#nombreDeSesion").value;
        const cantidadDeEjercicios = parseInt(
          Swal.getPopup().querySelector("#cantidadDeEjercicios").value
        );
        if (!nombreDeSesion) {
          Swal.showValidationMessage(`Recuerda ingresar un nombre de sesión`);
        } else if (nombreDeSesion.length > 40) {
          Swal.showValidationMessage(
            `Nombre demasiado largo. Debe tener menos de 40 caracteres`
          );
        } else if (
          rutina.find(
            (s) => s.nombre.toLowerCase() == nombreDeSesion.toLowerCase()
          )
        ) {
          Swal.showValidationMessage(
            `Ya existe una sesión con ese nombre! Elige otro...`
          );
        } else if (cantidadDeEjercicios > 8 || cantidadDeEjercicios <= 0) {
          Swal.showValidationMessage(
            `La cantidad de ejercicios debe ser un número entre 1 y 8 inclusive`
          );
        } else if (!cantidadDeEjercicios || isNaN(cantidadDeEjercicios)) {
          Swal.showValidationMessage(
            `Ingresa una cantidad de ejercicios para la sesión`
          );
        } else {
          let ejercicios = [];
          for (let i = 0; i < cantidadDeEjercicios; i++) {
            ejercicios.push({
              nombre: "",
              proximasSeries: [],
              proximosPesos: [],
              seriesBase: [],
              seriesRealizadas: [],
              ultimosPesos: [],
            });
          }
          let nuevaSesion = { nombre: nombreDeSesion, ejercicios: ejercicios };
          return nuevaSesion;
        }
      },
    })
    .then(async (result) => {
      if (result.value === undefined) {
        let nuevaSesion = undefined;
        return;
      }
      let nuevaSesion = result.value;
      let breakSign = true;
      for (let i = 0; i < nuevaSesion.ejercicios.length; i++) {
        await progressPopup
          .fire({
            title: `Nombre para el ejercicio N° ${i + 1}`,
            html: `<input type="text" id="ejercicio" class="swal2-input" placeholder="Nombre del ejercicio">`,
            preConfirm: () => {
              let nombreDeEjercicio =
                Swal.getPopup().querySelector(`#ejercicio`).value;
              if (!nombreDeEjercicio || nombreDeEjercicio.length <= 0) {
                Swal.showValidationMessage(
                  `Debes ingresar un nombre para el ejercicio`
                );
              } else if (nombreDeEjercicio.length > 26) {
                Swal.showValidationMessage(
                  `El nombre del ejercicio no debe superar los 26 caracteres`
                );
              } else {
                return nombreDeEjercicio;
              }
            },
          })
          .then((result) => {
            result.value === undefined
              ? (breakSign = false)
              : (nuevaSesion.ejercicios[i].nombre = result.value);
          });
        if (breakSign === false) {
          break;
        }
      }
      if (breakSign === false) {
        return;
      } else {
        return nuevaSesion;
      }
    })
    .then(async (result) => {
      if (result === undefined) {
        return;
      }
      let nuevaSesion = result;
      let breakSign = true;
      for (let i = 0; i < nuevaSesion.ejercicios.length; i++) {
        await progressPopup
          .fire({
            title: `${nuevaSesion.ejercicios[i].nombre} - Cantidad de series`,
            html: `<input type="text" id="seriesEjercicio" class="swal2-input" placeholder="Cant Series">`,
            preConfirm: () => {
              const cantSeries = parseInt(
                Swal.getPopup().querySelector(`#seriesEjercicio`).value
              );
              if (cantSeries > 6 || cantSeries <= 0) {
                Swal.showValidationMessage(`Máximo 6 series, mínimo 1`);
              } else if (!cantSeries || isNaN(cantSeries)) {
                Swal.showValidationMessage(
                  `Debes ingresar un número para la cantidad de series`
                );
              } else {
                for (let j = 0; j < cantSeries; j++) {
                  nuevaSesion.ejercicios[i].seriesBase.push([]);
                }
              }
            },
          })
          .then((result) => {
            result.value === undefined ? (breakSign = false) : "";
          });
        if (breakSign === false) {
          nuevaSesion = undefined;
          break;
        }
      }
      if (breakSign === false) {
        return;
      } else {
        return nuevaSesion;
      }
    })
    .then(async (result) => {
      if (result === undefined) {
        return;
      }
      let nuevaSesion = result;
      let breakSign = true;
      for (let i = 0; i < nuevaSesion.ejercicios.length; i++) {
        for (let j = 0; j < nuevaSesion.ejercicios[i].seriesBase.length; j++) {
          await progressPopup
            .fire({
              title: `Serie N° ${j + 1} - ${
                nuevaSesion.ejercicios[i].nombre
              } - Repeticiones min y max`,
              html: `<input type="text" id="minReps" class="swal2-input" placeholder="Min">
                            <input type="text" id="maxReps" class="swal2-input" placeholder="Max">`,
              preConfirm: () => {
                const minReps = parseInt(
                  Swal.getPopup().querySelector(`#minReps`).value
                );
                const maxReps = parseInt(
                  Swal.getPopup().querySelector(`#maxReps`).value
                );
                if (!minReps || !maxReps) {
                  Swal.showValidationMessage(
                    `Debes completar los campos con repeticiones mínimas y máximas. Recuerda ingresar solo números mayores a 0`
                  );
                } else if (maxReps <= minReps) {
                  Swal.showValidationMessage(
                    "El máximo no puede ser igual o menor al mínimo"
                  );
                } else {
                  nuevaSesion.ejercicios[i].seriesBase[j].push(minReps);
                  nuevaSesion.ejercicios[i].seriesBase[j].push(maxReps);
                }
              },
            })
            .then((result) => {
              if (result.value !== true) {
                nuevaSesion = undefined;
                breakSign = false;
              }
            });
          if (breakSign === false) {
            nuevaSesion = undefined;
            break;
          }
        }
        if (breakSign === false) {
          nuevaSesion = undefined;
          break;
        }
      }
      if (breakSign === false) {
        return;
      } else {
        return nuevaSesion;
      }
    })
    .then(async (result) => {
      if (result === undefined) {
        return;
      }
      let breakSign = true;
      let nuevaSesion = result;
      for (let i = 0; i < nuevaSesion.ejercicios.length; i++) {
        for (let j = 0; j < nuevaSesion.ejercicios[i].seriesBase.length; j++) {
          await progressPopup
            .fire({
              title: `${nuevaSesion.ejercicios[i].nombre} - Serie N° ${
                j + 1
              } peso a levantar`,
              text: "Ten en cuenta que los pesos subirán de a 5 kg a medida que vayas progresando en tu entrenamiento",
              html: `<input type="text" id="peso" class="swal2-input" placeholder="Peso en kg">`,
              preConfirm: () => {
                const peso = parseInt(
                  Swal.getPopup().querySelector(`#peso`).value
                );
                if ((!peso || isNaN(peso)) && peso !== 0) {
                  Swal.showValidationMessage(`Debes ingresar un peso válido`);
                } else if (peso <= 0) {
                  Swal.showValidationMessage(
                    `Debes ingresar un número mayor a 1 (kg)`
                  );
                } else {
                  return peso;
                }
              },
            })
            .then((result) => {
              if (result.value === undefined) {
                nuevaSesion = undefined;
                breakSign = false;
              } else {
                nuevaSesion.ejercicios[i].proximosPesos.push(result.value);
              }
            });
          if (breakSign === false) {
            break;
          }
        }
        if (breakSign === false) {
          break;
        }
      }
      if (breakSign === false || nuevaSesion === undefined) {
        return;
      } else {
        return nuevaSesion;
      }
    })
    .then((result) => {
      if (result === undefined) {
        return;
      }
      rutina.push(result);
      endPopup.fire({
        text: "Rutina creada con éxito.",
      });
    });
});
const btnAgregarEjercicio = document.querySelector(".btn-agregarEjercicio");
btnAgregarEjercicio.addEventListener("click", () => {
  progressPopup
    .fire({
      title: `Ingresá el nombre del ejercicio a agregar`,
      html: `<input type="text" id="nombreDeEjercicio" class="swal2-input" placeholder="Nombre del ejercicio">`,
      preConfirm: () => {
        const nombreDeEjercicio =
          Swal.getPopup().querySelector(`#nombreDeEjercicio`).value;
        if (!nombreDeEjercicio || nombreDeEjercicio.length <= 0) {
          Swal.showValidationMessage(
            `Debes ingresar un nombre para el ejercicio`
          );
        } else if (nombreDeEjercicio.length > 26) {
          Swal.showValidationMessage(
            `El nombre del ejercicio no debe superar los 26 caracteres`
          );
        } else {
          let nuevoEjercicio = {
            nombre: nombreDeEjercicio,
            seriesBase: [],
            seriesRealizadas: [],
            ultimosPesos: [],
            proximosPesos: [],
            proximasSeries: [],
          };
          return nuevoEjercicio;
        }
      },
    })
    .then(async (result) => {
      if (result.value === undefined) {
        return;
      }
      let cantSeriesConfirmada;
      let nuevoEjercicio = result.value;
      await progressPopup
        .fire({
          title: `Ingrese cantidad de series para el ejercicio ${nuevoEjercicio.nombre}`,
          html: `<input type="text" id="seriesEjercicio" class="swal2-input" placeholder="Ingresa cantidad de series">`,
          preConfirm: () => {
            let cantSeries = parseInt(
              Swal.getPopup().querySelector(`#seriesEjercicio`).value
            );
            if (cantSeries > 6 || cantSeries <= 0) {
              Swal.showValidationMessage(`Máximo 6 series, mínimo 1`);
            } else if (!cantSeries || isNaN(cantSeries)) {
              Swal.showValidationMessage(
                `Debes ingresar un número para la cantidad de series`
              );
            } else {
              cantSeriesConfirmada = cantSeries;
            }
          },
        })
        .then((result) => {
          if (result.value === undefined) {
            nuevoEjercicio = undefined;
            return;
          } else {
            for (let i = 0; i < cantSeriesConfirmada; i++) {
              nuevoEjercicio.seriesBase.push([]);
            }
          }
        });
      return nuevoEjercicio;
    })
    .then(async (result) => {
      if (result === undefined) {
        return;
      }
      let nuevoEjercicio = result;
      let breakSign = true;
      for (let i = 0; i < nuevoEjercicio.seriesBase.length; i++) {
        await progressPopup
          .fire({
            title: `Ingresá el mínimo y el máximo de repeticiones para la serie ${
              i + 1
            } `,
            html: `<input type="text" id="minReps" class="swal2-input" placeholder="Min">
            <input type="text" id="maxReps" class="swal2-input" placeholder="Max">`,
            preConfirm: () => {
              const minReps = parseInt(
                Swal.getPopup().querySelector(`#minReps`).value
              );
              const maxReps = parseInt(
                Swal.getPopup().querySelector(`#maxReps`).value
              );
              if (!minReps || !maxReps) {
                Swal.showValidationMessage(
                  `Debes completar los campos con repeticiones mínimas y máximas. Recuerda ingresar solo números mayores a 0`
                );
              } else if (maxReps <= minReps) {
                Swal.showValidationMessage(
                  "El máximo no puede ser igual o menor al mínimo"
                );
              } else {
                nuevoEjercicio.seriesBase[i].push(minReps);
                nuevoEjercicio.seriesBase[i].push(maxReps);
              }
            },
          })
          .then((result) => {
            result.value === undefined ? (breakSign = false) : "";
          });
        if (breakSign == false) {
          nuevoEjercicio = undefined;
          break;
        }
      }
      return nuevoEjercicio;
    })
    .then(async (result) => {
      if (result === undefined) {
        return;
      }
      let breakSign = true;
      let nuevoEjercicio = result;
      for (let i = 0; i < nuevoEjercicio.seriesBase.length; i++) {
        await progressPopup
          .fire({
            title: `Ingresá el peso (kg) a levantar para la serie ${i + 1}`,
            html: `<input type="text" id="peso" class="swal2-input" placeholder="Peso en kg">`,
            preConfirm: () => {
              const peso = parseInt(
                Swal.getPopup().querySelector(`#peso`).value
              );
              if (!peso && peso !== 0) {
                Swal.showValidationMessage(`Debes ingresar un peso válido`);
              } else if (isNaN(peso) || peso <= 0) {
                Swal.showValidationMessage(`El peso debe ser mayor a 1 (kg)`);
              } else {
                return peso;
              }
            },
          })
          .then((result) => {
            if (result.value === undefined) {
              breakSign = false;
            } else {
              nuevoEjercicio.proximosPesos.push(result.value);
            }
          });
        if (breakSign == false) {
          nuevoEjercicio = undefined;
          break;
        }
      }
      return nuevoEjercicio;
    })
    .then(async (result) => {
      if (result === undefined) {
        return;
      }
      let nuevoEjercicio = result;
      let indiceDeSesion;
      await progressPopup
        .fire({
          title:
            "Ingrese nombre de la sesión a la cual querés agregar un nuevo ejercicio",
          html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">`,
          preConfirm: () => {
            const nombreDeSesion =
              Swal.getPopup().querySelector("#nombreDeSesion").value;
            let indiceDeSesion = rutina.indexOf(
              rutina.find(
                (sesion) =>
                  sesion.nombre.toLowerCase() == nombreDeSesion.toLowerCase()
              )
            );
            if (!nombreDeSesion || indiceDeSesion < 0) {
              Swal.showValidationMessage(
                `Nombre de sesión inválido o inexistente. Prueba con otro nombre.`
              );
            } else {
              return indiceDeSesion;
            }
          },
        })
        .then((result) => {
          if (result.value === undefined) {
            return;
          } else {
            indiceDeSesion = result.value;
            rutina[indiceDeSesion].ejercicios.push(nuevoEjercicio);
          }
        });
      if (indiceDeSesion === undefined) {
        return;
      } else {
        return 4;
      }
    })
    .then((result) => {
      if (result !== 4) {
        return;
      }
      endPopup.fire({
        text: "Ejercicio agregado con éxito.",
      });
    });
});
const btnAnotarRepsSesion = document.querySelector(".btn-anotarRepsSesion");
btnAnotarRepsSesion.addEventListener("click", () => {
  progressPopup
    .fire({
      titleText: "Ingrese nombre de la sesión",
      html: `<p class="input-custom__text">Para anotar las repeticiones realizadas en todos los ejercicios de esa sesión</p>
    <input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">`,
      preConfirm: () => {
        const nombreDeSesion =
          Swal.getPopup().querySelector("#nombreDeSesion").value;
        let indiceDeSesion = rutina.indexOf(
          rutina.find(
            (sesion) =>
              sesion.nombre.toLowerCase() == nombreDeSesion.toLowerCase()
          )
        );
        if (!nombreDeSesion || indiceDeSesion < 0) {
          Swal.showValidationMessage(
            `Nombre de sesión inválido o inexistente. Prueba con otro nombre.`
          );
        } else {
          return indiceDeSesion;
        }
      },
    })
    .then(async (result) => {
      if (result.value === undefined) {
        return;
      }
      let indiceDeSesion = result.value;
      let arrayDeSeries = [];
      for (let i = 0; i < rutina[indiceDeSesion].ejercicios.length; i++) {
        let arrayDeReps = [];
        for (
          let j = 0;
          j < rutina[indiceDeSesion].ejercicios[i].seriesBase.length;
          j++
        ) {
          let breakSign = true;
          await progressPopup
            .fire({
              title: `${rutina[indiceDeSesion].ejercicios[i].nombre} - Serie ${
                j + 1
              } - Reps Realizadas`,
              html: `<input type="text" id="cantReps" class="swal2-input" placeholder="cantReps">`,
              preConfirm: () => {
                const cantReps = parseInt(
                  Swal.getPopup().querySelector("#cantReps").value
                );
                if (!cantReps || isNaN(cantReps) || cantReps < 0) {
                  Swal.showValidationMessage(
                    `Debes llenar este campo. Recuerda ingresar un número positivo`
                  );
                } else {
                  arrayDeReps.push(cantReps);
                }
              },
            })
            .then((result) => {
              result.value === undefined ? (breakSign = false) : "";
            });
          if (breakSign == false) {
            return;
          }
        }
        arrayDeSeries.push(arrayDeReps);
      }
      for (let i = 0; i < rutina[indiceDeSesion].ejercicios.length; i++) {
        rutina[indiceDeSesion].ejercicios[i].seriesRealizadas = arrayDeSeries[i];
      }
      return 4;
    })
    .then((result) => {
      if (result !== 4) {
        return;
      }
      endPopup.fire({
        text: "Series Anotadas con éxito.",
      });
    });
});
const btnAnotarRepsUno = document.querySelector(".btn-anotarRepsx1");
btnAnotarRepsUno.addEventListener("click", () => {
  progressPopup
    .fire({
      title:
        "Ingrese nombre de la sesión del ejercicio, y el nombre del ejercicio ",
      html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">
    <input type="text" id="nombreDeEjercicio" class="swal2-input" placeholder="Nombre de Ejercicio">`,
      preConfirm: () => {
        const nombreDeSesion =
          Swal.getPopup().querySelector("#nombreDeSesion").value;
        const nombreDeEjercicio =
          Swal.getPopup().querySelector("#nombreDeEjercicio").value;
        if (!nombreDeSesion || !nombreDeEjercicio) {
          Swal.showValidationMessage(`Recuerda completar ambos campos`);
        } else {
          let indiceDeSesion = rutina.indexOf(
            rutina.find(
              (sesion) =>
                sesion.nombre.toLowerCase() == nombreDeSesion.toLowerCase()
            )
          );
          let indiceDeEjercicio = rutina[indiceDeSesion].ejercicios.indexOf(
            rutina[indiceDeSesion].ejercicios.find(
              (ejercicio) =>
                ejercicio.nombre.toLowerCase() ==
                nombreDeEjercicio.toLowerCase()
            )
          );

          if (indiceDeSesion < 0) {
            Swal.showValidationMessage(
              `Nombre de sesión inválido. Intenta con otro.`
            );
          } else if (indiceDeEjercicio < 0) {
            Swal.showValidationMessage(
              `Nombre de ejercicio. Intenta con otro.`
            );
          } else {
            return { indiceDeSesion, indiceDeEjercicio };
          }
        }
      },
    })
    .then(async (result) => {
      if (result.value === undefined) {
        return;
      }
      let grupoDeSeries = [];
      let indiceDeSesion = result.value.indiceDeSesion;
      let indiceDeEjercicio = result.value.indiceDeEjercicio;
      for (
        let i = 0;
        i < rutina[indiceDeSesion].ejercicios[indiceDeEjercicio].seriesBase.length;
        i++
      ) {
        let breakSign = true;
        await progressPopup
          .fire({
            title: `${
              rutina[indiceDeSesion].ejercicios[indiceDeEjercicio].nombre
            } - Serie ${i + 1} - Reps Realizadas`,
            html: `<input type="text" id="cantReps" class="swal2-input" placeholder="cantReps">`,
            preConfirm: () => {
              const cantReps = parseInt(
                Swal.getPopup().querySelector("#cantReps").value
              );
              if (!cantReps || isNaN(cantReps) || cantReps < 0) {
                Swal.showValidationMessage(
                  `Debes llenar este campo. Recuerda ingresar un número positivo`
                );
              } else {
                grupoDeSeries.push(cantReps);
              }
            },
          })
          .then((result) => {
            result.value === undefined ? (breakSign = false) : "";
          });
        if (breakSign == false) {
          return;
        }
      }
      rutina[indiceDeSesion].ejercicios[indiceDeEjercicio].seriesRealizadas =
        grupoDeSeries;
      return 4;
    })
    .then((result) => {
      if (result !== 4) {
        return;
      }
      endPopup.fire({
        text: "Series Anotadas con éxito.",
      });
    });
});
const btnProxSesion = document.querySelector(".btn-generarProximaSesion");
btnProxSesion.addEventListener("click", () => {
  progressPopup
    .fire({
      title:
        "Ingrese nombre de la sesión de la cual quieras generar próximos pesos y repeticiones",
      html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">`,
      preConfirm: () => {
        const nombreDeSesion =
          Swal.getPopup().querySelector("#nombreDeSesion").value;
        let indiceDeSesion = rutina.indexOf(
          rutina.find(
            (sesion) =>
              sesion.nombre.toLowerCase() == nombreDeSesion.toLowerCase()
          )
        );
        if (!nombreDeSesion) {
          Swal.showValidationMessage(`Recuerda completar este campo`);
        } else if (indiceDeSesion < 0) {
          Swal.showValidationMessage(
            `Nombre de sesión inválido. Intenta con otro.`
          );
        } else {
          return indiceDeSesion;
        }
      },
    })
    .then((result) => {
      if (result.value === undefined) {
        return;
      }
      let indiceDeSesion = result.value;
      equipararUltimosPesosConProximos(indiceDeSesion);
      actualizarPesos(indiceDeSesion);
      actualizarSeries(indiceDeSesion);
      endPopup.fire({
        text: "Series y pesos de la sesión indicada actualizados con éxito.",
      });
    });
});
const btnProxSesionUno = document.querySelector(".btn-generarProximaSesionx1");
btnProxSesionUno.addEventListener("click", () => {
  progressPopup
    .fire({
      title:
        "Ingrese nombre de la sesión del ejercicio, y el nombre del ejercicio ",
      html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">
    <input type="text" id="nombreDeEjercicio" class="swal2-input" placeholder="Nombre de Ejercicio">`,
      preConfirm: () => {
        let indiceDeSesion;
        let indiceDeEjercicio;
        const nombreDeSesion =
          Swal.getPopup().querySelector("#nombreDeSesion").value;
        const nombreDeEjercicio =
          Swal.getPopup().querySelector("#nombreDeEjercicio").value;
        if (!nombreDeSesion || !nombreDeEjercicio) {
          Swal.showValidationMessage(`Recuerda completar ambos campos`);
        } else {
          indiceDeSesion = rutina.indexOf(
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
            indiceDeEjercicio = rutina[indiceDeSesion].ejercicios.indexOf(
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
              return { indiceDeSesion, indiceDeEjercicio };
            }
          }
        }
      },
    })
    .then((result) => {
      if (result.value === undefined) {
        return;
      }
      let indiceDeSesion = result.value.indiceDeSesion;
      let indiceDeEjercicio = result.value.indiceDeEjercicio;
      equipararUltimosPesosConProximosUnicoEjercicio(
        indiceDeSesion,
        indiceDeEjercicio
      );
      actualizarPesosUnicoEjercicio(indiceDeSesion, indiceDeEjercicio);
      actualizarSeriesUnicoEjercicio(indiceDeSesion, indiceDeEjercicio);
      endPopup.fire({
        text: "Series y pesos del ejercicio indicado actualizados con éxito.",
      });
    });
});
const btnEliminarSesion = document.querySelector(".btn-eliminarSesion");
btnEliminarSesion.addEventListener("click", () => {
  progressPopup
    .fire({
      title: "Ingrese el nombre de la sesión que quiere borrar",
      html: `<input class="swal2-input" type="text" id="nombreDeSesion" placeholder="Nombre de sesión"></input>`,
      preConfirm: () => {
        const nombreDeSesion =
          Swal.getPopup().querySelector("#nombreDeSesion").value;
        let indiceDeSesion = rutina.indexOf(
          rutina.find((sesion) => {
            return sesion.nombre.toLowerCase() == nombreDeSesion.toLowerCase();
          })
        );
        if (!nombreDeSesion) {
          Swal.showValidationMessage(`Recuerda completar este campo`);
        } else if (indiceDeSesion < 0) {
          Swal.showValidationMessage(
            `Nombre de sesión inválido. Intenta con otro.`
          );
        } else {
          return indiceDeSesion;
        }
      },
    })
    .then((result) => {
      let indiceDeSesion = result.value;
      if (indiceDeSesion === undefined) {
        return;
      } else {
        rutina.splice(indiceDeSesion, 1);
      }
      endPopup.fire({
        text: "Series y pesos del ejercicio indicado actualizados con éxito.",
      });
    });
});
const btnEliminarEjercicio = document.querySelector(".btn-eliminarEjercicio");
btnEliminarEjercicio.addEventListener("click", () => {
  progressPopup
    .fire({
      title:
        "Ingrese el nombre de la Sesión a la que pertenece el ejercicio que quiere borrar, y luego el nombre del ejercicio a eliminar",
      html: `<input type="text "class="swal2-input" id="nombreDeSesion" placeholder="Nombre de Sesión" ></input>
    <input type="text "class="swal2-input" id="nombreDeEjercicio" placeholder="nombreDeEjercicio" ></input>`,
      preConfirm: () => {
        let indiceDeSesion;
        let indiceDeEjercicio;
        const nombreDeSesion =
          Swal.getPopup().querySelector("#nombreDeSesion").value;
        const nombreDeEjercicio =
          Swal.getPopup().querySelector("#nombreDeEjercicio").value;
        if (!nombreDeSesion || !nombreDeEjercicio) {
          Swal.showValidationMessage(`Recuerda completar ambos campos`);
        } else {
          indiceDeSesion = rutina.indexOf(
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
            indiceDeEjercicio = rutina[indiceDeSesion].ejercicios.indexOf(
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
              return { indiceDeSesion, indiceDeEjercicio };
            }
          }
        }
      },
    })
    .then((result) => {
      if (result.value === undefined) {
        return;
      }
      let indiceDeSesion = result.value.indiceDeSesion;
      let indiceDeEjercicio = result.value.indiceDeEjercicio;
      rutina[indiceDeSesion].ejercicios.splice(indiceDeEjercicio, 1);
      endPopup.fire({
        text: "Ejercicio eliminado exitosamente",
      });
    });
});
const btnBorrarRutina = document.querySelector(".btn-borrarRutina");
btnBorrarRutina.addEventListener("click", () => {
  Swal.fire({
    title: "Atención - Confirma borrado",
    text: "Una vez que elmines la rutina completa no podrás revertir este paso",
    icon: "warning",
    confirmButtonColor: "#3085d6",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar la rutina",
    focusConfirm: false,
    backdrop: false,
    allowOutsideClick: false,
    showClass: {
      popup: "animate__animated animate__fadeIn",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOut",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      rutina = [];
      localStorage.removeItem("rutina");
      borrarTablas();
      Swal.fire("Atención", "Has eliminado la rutina completa", "info");
    }
  });
});
/*Calc Functions start*/
function equipararUltimosPesosConProximos(num) {
  rutina[num].ejercicios.forEach((ejercicio) => {
    ejercicio.ultimosPesos = ejercicio.proximosPesos;
  });
}
function actualizarPesos(num) {
  rutina[num].ejercicios.forEach((ejercicio) => {
    let nuevosPesos = [];
    ejercicio.seriesRealizadas.forEach((serie, i) => {
      serie >= ejercicio.seriesBase[i][1]
        ? nuevosPesos.push(ejercicio.ultimosPesos[i] + 5)
        : nuevosPesos.push(ejercicio.ultimosPesos[i]);
    });
    ejercicio.proximosPesos = nuevosPesos;
  });
}
function actualizarSeries(num) {
  rutina[num].ejercicios.forEach((ejercicio) => {
    let nuevasSeries = [];
    ejercicio.seriesRealizadas.forEach((serie, i) => {
      if (serie >= ejercicio.seriesBase[i][1]) {
        nuevasSeries.push(ejercicio.seriesBase[i]);
      } else {
        let nuevoRangoDeSeries = [];
        nuevoRangoDeSeries.push(serie, ejercicio.seriesBase[i][1]);
        nuevasSeries.push(nuevoRangoDeSeries);
      }
    });
    ejercicio.proximasSeries = nuevasSeries;
  });
}
function equipararUltimosPesosConProximosUnicoEjercicio(sesion, ejercicio) {
  rutina[sesion].ejercicios[ejercicio].ultimosPesos =
    rutina[sesion].ejercicios[ejercicio].proximosPesos;
}
function actualizarPesosUnicoEjercicio(sesion, ejercicio) {
  let nuevosPesos = [];
  rutina[sesion].ejercicios[ejercicio].seriesRealizadas.forEach((serie, i) => {
    serie >= rutina[sesion].ejercicios[ejercicio].seriesBase[i][1]
      ? nuevosPesos.push(
          rutina[sesion].ejercicios[ejercicio].ultimosPesos[i] + 5
        )
      : nuevosPesos.push(rutina[sesion].ejercicios[ejercicio].ultimosPesos[i]);
  });
  rutina[sesion].ejercicios[ejercicio].proximosPesos = nuevosPesos;
}
function actualizarSeriesUnicoEjercicio(sesion, ejercicio) {
  let nuevasSeries = [];
  rutina[sesion].ejercicios[ejercicio].seriesRealizadas.forEach((serie, i) => {
    if (serie >= rutina[sesion].ejercicios[ejercicio].seriesBase[i][1]) {
      nuevasSeries.push(rutina[sesion].ejercicios[ejercicio].seriesBase[i]);
    } else {
      let nuevoRangoDeSeries = [];
      nuevoRangoDeSeries.push(
        serie,
        rutina[sesion].ejercicios[ejercicio].seriesBase[i][1]
      );
      nuevasSeries.push(nuevoRangoDeSeries);
    }
  });
  rutina[sesion].ejercicios[ejercicio].proximasSeries = nuevasSeries;
}
/*Calc Functions end*/
// Enable/Disable ExerciseButtons
function toggleExerciseButtons() {
  btnGetExercises.disabled = true;
  btnGetExercises.classList.add("btn--disabled");
  btnGetExercises.innerText = "Lista obtenida con éxito";
  btnExerciseQuery.disabled = false;
  btnExerciseQuery.classList.remove("btn--disabled");
}
// Input number tester - function
function filtrarInput(textbox, inputFilter, errMsg) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
    "focusout",
  ].forEach((event) => {
    textbox.addEventListener(event, function (e) {
      if (inputFilter(this.value)) {
        // Accepted value
        if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
          this.classList.remove("input-error");
          this.setCustomValidity("");
        }
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        // Rejected value - restore the previous one
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        // Rejected value - nothing to restore
        this.value = "";
      }
    });
  });
}
// Input number tester - call
filtrarInput(
  document.getElementById("inputNumeroEjercicio"),
  (value) => {
    return /^\d*\.?\d*$/.test(value); // Allow only numbers
  },
  "Recordá ingresar números entre 1 y 1326"
);
// Translate API functions & request setup
//Exercise API
function buscarDatosEjercicio() {
  if (inputNumeroEjercicio.value) {
    idEjercicio = inputNumeroEjercicio.value - 1;
    ejercicioBuscado = arrayDeEjercicios[parseInt(idEjercicio)];
    document.querySelector("#nombreDelEjericio").innerText =
      ejercicioBuscado.name;
    document.querySelector("#musculoQueInterviene").innerText =
      ejercicioBuscado.bodyPart;
    document.querySelector("#elementosAUtilizar").innerText =
      ejercicioBuscado.equipment;
    document.querySelector("#zonaAEstimular").innerText =
      ejercicioBuscado.target;
    document.querySelector("#gifIndicaciones").src = ejercicioBuscado.gifUrl;
  } else {
    translateInputToast.fire();
  }
}
async function requestTranslation() {
  try {
    let mensajeATraducir = inputTranslationQuery.value;
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", mensajeATraducir);
    encodedParams.append("target", "es");
    encodedParams.append("source", "en");
    const translateOptions = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "16d40f4cf1mshbf396cd2ab8b39ep14cb87jsnce4b384b8a95",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      body: encodedParams,
    };
    const traduccionObj = await fetch(
      "https://google-translate1.p.rapidapi.com/language/translate/v2",
      translateOptions
    );
    const data = await traduccionObj.json();
    let traduccion = data.data.translations[0].translatedText;
    document.querySelector("#translation-result").innerText = `"${traduccion}"`;
  } catch {
    (err) => console.error(err);
  }
}
//Table render functions
// Tables, visual refresh
function reemplazarSesiones() {
  borrarTablas();
  crearTablas();
}
//Tables delete
function borrarTablas() {
  const todasLasTablas = document.querySelectorAll("table");
  todasLasTablas.forEach((table) => {
    table.remove();
  });
}
//Table create
function crearTablas() {
  rutina.forEach((sesion, i) => {
    const tablaDeSesion = document.createElement("table");
    tablaDeSesion.innerHTML = `
    <caption>${sesion.nombre}</caption>
        <tr>
            <th>Ejercicio</th>
            <th>Cantidad de Series</th>
            <th>Series Base</th>
            <th>Pesos Anteriores</th>
            <th>Series Realizadas</th>
            <th>Proximas Series</th>
            <th>Proximos Pesos</th>
        </tr>
            `;
    sesion.ejercicios.forEach((ejercicio, indice) => {
      let ultimosPesosUnidos = ejercicio.ultimosPesos.join(" - ");
      let seriesRealizadasUnidas = ejercicio.seriesRealizadas.join(" - ");
      let proximosPesosUnidos = ejercicio.proximosPesos.join(" - ");
      let seriesBaseTD = document.createElement("td");
      let seriesBaseUL = document.createElement("ul");
      ejercicio.seriesBase.forEach((serie, i) => {
        let seriesBaseLI = document.createElement("li");
        seriesBaseLI.innerText = serie.join(" - ");
        seriesBaseUL.append(seriesBaseLI);
      });
      seriesBaseTD.append(seriesBaseUL);
      let proximasSeriesTD = document.createElement("td");
      let proximasSeriesUL = document.createElement("ul");
      ejercicio.proximasSeries.forEach((serie, i) => {
        let proximasSeriesLI = document.createElement("li");
        proximasSeriesLI.innerText = serie.join(" - ");
        proximasSeriesUL.append(proximasSeriesLI);
      });
      proximasSeriesTD.append(proximasSeriesUL);
      const nuevoEjercicio = document.createElement("tr");
      nuevoEjercicio.innerHTML = `
            <td>${ejercicio.nombre}</td>
            <td>${ejercicio.seriesBase.length}</td>
            <td>${ultimosPesosUnidos}</td>
            <td>${seriesRealizadasUnidas}</td>
            <td>${proximosPesosUnidos}</td>`;
      nuevoEjercicio.insertBefore(seriesBaseTD, nuevoEjercicio.children[2]);
      nuevoEjercicio.insertBefore(proximasSeriesTD, nuevoEjercicio.children[5]);
      tablaDeSesion.append(nuevoEjercicio);
    });
    document.querySelector(".routine-container").append(tablaDeSesion);
  });
}
