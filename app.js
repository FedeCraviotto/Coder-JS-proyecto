let rutina;
if (localStorage.getItem('rutina')){
    rutina = JSON.parse(localStorage.getItem('rutina'));
} else {
    rutina = [];
}
let nombreDeSesionIngresado = ""; 
let numeroDeSesionIngresada = 0;
let nombreDeEjercicioIngresado = "";
let numeroDeEjercicioIngresado = 0;

// Da contenido al array rutina. Actualiza storage. Renderiza.
function crearSesiones() {

    let salir = confirm('A continuación vamos a agregar sesiones, desea continuar?')
    if (!salir) {return}

    let pedirCantSesiones = parseInt(prompt('¿Cuantos días a la semana vas a entrenar?.\nVamos a armar 1 sesión por cada día de entrenamiento. Si no querés que tome mucho tiempo, podés solamente probar con 2 sesiones de 2 ejercicios cada una.\n\nIngresá la cantidad de sesiones para tu rutina.\nTiene que ser un número. Generalmente no son más de 4.\nEn el próximo paso podrás ponerle nombre a cada sesión'));
    
    for(let i=1; i<=pedirCantSesiones; i++) {
        
        let nombreSesion = prompt('Ingresa un nombre para la sesión ' + i + '\nDebe ser un string')
        rutina.push({
            nombre:nombreSesion,
            ejercicios: []
        })
    };

    rutina.forEach((cadaSesion, i) => {
        let cantidadEjercicios = parseInt(prompt('Ingresa la cantidad de ejercicios que quieres realizar en la sesión ' + (i+1) + '\nDebe ser un número'));
        for (let i=0; i<cantidadEjercicios; i++){
            let nombreEjercicio = prompt('Ingresa el nombre del Ejercicio Nro ' + (i+1) + '\nDebe ser un string')
            cadaSesion.ejercicios.push(
                {
                    nombre:nombreEjercicio,
                    seriesBase:[],
                    seriesRealizadas:[],
                    ultimosPesos:[],
                    proximosPesos: [],
                    proximasSeries:[]
                }
                );
            }
    })

salir = confirm('Desea continuar?')
if (!salir) {return}

rutina.forEach((cadaSesion) => {

    cadaSesion.ejercicios.forEach((ejercicio) => {

        let cantidadSeries = parseInt(prompt('¿Cuantas series de  "' + ejercicio.nombre + '" vas a querer hacer por sesión?.\nIngresá un número'));
        for(let i=1; i<=cantidadSeries; i++) {
            let rangoRepeticionesPorSerie = prompt('Ingresá los rangos para cada serie.\n\nVoy a pedirte que ingreses dos numeros:\nPrimero el mínimo de repeticiones, luego un espacio, y luego el máximo de repeticiones que vas a queres hacer para la serie ' + i +  ' del Ejericicio ' + ejercicio.nombre + '\n\nPor ejemplo:\nSi quisieras realizar mínimo 8 y máximo 15 para esa serie, deberías ingresar "8 15", es decir "ocho espacio quince"\nRepsMínimas-espacio-RepsMáximas');
            let arrayRangoReps = rangoRepeticionesPorSerie.split(' ').map((string) => {
                return parseInt(string);
            })
            ejercicio.seriesBase.push(arrayRangoReps);
        }
        let pedirPesos = prompt('Ingresá de una sola vez, todos los pesos iniciales para cada serie del ejercicio ' + ejercicio.nombre + '.\n\nPor ejemplo, si voy a hacer 2 series para mi ejercicio, y quisiera levantar 50 kilos en la primera serie y 60 kilos en la segunda, debería ingresarlo de la siguiente manera: "50 60".\nEs decir peso-espacio-peso\n\nTe recuerdo que al ejercicio ' + ejercicio.nombre + ' le asignaste una cantidad de ' + ejercicio.seriesBase.length  + ' series.');
        let arrayDePesos = pedirPesos.split(' ').map((string) => {
            return parseInt(string);
        })
        ejercicio.proximosPesos = arrayDePesos;
    })
})
localStorage.setItem('rutina', JSON.stringify(rutina))
crearTablas()
alert('Rutina creada exitosamente!')
}

function pedirSesion () {
    let userInput = prompt('Ingrese nombre de la sesión a modificar, agregar, o eliminar\nDebe ser un string.')
    nombreDeSesionIngresado = userInput;
}

function obtenerIndice() {  
    rutina.forEach((sesion, i) => {
        if (sesion.nombre==nombreDeSesionIngresado) {
            numeroDeSesionIngresada = i;
        }
    })
}

function pedirEjercicio () {
    let userInput = prompt('Ingrese nombre del ejercicio a modificar, agregar, o eliminar\nDebe ser un string.');
    if (userInput != '' && userInput != null) {
        nombreDeEjercicioIngresado = userInput;
       };
}

function obtenerIndiceEjercicio() {  
    rutina.forEach((sesion) => {
        sesion.ejercicios.forEach((ejercicio, i) => {
            if (ejercicio.nombre==nombreDeEjercicioIngresado) {
                numeroDeEjercicioIngresado = i;
            }

        })
    })
}

function anotarReps (num) {
    rutina[num].ejercicios.forEach((ejercicio) => {
        let repeticionesHechas = []
        ejercicio.seriesBase.forEach((serie, i) => {
            repeticionesHechas.push(parseInt(prompt('Ingresá la cantidad de repeticiones que hiciste en la serie número ' + (i+1) +  ' del ejercicio ' + ejercicio.nombre + '.\nDebes ingresar un solo número')))
        })
        ejercicio.seriesRealizadas = repeticionesHechas;
    })
localStorage.setItem('rutina', JSON.stringify(rutina))
}

// Modifica el array rutina. Actualiza storage. Borra y renderiza.
    function anotarRepeticiones(){
        pedirSesion ()
        obtenerIndice()
        anotarReps(numeroDeSesionIngresada) 
        localStorage.setItem('rutina', JSON.stringify(rutina))
        reemplazarSesiones()
        }

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

// Modifica el array rutina. Actualiza storage. Borra y renderiza.
function generarProximaSesion () {
    pedirSesion ()
    obtenerIndice()
    equipararUltimosPesosConProximos(numeroDeSesionIngresada)
    actualizarPesos(numeroDeSesionIngresada)
    actualizarSeries(numeroDeSesionIngresada)
    localStorage.setItem('rutina', JSON.stringify(rutina))
    reemplazarSesiones()
}






// function mostrarProximaSesion (num) {
//     let proximaSesion = [];
//     rutina[num].ejercicios.forEach((ejercicio) => {
//         let {nombre, proximosPesos, proximasSeries} = ejercicio;
//         let datosDeCadaEjercicio = {
//             Ejercicio:nombre,
//             proximosPesos: proximosPesos,
//             proximasSeries: proximasSeries
        
//         }
//         proximaSesion.push(datosDeCadaEjercicio)
//     })
//     console.log(proximaSesion);
// }




/*Objeto final, luego de actualizados los pesos y repeticiones, y hasta antes de mostrarSesion()*/
// let rutina = [
//     {
//         nombre:"Lunes",
//         ejercicios: [
//               {
//                 nombre: "Jalon",
//                 seriesBase: [[8, 12],[8, 12],[10, 20]],
//                 seriesRealizadas: [12, 15, 20],
//                 ultimosPesos: [30, 35, 40],
//                 proximosPesos: [35, 40, 45],
//                 proximasSeries: [[8, 12],[8, 12],[10, 20]],
//               },
//               {
//                 nombre: "Remo",
//                 seriesBase: [[6, 9], [6, 9]],
//                 seriesRealizadas: [13, 5],
//                 ultimosPesos: [50, 55],
//                 proximosPesos: [55, 55],
//                 proximasSeries: [[6, 9], [5, 9]],
//               }
//         ]
//     },
//     {
//         nombre:"Martes",
//         ejercicios: [
//             {
//                 nombre: "Sentadilla",
//                 seriesBase: [[7, 5], [7, 5], [8, 12]],
//                 seriesRealizadas: [],
//                 ultimosPesos: [],
//                 proximosPesos: [50, 60, 60],
//                 proximasSeries: [],
//               }
//         ]
//     }
// ];