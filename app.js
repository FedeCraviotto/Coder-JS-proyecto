

let rutina = {
    nombre: "",
    sesiones: []
}

function armarRutina() {
    
    let pedirNombreRutina = prompt('Nombre Rutina?')
    let pedirCantSesiones = parseInt(prompt('CantSesiones'));
    
    rutina.nombre = pedirNombreRutina
    
    for(let i=1; i<=pedirCantSesiones; i++) {
        
        let nombreSesion = prompt('Ingrese nombre de la sesión ' + i)
        rutina.sesiones.push({
            nombre:nombreSesion,
            ejercicios: []
        })
    };
    
    for (let i=0; i<rutina.sesiones.length; i++) {
        let pedirCantEjercicios = parseInt(prompt('Cantidad de Ejercicios para la sesión ' + (i+1) + ' ?'));
    for (let j=0; j<pedirCantEjercicios; j++){
        let nombreEj = prompt('Nombre del Ejercicio Nro ' + (j+1))
        rutina.sesiones[i].ejercicios.push(
            {
                nombre:nombreEj,
                pesosBase:[],
                seriesBase:[],
                seriesRealizadas:[],
                ultimosPesos:[],
                proximosPesos: [],
                proximasSeries:[]
            }
            );
        }
    }
    
    for (let i=0; i<rutina.sesiones.length; i++) {
        for (let j=0; j<rutina.sesiones[i].ejercicios.length; j++){ 
            let pedirSeries = parseInt(prompt('Cantidad de series para el ejercicio "' + rutina.sesiones[i].ejercicios[j].nombre + '" de la sesión "'+ rutina.sesiones[i].nombre + '"?' ));
            
            for(let k=1; k<=pedirSeries; k++) {
                let pedirRepsPorSerie = prompt('Ingresá el rango de repeticiones para la serie ' + k +  ' del Ejericicio ' + rutina.sesiones[i].ejercicios[j].nombre + '\nDos números separados por un espacio\nRepsMínimas-espacio-RepsMáximas');
                let arrayRangoReps = pedirRepsPorSerie.split(' ').map((string) => {
                    return parseInt(string);
                })
                rutina.sesiones[i].ejercicios[j].seriesBase.push(arrayRangoReps);
            }
            
            let pedirPesos = prompt('Ingresá los pesos para cada serie del ejercicio ' + rutina.sesiones[i].ejercicios[j].nombre + ', separados por espacios\nEjemplo 45 50 45 (peso-espacio-peso-espacio-peso)');
            let arrayDePesos = pedirPesos.split(' ').map((string) => {
                return parseInt(string);
            })
            rutina.sesiones[i].ejercicios[j].pesosBase = arrayDePesos;
                    
        }
    }
    
}

let nombreDeSesionDado = "";
let numeroDeSesion = 0;

function pedirSesion () {
    nombreDeSesionDado = prompt('Ingrese nombre de la sesión a modificar');
}


function obtenerIndice() {  
    for (let i=0; i<rutina.sesiones.length; i++) {
        if (rutina.sesiones[i].nombre==nombreDeSesionDado) {
            numeroDeSesion= i;
        }
    }
}

function anotarReps (num) {
    for (let i=0; i<rutina.sesiones[num].ejercicios.length; i++){ 
        let seriesPedidas = []
            for (let j=0; j<rutina.sesiones[num].ejercicios[i].seriesBase.length; j++) {

            seriesPedidas.push(parseInt(prompt('Ingresá la cantidad de repeticiones hechas para la serie número ' + (j+1) +  ' del ejercicio ' + rutina.sesiones[num].ejercicios[i].nombre + '.\nRecordá ingresar solo un número -por cada serie-')))
        }
        rutina.sesiones[num].ejercicios[i].seriesRealizadas = seriesPedidas;
    }
}

function ultimosBase(num) {
    for (let i=0; i<rutina.sesiones[num].ejercicios.length; i++) {
        rutina.sesiones[num].ejercicios[i].ultimosPesos = rutina.sesiones[num].ejercicios[i].pesosBase     
    }
}

function ultimosProximos(num) {
    for (let i=0; i<rutina.sesiones[num].ejercicios.length; i++) {
            rutina.sesiones[num].ejercicios[i].ultimosPesos = rutina.sesiones[num].ejercicios[i].proximosPesos
        
    }
}

function actualizarPesos(num) {
    for (let i=0; i<rutina.sesiones[num].ejercicios.length; i++) {
        let nuevosPesos = [];
        
        for (let j=0; j<rutina.sesiones[num].ejercicios[i].seriesRealizadas.length; j++) {
            
            if (rutina.sesiones[num].ejercicios[i].seriesRealizadas[j]>=rutina.sesiones[num].ejercicios[i].seriesBase[j][1]) {
                nuevosPesos.push(rutina.sesiones[num].ejercicios[i].ultimosPesos[j] + 5)
            } else {
                nuevosPesos.push(rutina.sesiones[num].ejercicios[i].ultimosPesos[j])
            }
        }
        rutina.sesiones[num].ejercicios[i].proximosPesos = nuevosPesos;
    }  
};

function actualizarSeries(num) {
    for (let i=0; i<rutina.sesiones[num].ejercicios.length; i++) {
        let nuevasRepeticiones = [];
        for (let j=0; j<rutina.sesiones[num].ejercicios[i].seriesRealizadas.length; j++) {
            if (rutina.sesiones[num].ejercicios[i].seriesRealizadas[j]>=rutina.sesiones[num].ejercicios[i].seriesBase[j][1]){
                nuevasRepeticiones.push(rutina.sesiones[num].ejercicios[i].seriesBase[j]);
            } else {
                let rango = [];
                rango.push(rutina.sesiones[num].ejercicios[i].seriesRealizadas[j])
                rango.push(rutina.sesiones[num].ejercicios[i].seriesBase[j][1]);
                nuevasRepeticiones.push(rango)
            }
            
        }
        rutina.sesiones[num].ejercicios[i].proximasSeries = nuevasRepeticiones;
    }
}

function mostrarProxima () {
    let proximaSesion = [];
    for (let i=0; i<rutina.sesiones[numeroDeSesion].ejercicios.length; i++){
        let {nombre, proximosPesos, proximasSeries} = rutina.sesiones[numeroDeSesion].ejercicios[i];
        let objEjercicio = {
            Ejercicio:nombre,
            proximosPesos: proximosPesos,
            proximasSeries: proximasSeries
        
        }
        proximaSesion.push(objEjercicio)
    }
    console.log(proximaSesion);
}

function anotarSesion(){
    pedirSesion ()
    obtenerIndice()
    anotarReps(numeroDeSesion) 
    }

function proximaSesionUnica () {
    pedirSesion ()
    obtenerIndice()
    ultimosBase(numeroDeSesion)
    actualizarPesos(numeroDeSesion)
    actualizarSeries(numeroDeSesion)
    mostrarProxima()
}

function proximaSesion () {
    pedirSesion ()
    obtenerIndice()
    ultimosProximos(numeroDeSesion)
    actualizarPesos(numeroDeSesion)
    actualizarSeries(numeroDeSesion)
    mostrarProxima()
}


// let rutina = {
//     nombre: "Mesociclo01",
//     sesiones: [
//         {
//             nombre:"Lunes",
//             ejercicios: [
//             {
//                 nombre:"Jalon",
//                 seriesBase: [[9,12], [9,12], [9,12]],
//                 pesosBase:[30, 35, 35],
//                 seriesRealizadas:[10, 15, 15],
//                 ultimosPesos: [30, 35, 35],
//                 proximosPesos: [35, 40, 35],
//                 proximasSeries:[[9, 12], [9, 12], [8, 12]]
//             },
//             {
//                 nombre:"Remo",
//                 seriesBase: [[6, 9], [6, 9]],
//                 pesosBase:[55, 60],
//                 seriesRealizadas:[10, 8],
//                 ultimosPesos: [55, 60],
//                 proximosPesos: [55, 60],
//                 proximasSeries:[[5, 9],[6, 9]]
//             }]
//         },
//          {   
//             nombre:"Martes",
//             ejercicios:[

//             {
//                 nombre:"Curl",
//                 seriesBase: [[9,12], [9,12], [9,12]],
//                 pesosBase:[30, 35, 35],
//                 seriesRealizadas:[13, 13, 11],
//                 ultimosPesos: [30, 35, 35],
//                 proximosPesos: [35, 40, 35],
//                 proximasSeries:[[9,12], [9, 12], [10, 12]]
//             },
//             {
//                 nombre:"Sentadillas",
//                 seriesBase: [[6, 9], [6, 9]],
//                 pesosBase:[55, 60],
//                 seriesRealizadas:[20, 3],
//                 ultimosPesos: [55, 60],
//                 proximosPesos: [60, 60],
//                 proximasSeries:[[6, 9], [3, 9]]
//             }
//         ]
//     }
// ]
// }



//EVENTOS

const btn_armarRutina = document.querySelector('#btn_armarRutina');

btn_armarRutina.addEventListener('click', armarRutina);

const btn_anotarReps = document.querySelector('#btn_anotarReps');

btn_anotarReps.addEventListener('click', anotarSesion);

const btn_proximaSesion = document.querySelector('#btn_proximaSesion');

btn_proximaSesion.addEventListener('click', proximaSesion);

const btn_proximaSesionUnica = document.querySelector('#btn_proximaSesionUnica');

btn_proximaSesionUnica.addEventListener('click', proximaSesionUnica);



/*
Display :

Todas las tablas solamente van a tener esas 4 columnas.
Sino, que las tablas de sesiones actuales tengan todo, y que las de proxima semana tengan solo las 4 columnas.

Subtitulo "Sesiones semana actual"
1 Tabla por sesión (Una para Lunes, otra para Martes, etc) va a tener los <th>

Y mediante DOM vamos a traer a la tabla (contenedor), y vamos a crear elementos <tr> con sus <td> y les vamos a hacer append.
Hasta ahí la tabla creada, vacía.

Después, vamos a poder traer cada <td> y con innerText, y la ayuda del forEach, vamos a poder llenarlas con los datos contenidos en cada objeto ejercicio.
Esto de a una tabla, interactuar con el numeroDeSesion. De la misma manera que pedimos y modificamos de a 1 sesión, el DOM que trabaje igual.

Subtitulo "Sesiones proxima semana"
Vamos a tener que replicar tantas tablas para esta sección, como sesiones haya.

Por último, modificar mostrarProxima() para que en vez de hacer un console.log del objeto, lo retorne, para almacenarlo en algún lugar y pasar los datos a la tabla a través del DOM

*/