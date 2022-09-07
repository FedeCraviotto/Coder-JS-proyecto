let rutina;
let arrayDeEjercicios;

//Sweet Alert
Swal.fire({
    title: 'Bienvenido',
    text: 'Tocá "Explicación" para más info sobre la App',
    icon: 'info',
    confirmButtonText: 'OK',
  }).then(() => {
    rutina = JSON.parse(localStorage.getItem('rutina')) || [];
    rutina.length==0?leerRutinaAXIOS():crearTablas();
  })

async function leerRutinaAXIOS () {
    try {
        const { data } = await axios('./data/rutina.json')
        rutina = data;
        crearTablas();
        Swal.fire({
            title: 'Rutina cargada desde JSON',
            text: 'Se ve que no tenías nada guardado en tu navegador. Hemos creado una tabla de muestra',
            icon: 'info',
            confirmButtonText: 'OK',
        });
    } catch {
        rutina = [];
    }
}

// Fetch API ejercicios. Parámetros + Call
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '16d40f4cf1mshbf396cd2ab8b39ep14cb87jsnce4b384b8a95',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};
fetch('https://exercisedb.p.rapidapi.com/exercises', options)
	.then(response => response.json())
	.then(response => {
        arrayDeEjercicios = response;
    })
	.catch(err => console.error(err));

//DOM sin jQuery --> voy a tratar de pasar todo a DOM común, sin jQuery, que parece que tiene un par de funcionalidades obsoletas.
const ejNombre = document.querySelector('#nombreDelEjericio');
const ejMusculo = document.querySelector('#musculoQueInterviene');
const ejElementos = document.querySelector('#elementosAUtilizar');
const ejZona = document.querySelector('#zonaAEstimular');
const ejGif = document.querySelector('#gifIndicaciones');
const btnExerciseQuery = document.querySelector('.btn-exercise-query');
const inputNumeroEjercicio = document.querySelector('#inputNumeroEjercicio');
const btnTranslationQuery = document.querySelector('.btn-translation-query');
const inputTranslationQuery = document.querySelector('#translation-query');
const spanTranslationResult = document.querySelector('#translation-result');
let ejercicioBuscado;

const btnAgregarSesion = document.querySelector(".btn-agregarSesion");
btnAgregarSesion.addEventListener("click", () => {
  Swal.fire({
    title: "Ingrese nombre de sesión y cantidad de ejercicios",
    html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">
        <input type="text" id="cantidadDeEjercicios" class="swal2-input" placeholder="Cantidad de Ejercicios">`,
    confirmButtonText: "Siguiente",
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const nombreDeSesion =
        Swal.getPopup().querySelector("#nombreDeSesion").value;
      const cantidadDeEjercicios = parseInt(Swal.getPopup().querySelector(
        "#cantidadDeEjercicios"
      ).value);
      if (
        !nombreDeSesion ||
        !cantidadDeEjercicios ||
        cantidadDeEjercicios > 8 ||
        cantidadDeEjercicios <= 0
      ) {
        Swal.showValidationMessage(
          `Recuerda ingresar un nombre de sesión, y que la cantidad de ejercicios debe ser mínimo 1 y máximo 8`
        );
      }
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
    },
  })
    .then(async (result) => {
      let nuevaSesion = result.value;
      for (let i = 0; i < nuevaSesion.ejercicios.length; i++) {
        await Swal.fire({
          title: `Ingrese nombre para el ejercicio N° ${i + 1}`,
          html: `<input type="text" id="ejercicio" class="swal2-input" placeholder="Nombre del ejercicio">`,
          confirmButtonText: "Siguiente",
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            let nombreDeEjercicio =
              Swal.getPopup().querySelector(`#ejercicio`).value;
            return nombreDeEjercicio;
          },
        }).then((result) => {
          nuevaSesion.ejercicios[i].nombre = result.value;
        });
      }
      return nuevaSesion;
    })
    .then(async (result) => {
      let nuevaSesion = result;
      for (let i = 0; i < nuevaSesion.ejercicios.length; i++) {
        let nro = i + 1;
        await Swal.fire({
          title: `Ingrese cantidad de series para el ejercicio N° ${nro}`,
          html: `<input type="text" id="seriesEjercicio${nro}" class="swal2-input" placeholder="Cant Series">`,
          confirmButtonText: "Siguiente",
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            const cantSeries = parseInt(Swal.getPopup().querySelector(
              `#seriesEjercicio${nro}`
            ).value);
            for (let j = 0; j < cantSeries; j++) {
              nuevaSesion.ejercicios[i].seriesBase.push([]);
            }
          },
        });
      }
      return nuevaSesion;
    })
    .then(async (result) => {
      let nuevaSesion = result;
      for (let i = 0; i < nuevaSesion.ejercicios.length; i++) {
        for (let j = 0; j < nuevaSesion.ejercicios[i].seriesBase.length; j++) {
          await Swal.fire({
            title: `Ingresá el mínimo y el máximo de repeticiones para la serie N° ${
              j + 1
            } del ejercicio ${nuevaSesion.ejercicios[i].nombre}`,
            html: `<input type="text" id="minReps" class="swal2-input" placeholder="Min">
                            <input type="text" id="maxReps" class="swal2-input" placeholder="Max">`,
            confirmButtonText: "Siguiente",
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
              const minReps = parseInt(
                Swal.getPopup().querySelector(`#minReps`).value
              );
              const maxReps = parseInt(
                Swal.getPopup().querySelector(`#maxReps`).value
              );
              nuevaSesion.ejercicios[i].seriesBase[j].push(minReps);
              nuevaSesion.ejercicios[i].seriesBase[j].push(maxReps);
            },
          });
        }
      }
      return nuevaSesion;
    })
    .then(async (result) => {
      let nuevaSesion = result;
      for (let i = 0; i < nuevaSesion.ejercicios.length; i++) {
        for (let j = 0; j < nuevaSesion.ejercicios[i].seriesBase.length; j++) {
          await Swal.fire({
            title: `Ingresá el peso (kg) a levantar para la serie N° ${
              j + 1
            } del ejercicio ${nuevaSesion.ejercicios[i].nombre}`,
            html: `<input type="text" id="peso" class="swal2-input" placeholder="Peso en kg">`,
            confirmButtonText: "Siguiente",
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
              const peso = parseInt(
                Swal.getPopup().querySelector(`#peso`).value
              );
              return peso;
            },
          }).then((result) => {
            nuevaSesion.ejercicios[i].proximosPesos.push(result.value);
          });
        }
      }
      return nuevaSesion;
    })
    .then((result) => {
      Swal.fire({
        icon: "success",
        title: "Terminaste",
        text: "Rutina creada con éxito.",
        preConfirm: () => {
          rutina.push(result);
          localStorage.setItem("rutina", JSON.stringify(rutina));
          reemplazarSesiones();
        },
      });
    });
});

const btnAgregarEjercicio = document.querySelector(".btn-agregarEjercicio");
btnAgregarEjercicio.addEventListener("click", () => {
  Swal.fire({
    title: `Ingresá el nombre del ejercicio a agregar`,
    html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre del ejercicio">`,
    confirmButtonText: "Siguiente",
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector(`#nombre`).value;
      let nuevoEjercicio = {
        nombre: nombre,
        seriesBase: [],
        seriesRealizadas: [],
        ultimosPesos: [],
        proximosPesos: [],
        proximasSeries: [],
      };
      return nuevoEjercicio;
    },
  })
    .then(async (result) => {
      let nuevoEjercicio = result.value;
      await Swal.fire({
        title: `Ingrese cantidad de series para el ejercicio ${nuevoEjercicio.nombre}`,
        html: `<input type="text" id="seriesEjercicio" class="swal2-input" placeholder="Ingresa cantidad de series">`,
        confirmButtonText: "Siguiente",
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          const cantSeries = parseInt(
            Swal.getPopup().querySelector(`#seriesEjercicio`).value
          );
          for (let i = 0; i < cantSeries; i++) {
            nuevoEjercicio.seriesBase.push([]);
          }
        },
      });
      return nuevoEjercicio;
    })
    .then(async (result) => {
      let nuevoEjercicio = result;
      for (let i = 0; i < nuevoEjercicio.seriesBase.length; i++) {
        await Swal.fire({
          title: `Ingresá el mínimo y el máximo de repeticiones para la serie ${
            i + 1
          } `,
          html: `<input type="number" id="minReps" class="swal2-input" placeholder="Min">
            <input type="number" id="maxReps" class="swal2-input" placeholder="Max">`,
          confirmButtonText: "Siguiente",
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            const minReps = parseInt(
              Swal.getPopup().querySelector(`#minReps`).value
            );
            const maxReps = parseInt(
              Swal.getPopup().querySelector(`#maxReps`).value
            );
            nuevoEjercicio.seriesBase[i].push(minReps);
            nuevoEjercicio.seriesBase[i].push(maxReps);
          },
        });
      }
      return nuevoEjercicio;
    })
    .then(async (result) => {
      let nuevoEjercicio = result;
      for (let i = 0; i < nuevoEjercicio.seriesBase.length; i++) {
        await Swal.fire({
          title: `Ingresá el peso (kg) a levantar para la serie ${i + 1}`,
          html: `<input type="number" id="peso" class="swal2-input" placeholder="Peso en kg">`,
          confirmButtonText: "Siguiente",
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            const peso = parseInt(Swal.getPopup().querySelector(`#peso`).value);
            return peso;
          },
        }).then((result) => {
          nuevoEjercicio.proximosPesos.push(result.value);
        });
      }
      return nuevoEjercicio;
    })
    .then(async (result) => {
      let nuevoEjercicio = result;
      let indiceSesion;
      await Swal.fire({
        title:
          "Ingrese nombre de la sesión a la cual querés agregar un nuevo ejercicio",
        html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">`,
        confirmButtonText: "Siguiente",
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          const nombreDeSesion =
            Swal.getPopup().querySelector("#nombreDeSesion").value;
          let indiceSesion = rutina.indexOf(
            rutina.find((sesion) => sesion.nombre == nombreDeSesion)
          );
          return indiceSesion;
        },
      }).then((result) => {
        indiceSesion = result.value;
      });
      rutina[indiceSesion].ejercicios.push(nuevoEjercicio);
    })
    .then((result) => {
      Swal.fire({
        icon: "success",
        title: "Terminaste",
        text: "Ejercicio agregado con éxito.",
        preConfirm: () => {
          localStorage.setItem("rutina", JSON.stringify(rutina));
          reemplazarSesiones();
        },
      });
    });
});

const btnAnotarRepsSesion = document.querySelector(".btn-anotarRepsSesion");
btnAnotarRepsSesion.addEventListener("click", () => {
    Swal.fire({
    title:
      "Ingrese nombre de la sesión a la cual querés agregar un nuevo ejercicio",
    html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">`,
    confirmButtonText: "Siguiente",
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const nombreDeSesion =
        Swal.getPopup().querySelector("#nombreDeSesion").value;
      let indiceSesion = rutina.indexOf(
        rutina.find((sesion) => sesion.nombre == nombreDeSesion)
      );
      return indiceSesion;
    },
  }).then( async (result) => {
    let indiceSesion = result.value;
    for (let i = 0; i < rutina[indiceSesion].ejercicios.length; i++) {
        for (let j = 0; j < rutina[indiceSesion].ejercicios[i].seriesBase.length; j++) {
            await Swal.fire({
                  title: `${rutina[indiceSesion].ejercicios[i].nombre} - Serie ${j + 1} - Reps Realizadas`,
                  html: `<input type="text" id="cantReps" class="swal2-input" placeholder="cantReps">`,
                  confirmButtonText: "Siguiente",
                  showCancelButton: true,
                  focusConfirm: false,
                  preConfirm: () => {
                    const cantReps = parseInt(Swal.getPopup().querySelector("#cantReps").value);
                    rutina[indiceSesion].ejercicios[i].seriesRealizadas.push(cantReps);
                  }
            });
        }
    }
  }).then(r => {
    Swal.fire({
        icon: "success",
        title: "Terminaste",
        text: "Series Anotadas con éxito.",
        preConfirm: () => {
          localStorage.setItem("rutina", JSON.stringify(rutina));
          reemplazarSesiones();
        },
      });
  })
});

const btnAnotarRepsUno = document.querySelector('.btn-anotarRepsx1');
btnAnotarRepsUno.addEventListener("click", () => {
    Swal.fire({
    title:
      "Ingrese nombre de la sesión del ejercicio, y el nombre del ejercicio ",
    html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">
    <input type="text" id="nombreDeEjercicio" class="swal2-input" placeholder="Nombre de Ejercicio">`,
    confirmButtonText: "Siguiente",
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const nombreDeSesion =
        Swal.getPopup().querySelector("#nombreDeSesion").value;
      const nombreDeEjercicio =
        Swal.getPopup().querySelector("#nombreDeEjercicio").value;
      let indiceSesion = rutina.indexOf(
        rutina.find((sesion) => sesion.nombre == nombreDeSesion)
      );
      let indiceEjercicio = rutina[indiceSesion].ejercicios.indexOf(
        rutina[indiceSesion].ejercicios.find((ejercicio) => ejercicio.nombre == nombreDeEjercicio)
        );
      return {indiceSesion, indiceEjercicio};
    },
  }).then( async (result) => {
    let indiceSesion = result.value.indiceSesion;
    let indiceEjercicio = result.value.indiceEjercicio;
        for (let i = 0; i < rutina[indiceSesion].ejercicios[indiceEjercicio].seriesBase.length; i++) {
            await Swal.fire({
                  title: `${rutina[indiceSesion].ejercicios[indiceEjercicio].nombre} - Serie ${i+ 1} - Reps Realizadas`,
                  html: `<input type="text" id="cantReps" class="swal2-input" placeholder="cantReps">`,
                  confirmButtonText: "Siguiente",
                  showCancelButton: true,
                  focusConfirm: false,
                  preConfirm: () => {
                    const cantReps = parseInt(Swal.getPopup().querySelector("#cantReps").value);
                    rutina[indiceSesion].ejercicios[indiceEjercicio].seriesRealizadas.push(cantReps);
                  }
            });
    }
  }).then(r => {
    Swal.fire({
        icon: "success",
        title: "Terminaste",
        text: "Series Anotadas con éxito.",
        preConfirm: () => {
          localStorage.setItem("rutina", JSON.stringify(rutina));
          reemplazarSesiones();
        },
      });
  })
});

const btnProxSesion = document.querySelector('.btn-generarProximaSesion');
btnProxSesion.addEventListener('click', () => {
    Swal.fire({
        title:
          "Ingrese nombre de la sesión de la cual quieras generar próximos pesos y repeticiones",
        html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">`,
        confirmButtonText: "Siguiente",
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          const nombreDeSesion =
            Swal.getPopup().querySelector("#nombreDeSesion").value;
          let indiceSesion = rutina.indexOf(
            rutina.find((sesion) => sesion.nombre == nombreDeSesion)
          );
          return indiceSesion;
        },
      }).then( (result) => {
        let indiceSesion = result.value;
        equipararUltimosPesosConProximos(indiceSesion);
        actualizarPesos(indiceSesion);
        actualizarSeries(indiceSesion);
        Swal.fire({
            icon: "success",
            title: "Terminaste",
            text: "Series y pesos de la sesión indicada actualizados con éxito.",
            preConfirm: () => {
                localStorage.setItem("rutina", JSON.stringify(rutina));
                reemplazarSesiones();
            },
            });
    });
})

const btnProxSesionUno = document.querySelector('.btn-generarProximaSesionx1');
btnProxSesionUno.addEventListener('click', () => {
  Swal.fire({
    title:
      "Ingrese nombre de la sesión del ejercicio, y el nombre del ejercicio ",
    html: `<input type="text" id="nombreDeSesion" class="swal2-input" placeholder="Nombre de Sesión">
    <input type="text" id="nombreDeEjercicio" class="swal2-input" placeholder="Nombre de Ejercicio">`,
    confirmButtonText: "Siguiente",
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const nombreDeSesion =
        Swal.getPopup().querySelector("#nombreDeSesion").value;
      const nombreDeEjercicio =
        Swal.getPopup().querySelector("#nombreDeEjercicio").value;
      let indiceSesion = rutina.indexOf(
        rutina.find((sesion) => sesion.nombre == nombreDeSesion)
      );
      let indiceEjercicio = rutina[indiceSesion].ejercicios.indexOf(
        rutina[indiceSesion].ejercicios.find((ejercicio) => ejercicio.nombre == nombreDeEjercicio)
        );
      return {indiceSesion, indiceEjercicio};
    },
  }).then( (result) => {
    let indiceSesion = result.value.indiceSesion;
    let indiceEjercicio = result.value.indiceEjercicio;
    equipararUltimosPesosConProximosUnicoEjercicio(indiceSesion, indiceEjercicio)
    actualizarPesosUnicoEjercicio(indiceSesion, indiceEjercicio)
    actualizarSeriesUnicoEjercicio(indiceSesion, indiceEjercicio)
    Swal.fire({
        icon: "success",
        title: "Terminaste",
        text: "Series y pesos del ejercicio indicado actualizados con éxito.",
        preConfirm: () => {
            localStorage.setItem("rutina", JSON.stringify(rutina));
            reemplazarSesiones();
        },
        });
  })
})

const btnEliminarSesion = document.querySelector('.btn-eliminarSesion');
btnEliminarSesion.addEventListener('click', () => {
  Swal.fire({
    title:'Ingrese el nombre de la sesión que quiere borrar',
    html:`<input class="swal2-input" type="text" id="nombreDeSesion" placeholder="Nombre de sesión"></input>`,
    confirmButtonText: 'Siguiente',
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const nombreDeSesion = Swal.getPopup().querySelector('#nombreDeSesion').value;
      let indiceSesion = rutina.indexOf(rutina.find(sesion => {sesion.nombre == nombreDeSesion}))
      return indiceSesion;
    }
  }).then(result => {
    let indiceSesion = result.value
    rutina.splice(indiceSesion, 1);
    Swal.fire({
      icon: "success",
      title: "Terminaste",
      text: "Series y pesos del ejercicio indicado actualizados con éxito.",
      preConfirm: () => {
          localStorage.setItem("rutina", JSON.stringify(rutina));
          reemplazarSesiones();
      },
      });
  });
});

const btnEliminarEjercicio = document.querySelector('.btn-eliminarEjercicio');
btnEliminarEjercicio.addEventListener('click', () => {
  Swal.fire({
    title:'Ingrese el nombre de la Sesión a la que pertenece el ejercicio que quiere borrar, y luego el nombre del ejercicio a eliminar',
    html:`<input type="text "class="swal2-input" id="nombreDeSesion" placeholder="Nombre de Sesión" ></input>
    <input type="text "class="swal2-input" id="nombreDeEjercicio" placeholder="nombreDeEjercicio" ></input>`,
    confirmButtonText: 'Siguiente',
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const nombreDeSesion = Swal.getPopup().querySelector('#nombreDeSesion').value;
      const nombreDeEjercicio = Swal.getPopup().querySelector('#nombreDeEjercicio').value;
      let indiceDeSesion = rutina.indexOf(rutina.find(sesion => sesion.nombre == nombreDeSesion));
      let indiceDeEjercicio = rutina[indiceDeSesion].ejercicios.indexOf(rutina[indiceDeSesion].ejercicios.find(ejercicio => ejercicio.nombre == nombreDeEjercicio));
      return {indiceDeSesion, indiceDeEjercicio};
    }
  }).then(result => {
    let indiceDeSesion = result.value.indiceDeSesion;
    let indiceDeEjercicio = result.value.indiceDeEjercicio;
    rutina[indiceDeSesion].ejercicios.splice(indiceDeEjercicio, 1);
    Swal.fire({
      title:'Listo',
      icon: 'success',
      text: 'Ejercicio eliminado exitosamente',
      preConfirm: () => {
        localStorage.setItem('rutina', JSON.stringify(rutina));
        reemplazarSesiones();
      }
    })
  })
})

const btnBorrarRutina = document.querySelector('.btn-borrarRutina');
btnBorrarRutina.addEventListener('click', () => {
  Swal.fire({
    title: 'Estás segur@?',
    text: "Una vez que elmines la rutina completa no podrás revertir este paso",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar la rutina'
  }).then((result) => {
    if (result.isConfirmed) {
      rutina = [];
      localStorage.removeItem('rutina');
      borrarTablas();
      Swal.fire(
        'Atención',
        'Has eliminado la rutina completa',
        'info'
      )
    }
  })
})

/*FUNCIONES CALCULOS*/
function equipararUltimosPesosConProximos(num) {
    rutina[num].ejercicios.forEach((ejercicio) => {
        ejercicio.ultimosPesos = ejercicio.proximosPesos;
    })
}
function actualizarPesos(num) {
    rutina[num].ejercicios.forEach((ejercicio) => {
        let nuevosPesos = [];
        ejercicio.seriesRealizadas.forEach((serie, i) =>{
            serie>=ejercicio.seriesBase[i][1]?nuevosPesos.push(ejercicio.ultimosPesos[i] + 5):nuevosPesos.push(ejercicio.ultimosPesos[i])  
        })
        ejercicio.proximosPesos = nuevosPesos;
    })
}
function actualizarSeries(num) {
    rutina[num].ejercicios.forEach((ejercicio) => {
        let nuevasSeries = [];
        ejercicio.seriesRealizadas.forEach((serie, i) => {
            if (serie>=ejercicio.seriesBase[i][1]) {
                nuevasSeries.push(ejercicio.seriesBase[i]);
            } else {
                let nuevoRangoDeSeries = [];
                nuevoRangoDeSeries.push(serie, ejercicio.seriesBase[i][1]);
                nuevasSeries.push(nuevoRangoDeSeries);
            }
        })
        ejercicio.proximasSeries = nuevasSeries;
    })
}

function equipararUltimosPesosConProximosUnicoEjercicio(sesion, ejercicio) {
    rutina[sesion].ejercicios[ejercicio].ultimosPesos =rutina[sesion].ejercicios[ejercicio].proximosPesos;
}
function actualizarPesosUnicoEjercicio(sesion, ejercicio) {
    let nuevosPesos = [];
    rutina[sesion].ejercicios[ejercicio].seriesRealizadas.forEach((serie, i) =>{
        serie>=rutina[sesion].ejercicios[ejercicio].seriesBase[i][1]?nuevosPesos.push(rutina[sesion].ejercicios[ejercicio].ultimosPesos[i] + 5): nuevosPesos.push(rutina[sesion].ejercicios[ejercicio].ultimosPesos[i])
        })
        rutina[sesion].ejercicios[ejercicio].proximosPesos = nuevosPesos;
}
function actualizarSeriesUnicoEjercicio(sesion, ejercicio) {
    let nuevasSeries = [];
    rutina[sesion].ejercicios[ejercicio].seriesRealizadas.forEach((serie, i) => {
            if (serie>=rutina[sesion].ejercicios[ejercicio].seriesBase[i][1]) {
                nuevasSeries.push(rutina[sesion].ejercicios[ejercicio].seriesBase[i]);
            } else {
                let nuevoRangoDeSeries = [];
                nuevoRangoDeSeries.push(serie, rutina[sesion].ejercicios[ejercicio].seriesBase[i][1]);
                nuevasSeries.push(nuevoRangoDeSeries);
            }
        })
        rutina[sesion].ejercicios[ejercicio].proximasSeries = nuevasSeries;
}

// Input number tester - Declaración  + Call
function filtrarInput(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach((event) => {
      textbox.addEventListener(event, function(e) {
        if (inputFilter(this.value)) {
          // Accepted value
          if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
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

  filtrarInput(document.getElementById("inputNumeroEjercicio"), (value) => {
    return /^\d*\.?\d*$/.test(value); // Permitir solo números
  }, "Recordá ingresar números entre 1 y 1326");


// Translate API function & request setup
async function requestTranslation () {
    try {
        let mensajeATraducir = inputTranslationQuery.value;
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", mensajeATraducir);
        encodedParams.append("target", "es");
        encodedParams.append("source", "en");
        const translateOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '16d40f4cf1mshbf396cd2ab8b39ep14cb87jsnce4b384b8a95',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: encodedParams
        };

        const traduccionObj = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', translateOptions);
        const data = await traduccionObj.json()
        let traduccion = data.data.translations[0].translatedText;
        spanTranslationResult.innerText = `"${traduccion}"`;
    } catch {
        (err => console.error(err));
    } 
}

/*FUNCIONES RENDER TABLA*/
function crearTablas() {
    rutina.forEach((sesion, i) => {
    const tablaDeSesion = document.createElement('table')
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
            let proximosPesosUnidos = ejercicio.proximosPesos.join(" - ")
            let seriesBaseTD = document.createElement('td')
            let seriesBaseUL = document.createElement('ul')
            ejercicio.seriesBase.forEach((serie, i) => {
            let seriesBaseLI = document.createElement('li')
            seriesBaseLI.innerText = serie.join(" - ");
            seriesBaseUL.append(seriesBaseLI);
            })
            seriesBaseTD.append(seriesBaseUL)
            let proximasSeriesTD = document.createElement('td')
            let proximasSeriesUL = document.createElement('ul')
            ejercicio.proximasSeries.forEach((serie, i) => {
            let proximasSeriesLI = document.createElement('li')
            proximasSeriesLI.innerText = serie.join(" - ");
            proximasSeriesUL.append(proximasSeriesLI);
            })
            proximasSeriesTD.append(proximasSeriesUL)
            const nuevoEjercicio = document.createElement('tr')
            nuevoEjercicio.innerHTML = `
            <td>${ejercicio.nombre}</td>
            <td>${ejercicio.seriesBase.length}</td>
            <td>${ultimosPesosUnidos}</td>
            <td>${seriesRealizadasUnidas}</td>
            <td>${proximosPesosUnidos}</td>`
            nuevoEjercicio.insertBefore(seriesBaseTD, nuevoEjercicio.children[2]);
            nuevoEjercicio.insertBefore(proximasSeriesTD, nuevoEjercicio.children[5]);
            tablaDeSesion.append(nuevoEjercicio)  
        })
        $('.routine-container').append(tablaDeSesion);
    });
};
// CALLBACK - //Borra visualmente, y renderiza de nuevo todas las tablas.
function reemplazarSesiones() {
    borrarTablas()
    crearTablas()
}
//Borra del array. Actualiza storage. No renderiza // NO BUTTON - CALLBACK  de borrarRutina() //Solamente borra visualmente las tablas.
function borrarTablas() {
    const todasLasTablas = document.querySelectorAll('table');
    todasLasTablas.forEach((table) => {
        table.remove()
    });
}
//EVENTOS - Panel Principal
const btnAbout = document.querySelector('.btn-about')
btnAbout.addEventListener('click', () => {
  introJs().setOptions({
      disableInteraction: true,
      exitOnOverlayClick: false,
    }).start();
})
//Darkmode
const btnDarkMode = document.querySelector('#darkmode-toggle');
btnDarkMode.addEventListener('change', () => {
  document.querySelector('body').classList.toggle("darkBC");
})
//EVENTOS Exercise API
btnExerciseQuery.addEventListener('click', () => {
  idEjercicio = inputNumeroEjercicio.value - 1;
  ejercicioBuscado = arrayDeEjercicios[parseInt(idEjercicio)]
  ejNombre.innerText = ejercicioBuscado.name;
  ejMusculo.innerText = ejercicioBuscado.bodyPart;
  ejElementos.innerText = ejercicioBuscado.equipment;
  ejZona.innerText = ejercicioBuscado.target;
  ejGif.src = ejercicioBuscado.gifUrl;
})

inputNumeroEjercicio.addEventListener('keydown',  (e) => {
      if (e.key === "Enter") {
        idEjercicio = inputNumeroEjercicio.value - 1;
        ejercicioBuscado = arrayDeEjercicios[parseInt(idEjercicio)]
        ejNombre.innerText = ejercicioBuscado.name;
        ejMusculo.innerText = ejercicioBuscado.bodyPart;
        ejElementos.innerText = ejercicioBuscado.equipment;
        ejZona.innerText = ejercicioBuscado.target;
        ejGif.src = ejercicioBuscado.gifUrl;
      }
})

//EVENTOS Translate API
btnTranslationQuery.addEventListener('click', () => {
  requestTranslation();
})
inputTranslationQuery.addEventListener('keydown',  (e) => {
  if (e.key === "Enter") {
      requestTranslation();
  }
})