window.onload = function () {

    var divs = document.querySelectorAll('div');
    [].forEach.call(divs, function (item) {
        item.addEventListener('dragover', gestionarSobreDrag, false);
        item.addEventListener('drop', gestionarDrop, false);
    });

    var imatges = document.querySelectorAll('img');
    [].forEach.call(imatges, function (item) {
        item.addEventListener('dragstart', gestionarIniciDrag, false);
    });

    function gestionarSobreDrag(ev) {
        ev.preventDefault();
    }

    function gestionarIniciDrag(ev) {
        ev.dataTransfer.setData("imatge", ev.target.id);

    }

    function gestionarDrop(ev) {
        // Cada vez que el usuario suelta un elemento lo guardamos en un array
        // marcamos la posición segun el id del elemento por si corrige un elemento cambiandolo de posicion
        // le restamos -1 para que en la validación del test coincidan las posiciones
        var pos = parseInt(ev.target.id.substring(3, 4));
        userArray[pos - 1] = ev.dataTransfer.getData("imatge");

        ev.preventDefault();
        // este condicional es para que no se puedan superponer varias imagenes en un elemento
        if (ev.target.nodeName !== "IMG") {
            var data = ev.dataTransfer.getData("imatge");
            ev.target.appendChild(document.getElementById(data));
        }
    }
};

/*****************************************************************
 ********************* INICIO Cronometro *************************
 ******************************************************************/
var OK = true;
var inicio = 0;
var timeout = 0;
var result = "";
var userArray = [];
var result = [];

function cronometro() {
    mostrarDatos();

    if (timeout == 0) {
        // iniciamos el proceso
        inicio = new Date().getTime()
        funcionando();
    }
}

function funcionando() {
    // obteneos la fecha actual
    var actual = new Date().getTime();

    // obtenemos la diferencia entre la fecha actual y la de inicio
    var diff = new Date(actual - inicio);

    // mostramos la diferencia entre la fecha actual y la inicial
    result = LeadingZero(diff.getUTCHours()) + ":" + LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds());
    document.getElementById('crono').innerHTML = result;
    // Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
    timeout = setTimeout("funcionando()", 1000);
}

/* Funcion que pone un 0 delante de un valor si es necesario */
function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : +Time;
}
/*****************************************************************
 ********************* FIN Cronometro *************************
 ******************************************************************/

/*******************************************************************
 ************** INICIO GESTION LOCALSTRAGE y VALIDACION TEST *******
 *******************************************************************/

/**
 * Esta función guarda el nombre y apellidos del usuario en la base de datos localStorage
 */
function guardarDatosIniciales() {
    // Guardamos el nombre y apellido en la base de datos del navegador
    localStorage.setItem("nombre", document.getElementById("nombre").value);
    localStorage.setItem("apellido", document.getElementById("apellido").value);
}

/**
 * Esta función muestra los datos por pantalla de localStorage mientras realizas el test
 */
function mostrarDatos() {
    // Leemos los valores de las variables del navegador del localStorage y las mostramos por pantalla mientras realizamos el test
    document.getElementById("nom").innerHTML = "Nombre: " + localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
}


/**
 *******************************************************************
 ************************ INICIO VALIDACION TEST *******************
 *******************************************************************
 * Esta función guarda los datos de los resultados de cada uno de los test en localStorage
 */
function guardarTest(test) {
    //Con este switch llenamos result con las respuestas correctas del test
    switch (test) {
    case 'test1':
        result = ["drag5", "drag3", "drag4", "drag1", "drag2"];
        break;
    case 'test2':
        result = ["drag3", "drag1", "drag2"];
        break;
    case 'test3':
        result = ["drag3", "drag2", "drag4", "drag1"];
        break;
    case 'test4':
        result = ["drag2", "drag5", "drag3", "drag4", "drag1"];
        break;
    }

    // Llamamos a la funcion que coteja el resultado correcto que contiene la array result
    // con la que hemos llenado cada vez que el usuario ha soltado un elemento
    resultTest(result, userArray);
    // Guardamos el resultado de cada test en localStorage
    // ejemplo de lo que guarda: test1_crono = 00:00:05
    // ejemplo de lo que guarda: test1_result = true o false
    localStorage.setItem(test + "_crono", document.getElementById("crono").innerHTML);
    localStorage.setItem(test + "_result", OK);
}

/**
 * Validación de cada Test
 */
function resultTest(result, userArray) {
    OK = true;
    // recorremos el array de resultados correctos que previamente hemos llenado en la funcion guardarTest
    //  y lo comparamos con la posicion de i con el array que se ha llenado cada vez que el usuario
    // soltaba un elemento en la funcion gestionarDrop
    for (i = 0; i < result.length; i++) {
        if (result[i] !== userArray[i]) {
            OK = false;
        }
    }

    //reinicializamos los arrays
    result = [];
    userArray = [];
}

/*****************************************************************
 ************************ FIN VALIDACION TEST **********************
 *******************************************************************/

/**
 * Eliminamos toda la base de datos del navegador
 */
function eliminaBD() {
    //cada vez que iniciamos un test eliminamos los datos anteriores
    localStorage.clear();
}

/*****************************************************************
 ************************ INICIO RESULTADO TEST ******************
 *****************************************************************/

/**
 * Resultado test pantalla final
 */
function resultado() {
    var resultado = "";
    var cont = 1;
    var tiempo = "";
    var nom = localStorage.getItem("nombre");
    nom += " " + localStorage.getItem("apellido");
    document.getElementById("nom").innerHTML = nom;

    // Mientras exsistan elementos en localStorage los introducimos en una variable que pintaremos por pantalla
    while (localStorage.getItem('test' + cont + '_result') != null) {
        var corno = localStorage.getItem('test' + cont + '_crono');
        var result = localStorage.getItem('test' + cont + '_result');
        if (result) {
            result = "<img class='result' src='imagenes/OK.png'><br>";
        } else {
            result = "<img class='result' src='imagenes/KO.png'><br>";
        }
        resultado = resultado + 'Test ' + cont + ' = ' + corno + " " + result;
        //tiempo = calculaTiempoTotal(tiempo, localStorage.getItem("test" + cont + '_crono'));
        cont++;
    }

    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("tiempo").innerHTML = tiempo;
}

function calculaTiempoTotal(tempsA, TempsB) {
    var temps = stringToSeconds(tempsA) + stringToSeconds(TempsB);
    return temps;
}

function stringToSeconds(tiempo) {
    var sep1 = tiempo.indexOf(":");
    var sep2 = tiempo.lastIndexOf(":");
    var hor = tiempo.substr(0, sep1);
    var min = tiempo.substr(sep1 + 1, sep2 - sep1 - 1);
    var sec = tiempo.substr(sep2 + 1);
    return (Number(sec) + (Number(min) * 60) + (Number(hor) * 3600));
}

/*****************************************************************
 ************************ FIN RESULTADO TEST *********************
 *****************************************************************/
