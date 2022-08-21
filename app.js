let rutina;
if (localStorage.getItem('rutina')){
    rutina = JSON.parse(localStorage.getItem('rutina'));
    crearTablas()
} else {
    rutina = [];
}

const bodyElem = document.querySelector('body');
const darkmodeCheckbox = document.querySelector('#darkmode-toggle');
darkmodeCheckbox.addEventListener('change', () => {
        bodyElem.classList.toggle("darkBC");
})

const aboutCuadro = document.querySelector('#aboutCuadro');
const btnAbout = document.querySelector('.btn-about');
btnAbout.addEventListener('click', () => {
    if (aboutCuadro.classList.contains('hidden')) {
        aboutCuadro.classList.remove('hidden')
    } else {
        aboutCuadro.classList.add('hidden')
    }
})

const btnAnotarRepsSesion = document.querySelector('.btn-anotarRepsSesion');
btnAnotarRepsSesion.addEventListener('click', () => {
        anotarRepeticionesDeTodaUnaSesion();
})

const btngenerarProximaSesion = document.querySelector('.btn-generarProximaSesion');
btngenerarProximaSesion.addEventListener('click', () => {
    generarProximaSesionCompleta();
    
})

const btnGenerarProximaSesionx1 = document.querySelector('.btn-generarProximaSesionx1');
btnGenerarProximaSesionx1.addEventListener('click', () => {
    generarProximaSesionUnicoEjercicio();
})


const btnAgregarEjercicio = document.querySelector('.btn-agregarEjercicio');
btnAgregarEjercicio.addEventListener('click', () => {
    agregarEjercicio();
});


const btnAnotarRepsx1 = document.querySelector('.btn-anotarRepsx1');
btnAnotarRepsx1.addEventListener('click', () => {
    anotarRepsSoloUno();
})


const btnEliminarEjercicio = document.querySelector('.btn-eliminarEjercicio');
btnEliminarEjercicio.addEventListener('click', () => {
    eliminarEjercicio();
})

const btnEliminarSesion = document.querySelector('.btn-eliminarSesion');
btnEliminarSesion.addEventListener('click', () => {
    eliminarSesion();
})

const btnBorrarRutina = document.querySelector('.btn-borrarRutina');
btnBorrarRutina.addEventListener('click', () => {
    borrarRutina();
})


const botonAgregarSesion = document.querySelector('.btn-agregarSesion');
botonAgregarSesion.addEventListener('click', () => {
    agregarSesion()
});

let nombreDeSesionIngresado = ""; 
let numeroDeSesionIngresada = 0;
let nombreDeEjercicioIngresado = "";
let numeroDeEjercicioIngresado = 0;
let modalContainer = document.querySelector('.modal-container')
let modalPadre = document.querySelector('.modal')

// Le pongo valor 2 para probar, tiene que quedar sin inicializar

// let nuevaSesion ={
//     nombre:"Lunes",
//     ejercicios: [
//         { 
//             nombre:"Jalon",
//             seriesBase:[[8,12], [8,12]],
//             seriesRealizadas:[],
//             ultimosPesos:[],
//             proximosPesos: [30, 35],
//             proximasSeries:[]
//         },
//         { 
//             nombre:"Remo",
//             seriesBase:[[6,9], [6,9], [7,10]],
//             seriesRealizadas:[],
//             ultimosPesos:[],
//             proximosPesos: [40, 55, 60],
//             proximasSeries:[]
//         }
//     ]
// };
// let cantidadEjercicios = 2;

let cantidadEjercicios;
let nuevaSesion;
let btnContinuar1;
let btnContinuar2;
let btnContinuar3;
let btnContinuar4;
let btnContinuar5;
let btnContinuar6;
let nuevoEjercicio;

function agregarBotonClose () {
    let botonClose = document.createElement('button');
    botonClose.setAttribute('class', 'btn close');
    botonClose.textContent = 'X';
    modalPadre.append(botonClose);
    const btnClose = document.querySelector('.close');
    btnClose.addEventListener('click', () => {
        //Setea la sesión a cero
        nuevaSesion = undefined;
        modalPadre.innerHTML = ""
        //Sube el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300)
        //Pantalla gris
        setTimeout(function(){
            modalContainer.classList.toggle('container-hidden');}, 600)
    })    
}

function agregarSesion() {
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    let nuevoParrafo2 = document.createElement('p');
    let nuevoInput2 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion`
    nuevoInput1.setAttribute('id',`input-nombreSesion`)
    nuevoParrafo2.textContent = `Ingrese la cantidad de ejercicios para esta sesion`
    nuevoInput2.setAttribute('id',`input-cantidadDeEjercicios`)
    agregarBotonClose()
    modalPadre.append(nuevoParrafo1)
    modalPadre.append(nuevoInput1)
    modalPadre.append(nuevoParrafo2)
    modalPadre.append(nuevoInput2)
    // Creo el boton y lo agrego
    btnContinuar1 = document.createElement('button');
    btnContinuar1.setAttribute('type', 'submit');
    btnContinuar1.setAttribute('class', 'btn btn-continuar1');
    btnContinuar1.textContent='Continuar';
    modalPadre.append(btnContinuar1);
    //Pantalla gris
    setTimeout(function(){
        modalContainer.classList.toggle('container-hidden');}, 300)
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300)
        
    btnContinuar1.addEventListener('click', () => {
        
        let nombreSesionPorInput = document.getElementById('input-nombreSesion');
        console.log(nombreSesionPorInput.value);
        nuevaSesion ={
            nombre:nombreSesionPorInput.value,
            ejercicios: []
        };
        
        let cantidadEjerciciosPorInput = document.getElementById('input-cantidadDeEjercicios');
        cantidadEjercicios = parseInt(cantidadEjerciciosPorInput.value);

        modalPadre.innerHTML = ""; //Creo los inputs y los agrego
        agregarBotonClose()
        for (let i=1; i<=cantidadEjercicios; i++) {
        let nuevoParrafo = document.createElement('p');
        let nuevoInput = document.createElement('input');
        nuevoInput.setAttribute('id',`inputNombreEjercicio${i}`)
        nuevoParrafo.textContent = `Ingrese el nombre para el ejercicio ${i}`
        modalPadre.append(nuevoParrafo)
        modalPadre.append(nuevoInput)
    } // Creo el boton y lo agrego
    btnContinuar2 = document.createElement('button');
    btnContinuar2.setAttribute('type', 'submit');
    btnContinuar2.setAttribute('class', 'btn btn-continuar2');
    btnContinuar2.textContent='Continuar';
    modalPadre.append(btnContinuar2);
    
    //Sube el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');})
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300);
        
        
    //La persona llena el contenido
    // Toca en Continuar 
    btnContinuar2.addEventListener('click', () => {
            for (let i=1; i<=cantidadEjercicios; i++) {
            const inputValue = document.getElementById(`inputNombreEjercicio${i}`)            
            nuevaSesion.ejercicios.push(
                { //Se agregan los datos a la nuevaSesion
                    nombre:inputValue.value,
                    seriesBase:[],
                    seriesRealizadas:[],
                    ultimosPesos:[],
                    proximosPesos: [],
                    proximasSeries:[]
                }
                );
            }
            
        //Blanqueo el modal
        modalPadre.innerHTML = ""
        agregarBotonClose()
        for (let i=0; i<nuevaSesion.ejercicios.length; i++) {
            let nuevoParrafo = document.createElement('p');
            let nuevoInput = document.createElement('input');
            nuevoInput.setAttribute('id',`inputCantidadDeSeriesEjercicio${i+1}`)
            nuevoParrafo.textContent = `Ingrese cantidad de series para el ejercicio ${i+1}`
            modalPadre.append(nuevoParrafo)
            modalPadre.append(nuevoInput)
            
        }
        btnContinuar3 = document.createElement('button');
        btnContinuar3.setAttribute('type', 'submit');
        btnContinuar3.setAttribute('class', 'btn btn-continuar3');
        btnContinuar3.textContent='Continuar';
        modalPadre.append(btnContinuar3);  
        //Sube el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');})
        //Baja el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300)
            //La persona llena el contenido (cant series x Ejercicio del array ejercicios, del objeto nuevaSerie)
            // Toca en Continuar 
            btnContinuar3.addEventListener('click', () => {
                    for (let i=0; i<nuevaSesion.ejercicios.length; i++) {
                        const inputValue = parseInt(document.getElementById
                            (`inputCantidadDeSeriesEjercicio${i+1}`).value)        
                        for (let j=1; j<=inputValue; j++) {
                            nuevaSesion.ejercicios[i].seriesBase.push([]);
                        }
                    }
                    
                    
        //Blanqueo el modal
        modalPadre.innerHTML = ""
        agregarBotonClose()
        for (let i=0; i<nuevaSesion.ejercicios.length; i++) {
            for (let j=0; j<nuevaSesion.ejercicios[i].seriesBase.length; j++) {
                //Por cada serie creo los input para reps min/max
                let nuevoParrafoMin = document.createElement('p');
                let nuevoInputMin = document.createElement('input');
                let nuevoParrafoMax = document.createElement('p');
                let nuevoInputMax = document.createElement('input');
                nuevoInputMin.setAttribute('id',`inputEj${i+1}Serie${j+1}Min`)
                nuevoParrafoMin.textContent = `${nuevaSesion.ejercicios[i].nombre} - Serie ${j+1} Reps Min.`
                nuevoInputMax.setAttribute('id',`inputEj${i+1}Serie${j+1}Max`)
                nuevoParrafoMax.textContent = `${nuevaSesion.ejercicios[i].nombre} - Serie ${j+1} Reps Max.`
                modalPadre.append(nuevoParrafoMin)
                modalPadre.append(nuevoInputMin)
                modalPadre.append(nuevoParrafoMax)
                modalPadre.append(nuevoInputMax)
                
            }
        }
                btnContinuar4 = document.createElement('button');
                btnContinuar4.setAttribute('type', 'submit');
                btnContinuar4.setAttribute('class', 'btn btn-continuar4');
                btnContinuar4.textContent='Continuar';
                modalPadre.append(btnContinuar4);
                //Sube el modal
                setTimeout(function(){
                    modalPadre.classList.toggle('modal-close');})
                //Baja el modal
                setTimeout(function(){
                    modalPadre.classList.toggle('modal-close');}, 300);
                    
                    //La persona llena el contenido (Repeticiones Minimas y maximas de cada serie, de cada ejercicio de la sesion)
                    // Toca en Continuar 
                    btnContinuar4.addEventListener('click', () => {
    
    for (let i=0; i<nuevaSesion.ejercicios.length; i++) {
        for (let j=0; j<nuevaSesion.ejercicios[i].seriesBase.length; j++) {
            let inputValueMin = parseInt(document.getElementById
                (`inputEj${i+1}Serie${j+1}Min`).value);
                let inputValueMax = parseInt(document.getElementById
                    (`inputEj${i+1}Serie${j+1}Max`).value);      
                    nuevaSesion.ejercicios[i].seriesBase[j].push(inputValueMin);
                    nuevaSesion.ejercicios[i].seriesBase[j].push(inputValueMax);
                }
            }
            
            
        //Blanqueo el modal
        modalPadre.innerHTML = ""
        agregarBotonClose()
        for (let i=0; i<nuevaSesion.ejercicios.length; i++) {
            for (let j=0; j<nuevaSesion.ejercicios[i].seriesBase.length; j++) {
                let nuevoParrafo = document.createElement('p');
            let nuevoInput = document.createElement('input');
            nuevoInput.setAttribute('id',`inputPesoSerie${j+1}Ejercicio${i+1}`)
            nuevoParrafo.textContent = `${nuevaSesion.ejercicios[i].nombre} -Serie ${j+1} - Peso a levantar (en kg)`
            modalPadre.append(nuevoParrafo)
            modalPadre.append(nuevoInput)
            
        }
    }
        btnContinuar5 = document.createElement('button');
        btnContinuar5.setAttribute('type', 'submit');
        btnContinuar5.setAttribute('class', 'btn btn-continuar5');
        btnContinuar5.textContent='Continuar';
        modalPadre.append(btnContinuar5);
        //Sube el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');})
        //Baja el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300)
            //La persona llena el contenido (Series Minimas y maximas de cada ejercicio de la sesion)
            // Toca en Continuar 
            btnContinuar5.addEventListener('click', () => {
                    for (let i=0; i<nuevaSesion.ejercicios.length; i++) {
                        for (let j=0; j<nuevaSesion.ejercicios[i].seriesBase.length; j++) {
                            let inputValue = parseInt(document.getElementById
                (`inputPesoSerie${j+1}Ejercicio${i+1}`).value)       
                nuevaSesion.ejercicios[i].proximosPesos.push(inputValue);
            }
        }
        
        //blanqueo el modal
        modalPadre.innerHTML = ""
        let ultimoParrafo = document.createElement('p');
        ultimoParrafo.textContent = 'Sesión creada con éxito'
        modalPadre.append(ultimoParrafo);
        btnContinuar6 = document.createElement('button');
        btnContinuar6.setAttribute('type', 'submit');
        btnContinuar6.setAttribute('class', 'btn btn-continuar6');
        btnContinuar6.textContent='Finalizar';
        modalPadre.append(btnContinuar6);
        //Sube el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');})
        //Baja el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300)
            // Toca en Continuar 
            btnContinuar6.addEventListener('click', () => {
                setTimeout(function(){
                    modalPadre.classList.toggle('modal-close');
                    setTimeout(function(){
                        modalContainer.classList.toggle('container-hidden');
                    }, 300)
                }, 300)
                
                rutina.push(nuevaSesion);
                console.log(rutina)
                localStorage.setItem('rutina', JSON.stringify(rutina));
                reemplazarSesiones();
                modalPadre.innerHTML = ""
            })
        })
        })
        })
    })
    })
}


function agregarEjercicio() {
//Creo los elementos del modal para pedir el numero de sesion en el cual crear el ejercicio
let nuevoParrafo1 = document.createElement('p');
let nuevoInput1 = document.createElement('input');
nuevoParrafo1.textContent = `Ingrese el nombre de sesion en el cual vas a agregar el ejercicio`
nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
agregarBotonClose()
modalPadre.append(nuevoParrafo1)
modalPadre.append(nuevoInput1)
// Creo el boton y lo agrego
btnContinuar1 = document.createElement('button');
btnContinuar1.setAttribute('type', 'submit');
btnContinuar1.setAttribute('class', 'btn btn-continuar1');
btnContinuar1.textContent='Continuar';
modalPadre.append(btnContinuar1);
//Pantalla gris
setTimeout(function(){
    modalContainer.classList.toggle('container-hidden');}, 300)
//Baja el modal
setTimeout(function(){
    modalPadre.classList.toggle('modal-close');}, 300)
    
btnContinuar1.addEventListener('click', () => {
    
    let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
    nombreDeSesionIngresado = nombreSesionPorInput.value;
    console.log(nombreDeSesionIngresado)
    rutina.forEach((sesion, i) => {
        if (sesion.nombre==nombreDeSesionIngresado) {
            numeroDeSesionIngresada = i;
        }
    })
    console.log(numeroDeSesionIngresada)
    modalPadre.innerHTML = ""; //Creo los inputs y los agrego
    agregarBotonClose()
    let nuevoParrafoNombreEj = document.createElement('p');
    let nuevoInputNombreEj = document.createElement('input');
    nuevoInputNombreEj.setAttribute('id',`inputNombreEjercicio`)
    nuevoParrafoNombreEj.textContent = `Ingrese el nombre para el ejercicio`
    modalPadre.append(nuevoParrafoNombreEj)
    modalPadre.append(nuevoInputNombreEj) 
    // Creo el boton y lo agrego
    btnContinuar2 = document.createElement('button');
    btnContinuar2.setAttribute('type', 'submit');
    btnContinuar2.setAttribute('class', 'btn btn-continuar2');
    btnContinuar2.textContent='Continuar';
    modalPadre.append(btnContinuar2);

//Sube el modal
setTimeout(function(){
    modalPadre.classList.toggle('modal-close');})
//Baja el modal
setTimeout(function(){
    modalPadre.classList.toggle('modal-close');}, 300);
     
    // Toca en Continuar 
    btnContinuar2.addEventListener('click', () => {
        const inputValue = document.getElementById(`inputNombreEjercicio`)            
        nuevoEjercicio ={
        nombre:inputValue.value,
        seriesBase:[],
        seriesRealizadas:[],
        ultimosPesos:[],
        proximosPesos: [],
        proximasSeries:[]
    }
    console.log(nuevoEjercicio)
    
    //Blanqueo el modal
    modalPadre.innerHTML = "";
    agregarBotonClose();
    let nuevoParrafo = document.createElement('p');
    let nuevoInput = document.createElement('input');
    nuevoInput.setAttribute('id',`inputQSeries`)
    nuevoParrafo.textContent = `Ingrese cantidad de series para el ejercicio`
    modalPadre.append(nuevoParrafo)
    modalPadre.append(nuevoInput)
    
    
    btnContinuar3 = document.createElement('button');
    btnContinuar3.setAttribute('type', 'submit');
    btnContinuar3.setAttribute('class', 'btn btn-continuar3');
    btnContinuar3.textContent='Continuar';
    modalPadre.append(btnContinuar3);  
    //Sube el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');})
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300)
    //La persona llena el contenido (cant series del Ejercicio nuevo)
    // Toca en Continuar 
    btnContinuar3.addEventListener('click', () => {

    let inputValue = parseInt(document.getElementById(`inputQSeries`).value)
    console.log(inputValue);       
    for (let i=1; i<=inputValue; i++) {
        nuevoEjercicio.seriesBase.push([]);    
    }

    //Blanqueo el modal
    modalPadre.innerHTML = ""
    agregarBotonClose()
for (let i=0; i<nuevoEjercicio.seriesBase.length; i++) {
    //Por cada serie creo los input para reps min/max
    let nuevoParrafoMin = document.createElement('p');
    let nuevoInputMin = document.createElement('input');
    let nuevoParrafoMax = document.createElement('p');
    let nuevoInputMax = document.createElement('input');
    nuevoInputMin.setAttribute('id',`inputSerie${i+1}Min`)
    nuevoParrafoMin.textContent = `Serie ${i+1} Reps Min.`
    nuevoInputMax.setAttribute('id',`inputSerie${i+1}Max`)
    nuevoParrafoMax.textContent = `Serie ${i+1} Reps Max.`
    modalPadre.append(nuevoParrafoMin)
    modalPadre.append(nuevoInputMin)
    modalPadre.append(nuevoParrafoMax)
    modalPadre.append(nuevoInputMax)
}
    btnContinuar4 = document.createElement('button');
    btnContinuar4.setAttribute('type', 'submit');
    btnContinuar4.setAttribute('class', 'btn btn-continuar4');
    btnContinuar4.textContent='Continuar';
    modalPadre.append(btnContinuar4);
//Sube el modal
setTimeout(function(){
    modalPadre.classList.toggle('modal-close');})
//Baja el modal
setTimeout(function(){
    modalPadre.classList.toggle('modal-close');}, 300);
    
    //La persona llena el contenido (Repeticiones Minimas y maximas de cada serie, del nuevo Ejercicio)
    // Toca en Continuar 
    btnContinuar4.addEventListener('click', () => {

for (let i=0; i<nuevoEjercicio.seriesBase.length; i++) {
    let inputValueMin = parseInt(document.getElementById
    (`inputSerie${i+1}Min`).value);
    let inputValueMax = parseInt(document.getElementById
        (`inputSerie${i+1}Max`).value);      
        nuevoEjercicio.seriesBase[i].push(inputValueMin);
        nuevoEjercicio.seriesBase[i].push(inputValueMax);
    }

    //Blanqueo el modal
    modalPadre.innerHTML = ""
    agregarBotonClose()
                    
for (let i=0; i<nuevoEjercicio.seriesBase.length; i++) {
    let nuevoParrafo = document.createElement('p');
    let nuevoInput = document.createElement('input');
    nuevoInput.setAttribute('id',`inputPesoSerie${i+1}`)
    nuevoParrafo.textContent = `Serie ${i+1} - Peso a levantar (en kg)`
    modalPadre.append(nuevoParrafo)
    modalPadre.append(nuevoInput)
                                    
    }
    btnContinuar5 = document.createElement('button');
    btnContinuar5.setAttribute('type', 'submit');
    btnContinuar5.setAttribute('class', 'btn btn-continuar5');
    btnContinuar5.textContent='Continuar';
    modalPadre.append(btnContinuar5);
    //Sube el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');})
        //Baja el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300)
            //La persona llena el contenido (Series Minimas y maximas de cada ejercicio de la sesion)
            // Toca en Continuar 
            btnContinuar5.addEventListener('click', () => {
                
                for (let i=0; i<nuevoEjercicio.seriesBase.length; i++) {
                    let inputValue = parseInt(document.getElementById
                        (`inputPesoSerie${i+1}`).value)       
                        nuevoEjercicio.proximosPesos.push(inputValue);
                    }
                    
                    //blanqueo el modal
                    modalPadre.innerHTML = ""
                    let ultimoParrafo = document.createElement('p');
                    ultimoParrafo.textContent = 'Ejercicio creado con éxito'
                    modalPadre.append(ultimoParrafo);
                    btnContinuar6 = document.createElement('button');
                    btnContinuar6.setAttribute('type', 'submit');
                    btnContinuar6.setAttribute('class', 'btn btn-continuar6');
    btnContinuar6.textContent='Finalizar';
    modalPadre.append(btnContinuar6);
    //Sube el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');})
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300)
        // Toca en Continuar 
        btnContinuar6.addEventListener('click', () => {
            setTimeout(function(){
                modalPadre.classList.toggle('modal-close');
                setTimeout(function(){
                    modalContainer.classList.toggle('container-hidden');
                }, 300)
            }, 300)
            
            
            rutina[numeroDeSesionIngresada].ejercicios.push(nuevoEjercicio);
            console.log(rutina)
            localStorage.setItem('rutina', JSON.stringify(rutina));
            reemplazarSesiones();
            modalPadre.innerHTML = ""
        })
    })
})
})
})
})
}

function anotarRepeticionesDeTodaUnaSesion() {
    //Creo los elementos del modal para pedir el numero de sesion en el cual crear el ejercicio
let nuevoParrafo1 = document.createElement('p');
let nuevoInput1 = document.createElement('input');
nuevoParrafo1.textContent = `Ingrese el nombre de sesion en el cual vas a agregar el ejercicio`
nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
agregarBotonClose()
modalPadre.append(nuevoParrafo1)
modalPadre.append(nuevoInput1)
// Creo el boton y lo agrego
btnContinuar1 = document.createElement('button');
btnContinuar1.setAttribute('type', 'submit');
btnContinuar1.setAttribute('class', 'btn btn-continuar1');
btnContinuar1.textContent='Continuar';
modalPadre.append(btnContinuar1);
//Pantalla gris
setTimeout(function(){
    modalContainer.classList.toggle('container-hidden');}, 300)
//Baja el modal
setTimeout(function(){
    modalPadre.classList.toggle('modal-close');}, 300)
    
btnContinuar1.addEventListener('click', () => {
    
    let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
    nombreDeSesionIngresado = nombreSesionPorInput.value;
    console.log(nombreDeSesionIngresado)
    rutina.forEach((sesion, i) => {
        if (sesion.nombre==nombreDeSesionIngresado) {
            numeroDeSesionIngresada = i;
        }
    })
    console.log(numeroDeSesionIngresada)
    modalPadre.innerHTML = ""; //Creo los inputs y los agrego
    agregarBotonClose()
    
    rutina[numeroDeSesionIngresada].ejercicios.forEach((ejercicio, i) => {
        ejercicio.seriesBase.forEach((serie, j) => {
        let parrafoReps = document.createElement('p');
        let inputReps = document.createElement('input');
        inputReps.setAttribute('id',`inputRepsSerie${j}Ej${i}`)
        parrafoReps.textContent = `${ejercicio.nombre} - Serie ${j+1} - Reps Realizadas`
        modalPadre.append(parrafoReps)
        modalPadre.append(inputReps) 
        })
    });
    // Creo el boton y lo agrego
    btnContinuar2 = document.createElement('button');
    btnContinuar2.setAttribute('type', 'submit');
    btnContinuar2.setAttribute('class', 'btn btn-continuar2');
    btnContinuar2.textContent='Continuar';
    modalPadre.append(btnContinuar2);

//Sube el modal
setTimeout(function(){
    modalPadre.classList.toggle('modal-close');})
//Baja el modal
setTimeout(function(){
    modalPadre.classList.toggle('modal-close');}, 300);
    
    
    
    
    // Toca en Continuar 
    btnContinuar2.addEventListener('click', () => {
        rutina[numeroDeSesionIngresada].ejercicios.forEach((ejercicio, i) => {
            let repeticionesHechas = []
            ejercicio.seriesBase.forEach((serie, j) => {
                const inputSerieRealizada = parseInt(document.getElementById(`inputRepsSerie${j}Ej${i}`).value)
                repeticionesHechas.push(inputSerieRealizada);
            })
            ejercicio.seriesRealizadas = repeticionesHechas;
    })

    //blanqueo el modal
    modalPadre.innerHTML = ""
    let ultimoParrafo = document.createElement('p');
    ultimoParrafo.textContent = 'Series Anotadas con éxito'
    modalPadre.append(ultimoParrafo);
    btnContinuar6 = document.createElement('button');
    btnContinuar6.setAttribute('type', 'submit');
    btnContinuar6.setAttribute('class', 'btn btn-continuar6');
    btnContinuar6.textContent='Finalizar';
    modalPadre.append(btnContinuar6);
    //Sube el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');})
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300)
        // Toca en Continuar 
        btnContinuar6.addEventListener('click', () => {
            setTimeout(function(){
                modalPadre.classList.toggle('modal-close');
                setTimeout(function(){
                    modalContainer.classList.toggle('container-hidden');
                }, 300)
            }, 300)
            
            console.log(rutina)
            localStorage.setItem('rutina', JSON.stringify(rutina));
            reemplazarSesiones();
            modalPadre.innerHTML = ""
        })
    })
})
}

    


function anotarRepsSoloUno() {
    //Creo los elementos del modal para pedir el numero de sesion en el cual crear el ejercicio
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion a la que pertenece el ejercicio`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    modalPadre.append(nuevoParrafo1)
    modalPadre.append(nuevoInput1)
    // Creo el boton y lo agrego
    btnContinuar1 = document.createElement('button');
    btnContinuar1.setAttribute('type', 'submit');
    btnContinuar1.setAttribute('class', 'btn btn-continuar1');
    btnContinuar1.textContent='Continuar';
    modalPadre.append(btnContinuar1);
    //Pantalla gris
    setTimeout(function(){
        modalContainer.classList.toggle('container-hidden');}, 300)
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300)
        
    btnContinuar1.addEventListener('click', () => {
        
        let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
        nombreDeSesionIngresado = nombreSesionPorInput.value;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)
        modalPadre.innerHTML = ""; //Creo los inputs y los agrego

        agregarBotonClose()
        let nuevoParrafo1 = document.createElement('p');
        let nuevoInput1 = document.createElement('input');
        nuevoParrafo1.textContent = `Ingrese el nombre del ejercicio del cual quiere anotar las repeticiones realizadas`
        nuevoInput1.setAttribute('id',`input-nombreEjercicioAModificar`)
        agregarBotonClose()
        modalPadre.append(nuevoParrafo1)
        modalPadre.append(nuevoInput1)
        // Creo el boton y lo agrego
        btnContinuar2 = document.createElement('button');
        btnContinuar2.setAttribute('type', 'submit');
        btnContinuar2.setAttribute('class', 'btn btn-continuar2');
        btnContinuar2.textContent='Continuar';
        modalPadre.append(btnContinuar2);
        //Sube el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');})
        //Baja el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300);
            
        btnContinuar2.addEventListener('click', () => {
            
            let nombreEjercicioPorInput = document.getElementById('input-nombreEjercicioAModificar');
            nombreDeEjercicioIngresado = nombreEjercicioPorInput.value;
            console.log(nombreDeEjercicioIngresado)
            rutina[numeroDeSesionIngresada].ejercicios.forEach((ejercicio, i) => {
                if (ejercicio.nombre==nombreDeEjercicioIngresado) {
                    numeroDeEjercicioIngresado = i;
                }
            })
            console.log(numeroDeEjercicioIngresado)
            modalPadre.innerHTML = ""; //Creo los inputs y los agrego

        agregarBotonClose()
        rutina[numeroDeSesionIngresada].ejercicios[numeroDeEjercicioIngresado].seriesBase.forEach((serie, i) => {
            let parrafoReps = document.createElement('p');
            let inputReps = document.createElement('input');
            inputReps.setAttribute('id',`inputRepsSerie${i+1}`)
            parrafoReps.textContent = `Serie ${i+1} - Reps Realizadas`
            modalPadre.append(parrafoReps)
            modalPadre.append(inputReps) 
        });
        // Creo el boton y lo agrego
        btnContinuar3 = document.createElement('button');
        btnContinuar3.setAttribute('type', 'submit');
        btnContinuar3.setAttribute('class', 'btn btn-continuar3');
        btnContinuar3.textContent='Continuar';
        modalPadre.append(btnContinuar3);
    //Sube el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');})
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300);

        // Toca en Continuar 
        btnContinuar3.addEventListener('click', () => {
            let repeticionesHechas = []
            rutina[numeroDeSesionIngresada].ejercicios[numeroDeEjercicioIngresado].seriesBase.forEach((serie, i) => {
                const inputSerieRealizada = parseInt(document.getElementById(`inputRepsSerie${i+1}`).value)
                repeticionesHechas.push(inputSerieRealizada);
            })
            
            rutina[numeroDeSesionIngresada].ejercicios[numeroDeEjercicioIngresado].seriesRealizadas = repeticionesHechas;
        //blanqueo el modal
        modalPadre.innerHTML = ""

        let ultimoParrafo = document.createElement('p');
        ultimoParrafo.textContent = 'Series Anotadas con éxito'
        modalPadre.append(ultimoParrafo);
        btnContinuar6 = document.createElement('button');
        btnContinuar6.setAttribute('type', 'submit');
        btnContinuar6.setAttribute('class', 'btn btn-continuar6');
        btnContinuar6.textContent='Finalizar';
        modalPadre.append(btnContinuar6);
        //Sube el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');})
        //Baja el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300)
            // Toca en Continuar 
            btnContinuar6.addEventListener('click', () => {
                setTimeout(function(){
                    modalPadre.classList.toggle('modal-close');
                    setTimeout(function(){
                        modalContainer.classList.toggle('container-hidden');
                    }, 300)
                }, 300)
                
                console.log(rutina)
                localStorage.setItem('rutina', JSON.stringify(rutina));
                reemplazarSesiones();
                modalPadre.innerHTML = ""
            })
        })
    })
})
}


function generarProximaSesionUnicoEjercicio() {
    //Creo los elementos del modal para pedir el numero de sesion en el cual crear el ejercicio
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion a la que pertenece el ejercicio`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    modalPadre.append(nuevoParrafo1)
    modalPadre.append(nuevoInput1)
    // Creo el boton y lo agrego
    btnContinuar1 = document.createElement('button');
    btnContinuar1.setAttribute('type', 'submit');
    btnContinuar1.setAttribute('class', 'btn btn-continuar1');
    btnContinuar1.textContent='Continuar';
    modalPadre.append(btnContinuar1);
    //Pantalla gris
    setTimeout(function(){
        modalContainer.classList.toggle('container-hidden');}, 300)
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300)
        
    btnContinuar1.addEventListener('click', () => {
        
        let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
        nombreDeSesionIngresado = nombreSesionPorInput.value;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)
        modalPadre.innerHTML = ""; //Creo los inputs y los agrego

        agregarBotonClose()
        let nuevoParrafo1 = document.createElement('p');
        let nuevoInput1 = document.createElement('input');
        nuevoParrafo1.textContent = `Ingrese el nombre del ejercicio del cual quieras generar los próximos pesos y repeticiones`
        nuevoInput1.setAttribute('id',`input-nombreEjercicioAModificar`)
        agregarBotonClose()
        modalPadre.append(nuevoParrafo1)
        modalPadre.append(nuevoInput1)
        // Creo el boton y lo agrego
        btnContinuar2 = document.createElement('button');
        btnContinuar2.setAttribute('type', 'submit');
        btnContinuar2.setAttribute('class', 'btn btn-continuar2');
        btnContinuar2.textContent='Continuar';
        modalPadre.append(btnContinuar2);
        //Sube el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');})
        //Baja el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300);
            
        btnContinuar2.addEventListener('click', () => {
            
            let nombreEjercicioPorInput = document.getElementById('input-nombreEjercicioAModificar');
            nombreDeEjercicioIngresado = nombreEjercicioPorInput.value;
            console.log(nombreDeEjercicioIngresado)
            rutina[numeroDeSesionIngresada].ejercicios.forEach((ejercicio, i) => {
                if (ejercicio.nombre==nombreDeEjercicioIngresado) {
                    numeroDeEjercicioIngresado = i;
                }
            })
            console.log(numeroDeEjercicioIngresado)
            modalPadre.innerHTML = ""; //Creo los inputs y los agrego
            let ultimoParrafo = document.createElement('p');
            ultimoParrafo.textContent = 'Próxima sesión del ejercicio generada con éxito'
            modalPadre.append(ultimoParrafo);
            btnContinuar6 = document.createElement('button');
            btnContinuar6.setAttribute('type', 'submit');
            btnContinuar6.setAttribute('class', 'btn btn-continuar6');
            btnContinuar6.textContent='Finalizar';
            modalPadre.append(btnContinuar6);
            //Sube el modal
            setTimeout(function(){
                modalPadre.classList.toggle('modal-close');})
            //Baja el modal
            setTimeout(function(){
                modalPadre.classList.toggle('modal-close');}, 300)
                // Toca en Continuar 
                btnContinuar6.addEventListener('click', () => {
                    setTimeout(function(){
                        modalPadre.classList.toggle('modal-close');
                        setTimeout(function(){
                            modalContainer.classList.toggle('container-hidden');
                        }, 300)
                    }, 300)
                    
                    equipararUltimosPesosConProximosUnicoEjercicio(numeroDeSesionIngresada, numeroDeEjercicioIngresado)
                    actualizarPesosUnicoEjercicio(numeroDeSesionIngresada, numeroDeEjercicioIngresado)
                    actualizarSeriesUnicoEjercicio(numeroDeSesionIngresada, numeroDeEjercicioIngresado)
                    localStorage.setItem('rutina', JSON.stringify(rutina))
                    reemplazarSesiones()
                
                    modalPadre.innerHTML = ""
                })
            })
        })
    }


function generarProximaSesionCompleta() {
    //Creo los elementos del modal para pedir el numero de sesion en el cual crear el ejercicio
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion completa. Se generarán todos los datos para la próxima semana`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    modalPadre.append(nuevoParrafo1)
    modalPadre.append(nuevoInput1)
    // Creo el boton y lo agrego
    btnContinuar1 = document.createElement('button');
    btnContinuar1.setAttribute('type', 'submit');
    btnContinuar1.setAttribute('class', 'btn btn-continuar1');
    btnContinuar1.textContent='Continuar';
    modalPadre.append(btnContinuar1);
    //Pantalla gris
    setTimeout(function(){
        modalContainer.classList.toggle('container-hidden');}, 300)
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300)
        
    btnContinuar1.addEventListener('click', () => {
        
        let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
        nombreDeSesionIngresado = nombreSesionPorInput.value;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)

        modalPadre.innerHTML = ""; //Creo los inputs y los agrego
        let ultimoParrafo = document.createElement('p');
        ultimoParrafo.textContent = 'Próxima sesión generada con éxito'
        modalPadre.append(ultimoParrafo);
        btnContinuar6 = document.createElement('button');
        btnContinuar6.setAttribute('type', 'submit');
        btnContinuar6.setAttribute('class', 'btn btn-continuar6');
        btnContinuar6.textContent='Finalizar';
        modalPadre.append(btnContinuar6);
        //Sube el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');})
        //Baja el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300)
            // Toca en Continuar 
            btnContinuar6.addEventListener('click', () => {
                setTimeout(function(){
                    modalPadre.classList.toggle('modal-close');
                    setTimeout(function(){
                        modalContainer.classList.toggle('container-hidden');
                    }, 300)
                }, 300)

                equipararUltimosPesosConProximos(numeroDeSesionIngresada)
                actualizarPesos(numeroDeSesionIngresada)
                actualizarSeries(numeroDeSesionIngresada)
                localStorage.setItem('rutina', JSON.stringify(rutina))
                reemplazarSesiones()
                modalPadre.innerHTML = ""
            })
        })
}

function eliminarEjercicio() {
    //Creo los elementos del modal para pedir el numero de sesion en el cual crear el ejercicio
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion a la que pertenece el ejercicio a eliminar`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    modalPadre.append(nuevoParrafo1)
    modalPadre.append(nuevoInput1)
    // Creo el boton y lo agrego
    btnContinuar1 = document.createElement('button');
    btnContinuar1.setAttribute('type', 'submit');
    btnContinuar1.setAttribute('class', 'btn btn-continuar1');
    btnContinuar1.textContent='Continuar';
    modalPadre.append(btnContinuar1);
    //Pantalla gris
    setTimeout(function(){
        modalContainer.classList.toggle('container-hidden');}, 300)
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300)
        
    btnContinuar1.addEventListener('click', () => {
        
        let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
        nombreDeSesionIngresado = nombreSesionPorInput.value;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)
        modalPadre.innerHTML = ""; //Creo los inputs y los agrego

        agregarBotonClose()
        let nuevoParrafo1 = document.createElement('p');
        let nuevoInput1 = document.createElement('input');
        nuevoParrafo1.textContent = `Ingrese el nombre del ejercicio a eliminar`
        nuevoInput1.setAttribute('id',`input-nombreEjercicioAModificar`)
        agregarBotonClose()
        modalPadre.append(nuevoParrafo1)
        modalPadre.append(nuevoInput1)
        // Creo el boton y lo agrego
        btnContinuar2 = document.createElement('button');
        btnContinuar2.setAttribute('type', 'submit');
        btnContinuar2.setAttribute('class', 'btn btn-continuar2');
        btnContinuar2.textContent='Continuar';
        modalPadre.append(btnContinuar2);
        //Sube el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');})
        //Baja el modal
        setTimeout(function(){
            modalPadre.classList.toggle('modal-close');}, 300);
            
        btnContinuar2.addEventListener('click', () => {
            
            let nombreEjercicioPorInput = document.getElementById('input-nombreEjercicioAModificar');
            nombreDeEjercicioIngresado = nombreEjercicioPorInput.value;
            console.log(nombreDeEjercicioIngresado)
            rutina[numeroDeSesionIngresada].ejercicios.forEach((ejercicio, i) => {
                if (ejercicio.nombre==nombreDeEjercicioIngresado) {
                    numeroDeEjercicioIngresado = i;
                }
            })
            console.log(numeroDeEjercicioIngresado)
            modalPadre.innerHTML = ""; //Creo los inputs y los agrego
            let ultimoParrafo = document.createElement('p');
            ultimoParrafo.textContent = 'Ejercicio eliminado con éxito'
            modalPadre.append(ultimoParrafo);
            btnContinuar6 = document.createElement('button');
            btnContinuar6.setAttribute('type', 'submit');
            btnContinuar6.setAttribute('class', 'btn btn-continuar6');
            btnContinuar6.textContent='Finalizar';
            modalPadre.append(btnContinuar6);
            //Sube el modal
            setTimeout(function(){
                modalPadre.classList.toggle('modal-close');})
            //Baja el modal
            setTimeout(function(){
                modalPadre.classList.toggle('modal-close');}, 300)
                // Toca en Continuar 
                btnContinuar6.addEventListener('click', () => {
                    setTimeout(function(){
                        modalPadre.classList.toggle('modal-close');
                        setTimeout(function(){
                            modalContainer.classList.toggle('container-hidden');
                        }, 300)
                    }, 300)
                    
                    rutina[numeroDeSesionIngresada].ejercicios.splice(numeroDeEjercicioIngresado, 1);
                    localStorage.setItem('rutina', JSON.stringify(rutina));
                    reemplazarSesiones();
                    modalPadre.innerHTML = ""
                })
            })
        })
}

function eliminarSesion() {
    //Creo los elementos del modal para pedir el numero de sesion en el cual crear el ejercicio
let nuevoParrafo1 = document.createElement('p');
let nuevoInput1 = document.createElement('input');
nuevoParrafo1.textContent = `Ingrese el nombre de sesion a eliminar`
nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
agregarBotonClose()
modalPadre.append(nuevoParrafo1)
modalPadre.append(nuevoInput1)
// Creo el boton y lo agrego
btnContinuar1 = document.createElement('button');
btnContinuar1.setAttribute('type', 'submit');
btnContinuar1.setAttribute('class', 'btn btn-continuar1');
btnContinuar1.textContent='Continuar';
modalPadre.append(btnContinuar1);
//Pantalla gris
setTimeout(function(){
    modalContainer.classList.toggle('container-hidden');}, 300)
//Baja el modal
setTimeout(function(){
    modalPadre.classList.toggle('modal-close');}, 300)
    
btnContinuar1.addEventListener('click', () => {
    
    let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
    nombreDeSesionIngresado = nombreSesionPorInput.value;
    console.log(nombreDeSesionIngresado)
    rutina.forEach((sesion, i) => {
        if (sesion.nombre==nombreDeSesionIngresado) {
            numeroDeSesionIngresada = i;
        }
    })
    console.log(numeroDeSesionIngresada)
    modalPadre.innerHTML = ""; //Creo los inputs y los agrego
    
    let ultimoParrafo = document.createElement('p');
    ultimoParrafo.textContent = 'Serie eliminada con éxito'
    modalPadre.append(ultimoParrafo);
    btnContinuar6 = document.createElement('button');
    btnContinuar6.setAttribute('type', 'submit');
    btnContinuar6.setAttribute('class', 'btn btn-continuar6');
    btnContinuar6.textContent='Finalizar';
    modalPadre.append(btnContinuar6);
    //Sube el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');})
    //Baja el modal
    setTimeout(function(){
        modalPadre.classList.toggle('modal-close');}, 300)
        // Toca en Continuar 
        btnContinuar6.addEventListener('click', () => {
            setTimeout(function(){
                modalPadre.classList.toggle('modal-close');
                setTimeout(function(){
                    modalContainer.classList.toggle('container-hidden');
                }, 300)
            }, 300)
            
            rutina.splice(numeroDeSesionIngresada, 1);
            localStorage.setItem('rutina', JSON.stringify(rutina));
            reemplazarSesiones();
            modalPadre.innerHTML = ""
        })
    })
}


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
            if (serie>=ejercicio.seriesBase[i][1]) {
                nuevosPesos.push(ejercicio.ultimosPesos[i] + 5)
            } else {
                nuevosPesos.push(ejercicio.ultimosPesos[i])
            }
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
                nuevoRangoDeSeries.push(serie);
                nuevoRangoDeSeries.push(ejercicio.seriesBase[i][1]);
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
            if (serie>=rutina[sesion].ejercicios[ejercicio].seriesBase[i][1]) {
                nuevosPesos.push(rutina[sesion].ejercicios[ejercicio].ultimosPesos[i] + 5)
            } else {
                nuevosPesos.push(rutina[sesion].ejercicios[ejercicio].ultimosPesos[i])
            }
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
                nuevoRangoDeSeries.push(serie);
                nuevoRangoDeSeries.push(rutina[sesion].ejercicios[ejercicio].seriesBase[i][1]);
                nuevasSeries.push(nuevoRangoDeSeries);
            }
        })
        rutina[sesion].ejercicios[ejercicio].proximasSeries = nuevasSeries;
}
/*FUNCIONES CALCULOS*/




/*FUNCIONES RENDER TABLA*/
// CALLBACK - Solo renderiza las tablas.
// No modifica el array rutina. No borra.
function crearTablas() {
    const routineContainer = document.querySelector('.routine-container');
    
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
        tablaDeSesion.id ="sesion" + (i+1)
        routineContainer.append(tablaDeSesion);
    });
};
  

// CALLBACK
//Borra visualmente, y renderiza de nuevo todas las tablas.
function reemplazarSesiones() {
    borrarTablas()
    crearTablas()
}

//Borra del array. Actualiza storage. No renderiza
// NO BUTTON - CALLBACK  de borrarRutina()
//Solamente borra visualmente las tablas.
function borrarTablas() {
    const todasLasTablas = document.querySelectorAll('table');
    todasLasTablas.forEach((table) => {
        table.remove()
    });
}
function borrarRutina() {
    rutina = [];
    localStorage.removeItem('rutina');
    borrarTablas();            
};


    