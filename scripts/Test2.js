/*****************************************************************
 *****************INICIO PRE CARGA IMAGENES*************************
 ******************************************************************/

function preloader() {
    if (document.images) {
        img1 = new Image();
        img2 = new Image();
        img3 = new Image();
        drag1 = new Image();
        drag2 = new Image();
        drag3 = new Image();
        img1.src = '../imagenes/test2/circulo4.jpg';
        img2.src = '../imagenes/test2/cuadrado5.jpg';
        img3.src = '../imagenes/test2/triangulo6.jpg';
        drag1.src = '../imagenes/test2/cuadrado5.jpg';
        drag2.src = '../imagenes/test2/triangulo6.jpg';
        drag3.src = '../imagenes/test2/circulo4.jpg';
    }
    document.getElementById('img1').src = img1.src;
    document.getElementById('img2').src = img2.src;
    document.getElementById('img3').src = img3.src;
    document.getElementById('drag1').src = drag1.src;
    document.getElementById('drag2').src = drag2.src;
    document.getElementById('drag3').src = drag3.src;
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);

/*****************************************************************
 *********************FIN PRE CARGA IMAGENES *************************
 ******************************************************************/
