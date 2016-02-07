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
        ev.preventDefault();
        var data = ev.dataTransfer.getData("imatge");
        ev.target.appendChild(document.getElementById(data));
    }
};

/**
 * INICIO Cronometro
 */

var inicio = 0;
var timeout = 0;
var result = "";

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
    alert(result);
    localStorage.setItem(test + 'crono', result);
    //localStorage.setItem(test + 'result', document.getElementById("result").value);
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

    while (localStorage.getItem("test" + cont + 'crono') != null || localStorage.getItem("test" + cont + 'crono') != undefined) {
        resultado = resultado + "Test " + cont + ' = ' + localStorage.getItem("test" + cont + 'crono') + "<br>";
        //tiempo = tiempo + localStorage.getItem("test" + cont + 'crono');
        cont++;
    }
    document.getElementById("resultado").innerHTML = resultado;
}
