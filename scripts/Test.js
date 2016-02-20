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

        var image = document.getElementById(ev.dataTransfer.getData("imatge")).src;
        var origen = image.substring(image.length - 5, image.length - 4);
        var destino = parseInt(ev.target.id.substring(3, 4));

        ev.preventDefault();
        // este condicional es para que no se puedan superponer varias imagenes en un elemento

        if (ev.target.nodeName !== "IMG") {
            if (origen == destino) {
                document.getElementById('resultado').innerHTML = "<img class='result' src='/imagenes/OK.png'>";
                var data = ev.dataTransfer.getData("imatge");
                ev.target.appendChild(document.getElementById(data));
                conta = conta + 1;
                if (parseInt(conta) == parseInt(finish)) {
                    document.getElementById('button').disabled = false;
                }
            } else {
                document.getElementById('resultado').innerHTML = "<img class='result' src='/imagenes/KO.png'>";
            }
        }
    }
};

/*****************************************************************
 ********************* INICIO Cronometro *************************
 ******************************************************************/
var inicio = 0;
var timeout = 0;
var result = "";
var finish = 0;
var conta = 0;

function cronometro(aciertos) {
    /* Ejecutamos la funcion updateReloj() al cargar la pagina */
    updateReloj();
    finish = aciertos;
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

/* Determinamos el tiempo total en segundos */
var totalTiempo = 0;
if (sessionStorage.getItem("CuentaAtras") != null) {
    totalTiempo = sessionStorage.getItem("CuentaAtras");
} else {
    totalTiempo = 180;
}

var timestampStart = new Date().getTime();
var endTime = timestampStart + (totalTiempo * 1000);
var timestampEnd = endTime - new Date().getTime();

/* Variable que contiene el tiempo restante */
var tiempRestante = totalTiempo;

function updateReloj() {
    if (tiempRestante > 0) {
        var Seconds = tiempRestante;

        var Days = Math.floor(Seconds / 86400);
        Seconds -= Days * 86400;

        var Hours = Math.floor(Seconds / 3600);
        Seconds -= Hours * (3600);

        var Minutes = Math.floor(Seconds / 60);
        Seconds -= Minutes * (60);

        var TimeStr = ((Days > 0) ? Days + " dias " : "") + LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds);
        /* Este muestra el total de hora, aunque sea superior a 24 horas */
        //var TimeStr = LeadingZero(Hours+(Days*24)) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds);

        document.getElementById("CuentaAtras").innerHTML = TimeStr;
        if (endTime <= new Date().getTime()) {
            document.getElementById("CuentaAtras").innerHTML = "00:00:00";
        } else {
            /* Restamos un segundo al tiempo restante */
            tiempRestante -= 1;
            /* Ejecutamos nuevamente la función al pasar 1000 milisegundos (1 segundo) */
            setTimeout("updateReloj()", 1000);
        }
    } else {
        window.location.href = "/tests/TimeOut.html";
    }
}

/*****************************************************************
 ********************* FIN Cronometro *************************
 ******************************************************************/

/*******************************************************************
 ************** INICIO GESTION LOCALSTRAGE y VALIDACION TEST *******
 *******************************************************************/

/**
 * Esta función guarda el nombre y apellidos del usuario en la base de datos sessionStorage
 */
function guardarDatosIniciales() {
    if (typeof (Storage) !== "undefined") {
        // suportat
        sessionStorage.clear();
        // Guardamos el nombre y apellido en la base de datos del navegador
        sessionStorage.setItem("nombre", document.getElementById("nombre").value);
        sessionStorage.setItem("apellido", document.getElementById("apellido").value);
    } else {
        // no suportat
    }
}

/**
 * Esta función muestra los datos por pantalla de sessionStorage mientras realizas el test
 */
function mostrarDatos() {
    // Leemos los valores de las variables del navegador del sessionStorage y las mostramos por pantalla mientras realizamos el test
    document.getElementById("nom").innerHTML = "Nombre: " + sessionStorage.getItem("nombre") + " " + sessionStorage.getItem("apellido");
}


/**
 * Esta función guarda los datos de los resultados de cada uno de los test en sessionStorage
 */
function guardarTest(test) {
    conta = 0;
    // Guardamos el resultado de cada test en sessionStorage
    // ejemplo de lo que guarda: test1_crono = 00:00:05
    // ejemplo de lo que guarda: test1_result = true o false
    sessionStorage.setItem(test + "_crono", document.getElementById("crono").innerHTML);
    sessionStorage.setItem("CuentaAtras", calculaTiempoTotal(document.getElementById("CuentaAtras").innerHTML));
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
    var tiempo = 0;
    var nom = sessionStorage.getItem("nombre");
    nom += " " + sessionStorage.getItem("apellido");
    document.getElementById("nom").innerHTML = nom;
    // Mientras exsistan elementos en sessionStorage los introducimos en una variable que pintaremos por pantalla
    while (sessionStorage.getItem('test' + cont + '_crono') != null) {
        var crono = sessionStorage.getItem('test' + cont + '_crono');
        resultado = resultado + 'Test ' + cont + ' = ' + crono + " <img class='result' src='/imagenes/OK.png'><br>";
        tiempo = parseInt(tiempo) + parseInt(calculaTiempoTotal(crono));
        cont++;
    }

    var min = 0;
    var seg = 0;

    if (tiempo > 60) {
        tiempo = tiempo / 60;
        tiempo = (tiempo.toFixed(2)).toString();
        var elem = tiempo.split('.');
        min = elem[0];
        seg = elem[1];
        tiempo = "00:" + ((min < 10) ? "0" + min : min) + ":" + ((seg < 10) ? "0" + seg : seg);
    } else {
        tiempo = "00:" + "00:" + ((tiempo < 10) ? "0" + tiempo : tiempo);
    }

    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("tiempo").innerHTML = tiempo;
}

function calculaTiempoTotal(crono) {
    var sep1 = crono.indexOf(":");
    var sep2 = crono.lastIndexOf(":");
    var hor = crono.substr(0, sep1);
    var min = crono.substr(sep1 + 1, sep2 - sep1 - 1);
    var sec = crono.substr(sep2 + 1);

    return (Number(sec) + (Number(min) * 60) + (Number(hor) * 3600));
}

/*****************************************************************
 ************************ FIN RESULTADO TEST *********************
 *****************************************************************/
