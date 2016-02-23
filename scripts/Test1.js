/*****************************************************************
 *****************INICIO PRE CARGA IMAGENES*************************
 ******************************************************************/

function preloader() {
    if (document.images) {
        img4 = new Image();
        img5 = new Image();
        img2 = new Image();
        img3 = new Image();
        img1 = new Image();
        img4.src = '../imagenes/test1/anim4.png';
        img5.src = '../imagenes/test1/anim5.png';
        img2.src = '../imagenes/test1/anim2.png';
        img3.src = '../imagenes/test1/anim3.png';
        img1.src = '../imagenes/test1/anim1.png';
    }
    document.getElementById('drag1').src = img4.src;
    document.getElementById('drag2').src = img5.src;
    document.getElementById('drag3').src = img2.src;
    document.getElementById('drag4').src = img3.src;
    document.getElementById('drag5').src = img1.src;
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
