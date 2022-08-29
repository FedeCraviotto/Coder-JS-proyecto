const ejNombre = document.querySelector('#nombreDelEjericio');
const ejMusculo = document.querySelector('#musculoQueInterviene');
const ejElementos = document.querySelector('#elementosAUtilizar');
const ejZona = document.querySelector('#zonaAEstimular');
const ejGif = document.querySelector('#gifIndicaciones');
const btnExerciseQuery = document.querySelector('.btn-exercise-query');
const inputNumeroEjercicio = document.querySelector('#inputNumeroEjercicio');
const btnExerciseAbout = document.querySelector('.btn-exercise-about');

let idEjercicio;
let arrayDeEjercicios;
let ejercicioBuscado;


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
        console.log(response)
        arrayDeEjercicios = response;
    })
	.catch(err => console.error(err));
    
btnExerciseQuery.addEventListener('click', async () => {
    idEjercicio = inputNumeroEjercicio.value;
    ejercicioBuscado = arrayDeEjercicios[parseInt(idEjercicio)]
    ejNombre.innerText = ejercicioBuscado.name;
    ejMusculo.innerText = ejercicioBuscado.bodyPart;
    ejElementos.innerText = ejercicioBuscado.equipment;
    ejZona.innerText = ejercicioBuscado.target;
    ejGif.src = ejercicioBuscado.gifUrl;
})
inputNumeroEjercicio.addEventListener('keydown',  (e) => {
        if (e.key === "Enter") {
          idEjercicio = inputNumeroEjercicio.value;
          ejercicioBuscado = arrayDeEjercicios[parseInt(idEjercicio)]
          ejNombre.innerText = ejercicioBuscado.name;
          ejMusculo.innerText = ejercicioBuscado.bodyPart;
          ejElementos.innerText = ejercicioBuscado.equipment;
          ejZona.innerText = ejercicioBuscado.target;
          ejGif.src = ejercicioBuscado.gifUrl;
        }
})

btnExerciseAbout.addEventListener('click', () => {
    introJs().setOptions({
        disableInteraction: true,
        exitOnOverlayClick: false,
      }).start();
})


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
  }, "Recordá ingresar números entre 0001 y 1327");