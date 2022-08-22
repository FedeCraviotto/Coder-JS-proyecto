let rutina = JSON.parse(localStorage.getItem('rutina')) || []
crearTablas()

//Darkmode
$('#darkmode-toggle').change(() => {
    $('body').toggleClass("darkBC");
})
//EVENTOS - Panel Principal
$('.btn-about').click(() => {
    $('#aboutCuadro').hasClass('hidden')?$('#aboutCuadro').removeClass('hidden'): $('#aboutCuadro').addClass('hidden')
})

$('.btn-anotarRepsSesion').click(() => {
        anotarRepeticionesDeTodaUnaSesion();
})

$('.btn-generarProximaSesion').click(() => {
    generarProximaSesionCompleta();
})

$('.btn-generarProximaSesionx1').click(() => {
    generarProximaSesionUnicoEjercicio();
})

$('.btn-agregarEjercicio').click(() => {
    agregarEjercicio();
});

$('.btn-anotarRepsx1').click(() => {
    anotarRepsSoloUno();
})


$('.btn-eliminarEjercicio').click(() => {
    eliminarEjercicio();
})

$('.btn-eliminarSesion').click(() => {
    eliminarSesion();
})

$('.btn-borrarRutina').click(() => {
    borrarRutina();
})

$('.btn-agregarSesion').click(() => {
    agregarSesion()
});

let nombreDeSesionIngresado = ""; 
let numeroDeSesionIngresada = 0;
let nombreDeEjercicioIngresado = "";
let numeroDeEjercicioIngresado = 0;
let modalContainer = document.querySelector('.modal-container')
let cantidadEjercicios;
let nuevaSesion;
let nuevoEjercicio;
let btnContinuar1;
let btnContinuar2;
let btnContinuar3;
let btnContinuar4;
let btnContinuar5;
let btnContinuar6;

/*Btn Create Functions */
function crearBtn1Continuar () {
    btnContinuar1 = document.createElement('button');
    btnContinuar1.textContent='Continuar';
}
function crearBtn2Continuar () {
    btnContinuar2 = document.createElement('button');
    btnContinuar2.textContent='Continuar';
}
function crearBtn3Continuar () {
    btnContinuar3 = document.createElement('button');
    btnContinuar3.textContent='Continuar';
}
function crearBtn4Continuar () {
    btnContinuar4 = document.createElement('button');
    btnContinuar4.textContent='Continuar';
}
function crearBtn5Continuar () {
    btnContinuar5 = document.createElement('button');
    btnContinuar5.textContent='Continuar';
}

function agregarBotonClose () {
    let botonClose = document.createElement('button');
    botonClose.setAttribute('class', 'btn close');
    botonClose.textContent = 'X';
    $('.modal').append(botonClose);
    $('.close').click(() => {
        //Setea la sesión a cero
        //Sube el modal
        setTimeout(function(){
            $('.modal').toggle('modal-close');}, 100)
        //Pantalla gris
        setTimeout(function(){
            modalContainer.classList.toggle('container-hidden');}, 400)
            nuevaSesion = undefined;
            $('.modal').html("")
    }) 
}



function agregarSesion() {
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    let nuevoParrafo2 = document.createElement('p');
    let nuevoInput2 = document.createElement('input');
    nuevoParrafo1.textContent = 'Ingrese el nombre de sesion';
    nuevoInput1.setAttribute('id',`input-nombreSesion`);
    nuevoParrafo2.textContent = 'Ingrese la cantidad de ejercicios para esta sesion';
    nuevoInput2.setAttribute('id',`input-cantidadDeEjercicios`)
    agregarBotonClose();
    // Creo el boton y lo agrego
    crearBtn1Continuar()
    $('.modal').append(nuevoParrafo1, nuevoInput1, nuevoParrafo2, nuevoInput2, btnContinuar1)
    //Pantalla gris
    setTimeout(function(){
        modalContainer.classList.toggle('container-hidden');}, 300)
    //Baja el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');}, 600)
        
    btnContinuar1.addEventListener('click', () => {
        
        let nombreSesionPorInput = document.getElementById('input-nombreSesion');
        console.log(nombreSesionPorInput.value);
        nuevaSesion ={
            nombre:nombreSesionPorInput.value,
            ejercicios: []
        };
        let cantidadEjerciciosPorInput = document.getElementById('input-cantidadDeEjercicios');
        cantidadEjercicios = parseInt(cantidadEjerciciosPorInput.value);
        $('.modal').html(""); //Creo los inputs y los agrego
        agregarBotonClose()
        for (let i=1; i<=cantidadEjercicios; i++) {
        let nuevoParrafo = document.createElement('p');
        let nuevoInput = document.createElement('input');
        nuevoInput.setAttribute('id',`inputNombreEjercicio${i}`)
        nuevoParrafo.textContent = `Ingrese el nombre para el ejercicio ${i}`
        $('.modal').append(nuevoParrafo, nuevoInput)
        } 
        // Creo el boton y lo agrego
        crearBtn2Continuar()
        $('.modal').append(btnContinuar2);
    
    //Sube el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');})
    //Baja el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');}, 300);
    
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
    $('.modal').html("")
    agregarBotonClose()
    for (let i=0; i<nuevaSesion.ejercicios.length; i++) {
        let nuevoParrafo = document.createElement('p');
        let nuevoInput = document.createElement('input');
        nuevoInput.setAttribute('id',`inputCantidadDeSeriesEjercicio${i+1}`)
        nuevoParrafo.textContent = `Ingrese cantidad de series para el ejercicio ${i+1}`
        $('.modal').append(nuevoParrafo, nuevoInput)
        }
        crearBtn3Continuar()
        $('.modal').append(btnContinuar3);  
        //Sube el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');})
        //Baja el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');}, 300)
            btnContinuar3.addEventListener('click', () => {
                for (let i=0; i<nuevaSesion.ejercicios.length; i++) {
                    const inputValue = parseInt(document.getElementById(`inputCantidadDeSeriesEjercicio${i+1}`).value)        
                    for (let j=1; j<=inputValue; j++) {
                        nuevaSesion.ejercicios[i].seriesBase.push([]);
                    }
                }
                    
                    
        //Blanqueo el modal
        $('.modal').html("")
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
                $('.modal').append(nuevoParrafoMin, nuevoInputMin, nuevoParrafoMax, nuevoInputMax)                
            }
        }
        crearBtn4Continuar()
        $('.modal').append(btnContinuar4);
        //Sube el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');})
        //Baja el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');}, 300);
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
        $('.modal').html("")
        agregarBotonClose()
        for (let i=0; i<nuevaSesion.ejercicios.length; i++) {
            for (let j=0; j<nuevaSesion.ejercicios[i].seriesBase.length; j++) {
                let nuevoParrafo = document.createElement('p');
                let nuevoInput = document.createElement('input');
                nuevoInput.setAttribute('id',`inputPesoSerie${j+1}Ejercicio${i+1}`)
                nuevoParrafo.textContent = `${nuevaSesion.ejercicios[i].nombre} -Serie ${j+1} - Peso a levantar (en kg)`
                $('.modal').append(nuevoParrafo, nuevoInput)
            }
        }
        crearBtn5Continuar()
        $('.modal').append(btnContinuar5);
        //Sube el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');})
        //Baja el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');}, 300)
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
        $('.modal').html("");
        let ultimoParrafo = document.createElement('p');
        ultimoParrafo.textContent = 'Sesión creada con éxito'
        btnContinuar6 = document.createElement('button');
        btnContinuar6.textContent='Finalizar';
        $('.modal').append(ultimoParrafo, btnContinuar6);
        //Sube el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');})
        //Baja el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');}, 300)
            // Toca en Continuar 
            btnContinuar6.addEventListener('click', () => {
                setTimeout(function(){
                    $('.modal').toggleClass('modal-close');
                    setTimeout(function(){
                        modalContainer.classList.toggle('container-hidden');
                    }, 300)
                }, 300)
                
                rutina.push(nuevaSesion);
                console.log(rutina)
                localStorage.setItem('rutina', JSON.stringify(rutina));
                reemplazarSesiones();
                $('.modal').html("")
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
    // Creo el boton y lo agrego
    crearBtn1Continuar()
    $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar1)
    //Pantalla gris
    setTimeout(function(){
        modalContainer.classList.toggle('container-hidden');}, 300)
    //Baja el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');}, 600)
        
    btnContinuar1.addEventListener('click', () => {
        
        let nombreSesionPorInput = nuevoInput1.value;
        nombreDeSesionIngresado = nombreSesionPorInput;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)
        $('.modal').html(""); //Creo los inputs y los agrego
        agregarBotonClose()
        let nuevoParrafoNombreEj = document.createElement('p');
        let nuevoInputNombreEj = document.createElement('input');
        nuevoInputNombreEj.setAttribute('id','inputNombreEjercicio')
        nuevoParrafoNombreEj.textContent = `Ingrese el nombre para el ejercicio`
        crearBtn2Continuar()
        $('.modal').append(nuevoParrafoNombreEj, nuevoInputNombreEj, btnContinuar2)

    //Sube el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');})
    //Baja el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');}, 300);
        
        // Toca en Continuar 
        btnContinuar2.addEventListener('click', () => {
            const inputValue = nuevoInputNombreEj.value            
            nuevoEjercicio ={
            nombre:inputValue,
            seriesBase:[],
            seriesRealizadas:[],
            ultimosPesos:[],
            proximosPesos: [],
            proximasSeries:[]
        }
        console.log(nuevoEjercicio)
        
        //Blanqueo el modal
        $('.modal').html("");
        agregarBotonClose();
        let nuevoParrafo = document.createElement('p');
        let nuevoInput = document.createElement('input');
        nuevoInput.setAttribute('id','inputQSeries')
        nuevoParrafo.textContent = `Ingrese cantidad de series para el ejercicio`
        crearBtn3Continuar() 
        $('.modal').append(nuevoParrafo, nuevoInput, btnContinuar3);

        //Sube el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');})
        //Baja el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');}, 300)
        //La persona llena el contenido (cant series del Ejercicio nuevo)
        // Toca en Continuar 
        btnContinuar3.addEventListener('click', () => {

        let inputValue = parseInt(document.getElementById('inputQSeries').value)
        console.log(inputValue);       
        for (let i=1; i<=inputValue; i++) {
            nuevoEjercicio.seriesBase.push([]);    
        }

        //Blanqueo el modal
        $('.modal').html("")
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
        $('.modal').append(nuevoParrafoMin, nuevoInputMin, nuevoParrafoMax, nuevoInputMax)
    }
    crearBtn4Continuar()
    $('.modal').append(btnContinuar4);
    //Sube el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');})
    //Baja el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');}, 300);
        
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
        $('.modal').html("")
        agregarBotonClose()
                        
    for (let i=0; i<nuevoEjercicio.seriesBase.length; i++) {
        let nuevoParrafo = document.createElement('p');
        let nuevoInput = document.createElement('input');
        nuevoInput.setAttribute('id',`inputPesoSerie${i+1}`)
        nuevoParrafo.textContent = `Serie ${i+1} - Peso a levantar (en kg)`
        $('.modal').append(nuevoParrafo, nuevoInput)
        }
        crearBtn5Continuar()
        $('.modal').append(btnContinuar5);
        //Sube el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');})
            //Baja el modal
            setTimeout(function(){
                $('.modal').toggleClass('modal-close');}, 300)
                //La persona llena el contenido (Series Minimas y maximas de cada ejercicio de la sesion)
                // Toca en Continuar 
                btnContinuar5.addEventListener('click', () => {
                    for (let i=0; i<nuevoEjercicio.seriesBase.length; i++) {
                        let inputValue = parseInt(document.getElementById
                            (`inputPesoSerie${i+1}`).value)       
                            nuevoEjercicio.proximosPesos.push(inputValue);
                        }
                    
                //blanqueo el modal
                $('.modal').html("")
                let ultimoParrafo = document.createElement('p');
                ultimoParrafo.textContent = 'Ejercicio creado con éxito'
                // $('.modal').append(ultimoParrafo);
                btnContinuar6 = document.createElement('button');
                btnContinuar6.setAttribute('class', 'btn btn-continuar6');
                btnContinuar6.textContent='Finalizar';
                $('.modal').append(ultimoParrafo, btnContinuar6);
                //Sube el modal
                setTimeout(function(){
                    $('.modal').toggleClass('modal-close');})
                //Baja el modal
                setTimeout(function(){
                    $('.modal').toggleClass('modal-close');}, 300)
                    // Toca en Continuar 
                    btnContinuar6.addEventListener('click', () => {
                        setTimeout(function(){
                            $('.modal').toggleClass('modal-close');
                            setTimeout(function(){
                                modalContainer.classList.toggle('container-hidden');
                            }, 300)
                        }, 300)
                        
                        
                        rutina[numeroDeSesionIngresada].ejercicios.push(nuevoEjercicio);
                        console.log(rutina)
                        localStorage.setItem('rutina', JSON.stringify(rutina));
                        reemplazarSesiones();
                        $('.modal').html("");
                    })
                })
            })
        })
    })
})
}

function anotarRepeticionesDeTodaUnaSesion() {
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion en el cual vas a agregar el ejercicio`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    crearBtn1Continuar()
    $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar1)
    //Pantalla gris
    setTimeout(function(){
        modalContainer.classList.toggle('container-hidden');}, 300)
    //Baja el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');}, 300)
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
        $('.modal').html(""); //Blanqueo
        agregarBotonClose()
        rutina[numeroDeSesionIngresada].ejercicios.forEach((ejercicio, i) => {
            ejercicio.seriesBase.forEach((serie, j) => {
            let parrafoReps = document.createElement('p');
            let inputReps = document.createElement('input');
            inputReps.setAttribute('id',`inputRepsSerie${j}Ej${i}`)
            parrafoReps.textContent = `${ejercicio.nombre} - Serie ${j+1} - Reps Realizadas`
            $('.modal').append(parrafoReps, inputReps)
            })
        });
        // Creo el boton y lo agrego
        crearBtn2Continuar()
        $('.modal').append(btnContinuar2);
        //Sube el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');})
        //Baja el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');}, 300);
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
        $('.modal').html("") //blanqueo el modal
        let ultimoParrafo = document.createElement('p');
        ultimoParrafo.textContent = 'Series Anotadas con éxito'
        btnContinuar3 = document.createElement('button');
        btnContinuar3.textContent='Finalizar';
        $('.modal').append(ultimoParrafo, btnContinuar3);
        //Sube el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');})
        //Baja el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');}, 300)
            // Toca en Continuar 
            btnContinuar3.addEventListener('click', () => {
                setTimeout(function(){
                    $('.modal').toggleClass('modal-close');
                    setTimeout(function(){
                        modalContainer.classList.toggle('container-hidden');
                    }, 300)
                }, 300)
                console.log(rutina)
                localStorage.setItem('rutina', JSON.stringify(rutina));
                reemplazarSesiones();
                $('.modal').html("");
            })
        })
    })
}


function anotarRepsSoloUno() {
    let nuevoParrafo1 = document.createElement('p'); //Creo todo
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion a la que pertenece el ejercicio`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    crearBtn1Continuar()
    $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar1) //Append
    setTimeout(function(){ //Pantalla gris
        modalContainer.classList.toggle('container-hidden');}, 300)
    setTimeout(function(){ //Baja el modal
        $('.modal').toggleClass('modal-close');}, 300)
    btnContinuar1.addEventListener('click', () => { //Click en Continuar
        let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
        nombreDeSesionIngresado = nombreSesionPorInput.value;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)
        $('.modal').html(""); //Blanqueo
        agregarBotonClose() //Creo todo
        let nuevoParrafo1 = document.createElement('p');
        let nuevoInput1 = document.createElement('input');
        nuevoParrafo1.textContent = `Ingrese el nombre del ejercicio del cual quiere anotar las repeticiones realizadas`
        nuevoInput1.setAttribute('id',`input-nombreEjercicioAModificar`)
        agregarBotonClose()
        crearBtn2Continuar()
        $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar2);
        setTimeout(function(){ //Sube el modal
            $('.modal').toggleClass('modal-close');})
        setTimeout(function(){ //Baja el modal
            $('.modal').toggleClass('modal-close');}, 300);
        btnContinuar2.addEventListener('click', () => { // Click continuar
            let nombreEjercicioPorInput = document.getElementById('input-nombreEjercicioAModificar');
            nombreDeEjercicioIngresado = nombreEjercicioPorInput.value;
            console.log(nombreDeEjercicioIngresado)
            rutina[numeroDeSesionIngresada].ejercicios.forEach((ejercicio, i) => {
                if (ejercicio.nombre==nombreDeEjercicioIngresado) {
                    numeroDeEjercicioIngresado = i;
                }
            })
            console.log(numeroDeEjercicioIngresado)
            $('.modal').html(""); //Creo los inputs y los agrego
            agregarBotonClose()
            rutina[numeroDeSesionIngresada].ejercicios[numeroDeEjercicioIngresado].seriesBase.forEach((serie, i) => {
                let parrafoReps = document.createElement('p');
                let inputReps = document.createElement('input');
                inputReps.setAttribute('id',`inputRepsSerie${i+1}`)
                parrafoReps.textContent = `Serie ${i+1} - Reps Realizadas`
                $('.modal').append(parrafoReps, inputReps)
            });
            crearBtn3Continuar()
            $('.modal').append(btnContinuar3);
            setTimeout(function(){ //Sube el modal
                $('.modal').toggleClass('modal-close');})
            
            setTimeout(function(){ //Baja el modal
                $('.modal').toggleClass('modal-close');}, 300);
            btnContinuar3.addEventListener('click', () => { // Click continuar
                let repeticionesHechas = []
                rutina[numeroDeSesionIngresada].ejercicios[numeroDeEjercicioIngresado].seriesBase.forEach((serie, i) => {
                    const inputSerieRealizada = parseInt(document.getElementById(`inputRepsSerie${i+1}`).value)
                    repeticionesHechas.push(inputSerieRealizada);
                })
                rutina[numeroDeSesionIngresada].ejercicios[numeroDeEjercicioIngresado].seriesRealizadas = repeticionesHechas;
                $('.modal').html("") //blanqueo el modal
                let ultimoParrafo = document.createElement('p');
                ultimoParrafo.textContent = 'Series Anotadas con éxito'
                btnContinuar4 = document.createElement('button');
                btnContinuar4.textContent='Finalizar';
                $('.modal').append(ultimoParrafo, btnContinuar4);
                setTimeout(function(){ //Sube el modal
                    $('.modal').toggleClass('modal-close');})
                setTimeout(function(){ //Baja el modal
                    $('.modal').toggleClass('modal-close');}, 300)
                    btnContinuar4.addEventListener('click', () => { // Continuar
                        setTimeout(function(){
                            $('.modal').toggleClass('modal-close');
                            setTimeout(function(){
                                modalContainer.classList.toggle('container-hidden');
                            }, 300)
                        }, 300)
                        localStorage.setItem('rutina', JSON.stringify(rutina));
                        reemplazarSesiones();
                        $('.modal').html("")
                })
            })
        })
    })
}


function generarProximaSesionUnicoEjercicio() {
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion a la que pertenece el ejercicio`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    crearBtn1Continuar()
    $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar1)
    setTimeout(function(){ //Pantalla gris
        modalContainer.classList.toggle('container-hidden');}, 300)
    setTimeout(function(){ //Baja el modal
        $('.modal').toggleClass('modal-close');}, 300)
    btnContinuar1.addEventListener('click', () => { // Continuar
        let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
        nombreDeSesionIngresado = nombreSesionPorInput.value;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)
        $('.modal').html(""); //Blanqueo
        agregarBotonClose()
        let nuevoParrafo1 = document.createElement('p');
        let nuevoInput1 = document.createElement('input');
        nuevoParrafo1.textContent = `Ingrese el nombre del ejercicio del cual quieras generar los próximos pesos y repeticiones`
        nuevoInput1.setAttribute('id',`input-nombreEjercicioAModificar`)
        agregarBotonClose()
        crearBtn2Continuar()
        $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar2)
        setTimeout(function(){ //Sube el modal
            $('.modal').toggleClass('modal-close');})
        setTimeout(function(){ //Baja el modal
            $('.modal').toggleClass('modal-close');}, 300);
        btnContinuar2.addEventListener('click', () => { //Continuar
            let nombreEjercicioPorInput = document.getElementById('input-nombreEjercicioAModificar');
            nombreDeEjercicioIngresado = nombreEjercicioPorInput.value;
            console.log(nombreDeEjercicioIngresado)
            rutina[numeroDeSesionIngresada].ejercicios.forEach((ejercicio, i) => {
                if (ejercicio.nombre==nombreDeEjercicioIngresado) {
                    numeroDeEjercicioIngresado = i;
                }
            })
            console.log(numeroDeEjercicioIngresado)
            $('.modal').html(""); //Blanqueo
            let ultimoParrafo = document.createElement('p');
            ultimoParrafo.textContent = 'Próxima sesión del ejercicio generada con éxito'
            btnContinuar3 = document.createElement('button');
            btnContinuar3.textContent='Finalizar';
            $('.modal').append(ultimoParrafo, btnContinuar3);
            //Sube el modal
            setTimeout(function(){
                $('.modal').toggleClass('modal-close');})
            //Baja el modal
            setTimeout(function(){
                $('.modal').toggleClass('modal-close');}, 300)
                // Toca en Continuar 
                btnContinuar3.addEventListener('click', () => {
                    setTimeout(function(){
                        $('.modal').toggleClass('modal-close');
                        setTimeout(function(){
                            modalContainer.classList.toggle('container-hidden');
                        }, 300)
                    }, 300)
                equipararUltimosPesosConProximosUnicoEjercicio(numeroDeSesionIngresada, numeroDeEjercicioIngresado)
                actualizarPesosUnicoEjercicio(numeroDeSesionIngresada, numeroDeEjercicioIngresado)
                actualizarSeriesUnicoEjercicio(numeroDeSesionIngresada, numeroDeEjercicioIngresado)
                localStorage.setItem('rutina', JSON.stringify(rutina))
                reemplazarSesiones()
                $('.modal').html("")
            })
        })
    })
}

function generarProximaSesionCompleta() {
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion completa. Se generarán todos los datos para la próxima semana`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    crearBtn1Continuar()
    $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar1)
    setTimeout(function(){ //Pantalla gris
        modalContainer.classList.toggle('container-hidden');}, 300)
    setTimeout(function(){ //Baja el modal
        $('.modal').toggleClass('modal-close');}, 300)
    btnContinuar1.addEventListener('click', () => { // Continuar
        let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
        nombreDeSesionIngresado = nombreSesionPorInput.value;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)
        $('.modal').html(""); //Blanqueo
        let ultimoParrafo = document.createElement('p');
        ultimoParrafo.textContent = 'Próxima sesión generada con éxito'
        btnContinuar2 = document.createElement('button');
        btnContinuar2.textContent='Finalizar';
        $('.modal').append(ultimoParrafo, btnContinuar2);
        //Sube el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');})
        //Baja el modal
        setTimeout(function(){
            $('.modal').toggleClass('modal-close');}, 300)
        // Toca en Continuar 
        btnContinuar2.addEventListener('click', () => {
            setTimeout(function(){
                $('.modal').toggleClass('modal-close');
                setTimeout(function(){
                    modalContainer.classList.toggle('container-hidden');
                }, 300);
            }, 300);

            equipararUltimosPesosConProximos(numeroDeSesionIngresada);
            actualizarPesos(numeroDeSesionIngresada);
            actualizarSeries(numeroDeSesionIngresada);
            localStorage.setItem('rutina', JSON.stringify(rutina));
            reemplazarSesiones();
            $('.modal').html("");
        });
    });
};

function eliminarEjercicio() {
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion a la que pertenece el ejercicio a eliminar`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    crearBtn1Continuar()
    $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar1)
    setTimeout(function(){ //Pantalla gris
        modalContainer.classList.toggle('container-hidden');}, 300)
    setTimeout(function(){ //Baja el modal
        $('.modal').toggleClass('modal-close');}, 300)
    btnContinuar1.addEventListener('click', () => { //Continuar
        let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
        nombreDeSesionIngresado = nombreSesionPorInput.value;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)
        $('.modal').html(""); //Blanqueo
        agregarBotonClose()
        let nuevoParrafo1 = document.createElement('p');
        let nuevoInput1 = document.createElement('input');
        nuevoParrafo1.textContent = `Ingrese el nombre del ejercicio a eliminar`
        nuevoInput1.setAttribute('id',`input-nombreEjercicioAModificar`)
        crearBtn2Continuar()
        $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar2)
        setTimeout(function(){ //Sube el modal
            $('.modal').toggleClass('modal-close');})
        setTimeout(function(){ //Baja el modal
            $('.modal').toggleClass('modal-close');}, 300);
        btnContinuar2.addEventListener('click', () => { // Continuar
            let nombreEjercicioPorInput = document.getElementById('input-nombreEjercicioAModificar');
            nombreDeEjercicioIngresado = nombreEjercicioPorInput.value;
            console.log(nombreDeEjercicioIngresado)
            rutina[numeroDeSesionIngresada].ejercicios.forEach((ejercicio, i) => {
                if (ejercicio.nombre==nombreDeEjercicioIngresado) {
                    numeroDeEjercicioIngresado = i;
                }
            })
            console.log(numeroDeEjercicioIngresado)
            $('.modal').html(""); //Blanqueo
            let ultimoParrafo = document.createElement('p');
            ultimoParrafo.textContent = 'Ejercicio eliminado con éxito'            
            btnContinuar3 = document.createElement('button');
            btnContinuar3.textContent='Finalizar';
            $('.modal').append(ultimoParrafo, btnContinuar3);
            //Sube el modal
            setTimeout(function(){
                $('.modal').toggleClass('modal-close');})
            //Baja el modal
            setTimeout(function(){
                $('.modal').toggleClass('modal-close');}, 300)
                // Toca en Continuar 
            btnContinuar3.addEventListener('click', () => {
                setTimeout(function(){
                    $('.modal').toggleClass('modal-close');
                    setTimeout(function(){
                        modalContainer.classList.toggle('container-hidden');
                    }, 300);
                }, 300);
                
                rutina[numeroDeSesionIngresada].ejercicios.splice(numeroDeEjercicioIngresado, 1);
                localStorage.setItem('rutina', JSON.stringify(rutina));
                reemplazarSesiones();
                $('.modal').html("");
            });
        });
    });
};

function eliminarSesion() {
    //Creo los elementos del modal para pedir el numero de sesion en el cual crear el ejercicio
    let nuevoParrafo1 = document.createElement('p');
    let nuevoInput1 = document.createElement('input');
    nuevoParrafo1.textContent = `Ingrese el nombre de sesion a eliminar`
    nuevoInput1.setAttribute('id',`input-nombreSesionAModificar`)
    agregarBotonClose()
    // Creo el boton y lo agrego
    crearBtn1Continuar()
    $('.modal').append(nuevoParrafo1, nuevoInput1, btnContinuar1)
    //Pantalla gris
    setTimeout(function(){
        modalContainer.classList.toggle('container-hidden');}, 300)
    //Baja el modal
    setTimeout(function(){
        $('.modal').toggleClass('modal-close');}, 300)
    btnContinuar1.addEventListener('click', () => { //Continuar
        let nombreSesionPorInput = document.getElementById('input-nombreSesionAModificar');
        nombreDeSesionIngresado = nombreSesionPorInput.value;
        console.log(nombreDeSesionIngresado)
        rutina.forEach((sesion, i) => {
            if (sesion.nombre==nombreDeSesionIngresado) {
                numeroDeSesionIngresada = i;
            }
        })
        console.log(numeroDeSesionIngresada)
        $('.modal').html(""); //Blanqueo
        let ultimoParrafo = document.createElement('p');
        ultimoParrafo.textContent = 'Serie eliminada con éxito'
        btnContinuar2 = document.createElement('button');
        btnContinuar2.textContent='Finalizar';
        $('.modal').append(ultimoParrafo, btnContinuar2);
        setTimeout(function(){ //Sube el modal
            $('.modal').toggleClass('modal-close');})
        setTimeout(function(){ //Baja el modal
            $('.modal').classList.toggleClass('modal-close');}, 300)
            btnContinuar2.addEventListener('click', () => { // Continuar 
                setTimeout(function(){
                    $('.modal').toggleClass('modal-close');
                    setTimeout(function(){
                        modalContainer.classList.toggle('container-hidden');
                    }, 300)
                }, 300)
            rutina.splice(numeroDeSesionIngresada, 1);
            localStorage.setItem('rutina', JSON.stringify(rutina));
            reemplazarSesiones();
            $('.modal').html("")
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

/*FUNCIONES RENDER TABLA*/
// CALLBACK - Solo renderiza las tablas. No modifica el array rutina. No borra.
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
function borrarRutina() {
    rutina = [];
    localStorage.removeItem('rutina');
    borrarTablas();            
};
