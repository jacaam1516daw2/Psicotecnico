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
        /*
        alert(ev.dataTransfer.getData("imatge"));
        alert(ev.target.id);
        */
        var pos = parseInt(ev.target.id.substring(3, 4));
        userArray[pos] = ev.dataTransfer.getData("imatge");

        ev.preventDefault();
        if (ev.target.nodeName !== "IMG") {
            var data = ev.dataTransfer.getData("imatge");
            ev.target.appendChild(document.getElementById(data));
        }
    }
};

/**
 * INICIO Cronometro
 */
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
/**
 * FI Cronometro
 */

/**
 * Base de datos localStorage
 */

/**
 * Esta función guarda el nombre y apellidos del usuario en la base de datos
 */

function guardarDatosIniciales() {
    // Guardamos el nombre y apellido en la base de datos del navegador
    localStorage.setItem("nombre", document.getElementById("nombre").value);
    localStorage.setItem("apellido", document.getElementById("apellido").value);
}

/**
 * Esta función guardados los datos en la base de datos del que realiza el test
 */
function mostrarDatos() {
    // Leemos los valores de las variables del navegador y las ponemos
    // en una variable para posteriormente mostrarlo en el navegador
    var nom = "Nombre: " + localStorage.getItem("nombre");
    nom += " " + localStorage.getItem("apellido");
    document.getElementById("nom").innerHTML = nom;
}

/**
 * Esta función guarda los datos de los resultados de cada uno de los test la base de datos
 */
function guardarTest(test) {
    switch (test.charAt(test.length)) {
    case 1:
        result[1] = "drag5";
        result[2] = "drag3";
        result[3] = "drag4";
        result[4] = "drag1";
        result[5] = "drag2";
        break;
    case 2:
        result[1] = "drag3";
        result[2] = "drag1";
        result[5] = "drag2";
        break;
    case 3:
        result[1] = "drag3";
        result[2] = "drag2";
        result[3] = "drag4";
        result[4] = "drag1";
        break;
    case 4:
        result[1] = "drag2";
        result[2] = "drag5";
        result[3] = "drag3";
        result[4] = "drag4";
        result[5] = "drag1";
        break;
    }
    resultTest(result, userArray);
    localStorage.setItem(test + "_crono", document.getElementById("crono").innerHTML);
    localStorage.setItem(test + "_result", OK);
    //localStorage.setItem(test + 'result', document.getElementById("result").value);
}

/**
 * Validación de Test
 */
function resultTest(result, userArray) {
    OK = true;
    for (i = 1; i < result.length; i++) {
        if (result[i] !== userArray[i]) {
            OK = false;
        }
    }
    result = [];
    userArray = [];
}

/**
 * Eliminamos toda la base de datos del navegador
 */
function eliminaBD() {
    localStorage.clear();
}

/**
 * Resultado test
 */
function resultado() {
    var resultado = "";
    var cont = 1;
    var tiempo = "";
    var nom = localStorage.getItem("nombre");
    nom += " " + localStorage.getItem("apellido");
    document.getElementById("nom").innerHTML = nom;

    /*
        localStorage.getItem(test + "_crono");
      localStorage.getItem(test + "_result");
      */

    while (localStorage.getItem('test' + cont + '_result') != null) {
        var corno = localStorage.getItem('test' + cont + '_crono');
        var result = localStorage.getItem('test' + cont + '_result');
        resultado = resultado + 'Test ' + cont + ' = ' + corno + " " + result + "<br>";
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
