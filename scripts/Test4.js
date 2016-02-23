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
        drag4 = new Image();
        drag5 = new Image();
        img1.src = '../imagenes/test4/dom1.png';
        img2.src = '../imagenes/test4/dom3.png';
        img3.src = '../imagenes/test4/dom5.png';
        drag1.src = '../imagenes/test4/dom5.png';
        drag2.src = '../imagenes/test4/dom1.png';
        drag3.src = '../imagenes/test4/dom3.png';
        drag4.src = '../imagenes/test4/dom4.png';
        drag5.src = '../imagenes/test4/dom2.png';
    }
    document.getElementById('img1').src = img1.src;
    document.getElementById('img2').src = img2.src;
    document.getElementById('img3').src = img3.src;
    document.getElementById('drag1').src = drag1.src;
    document.getElementById('drag2').src = drag2.src;
    document.getElementById('drag3').src = drag3.src;
    document.getElementById('drag4').src = drag4.src;
    document.getElementById('drag5').src = drag5.src;
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
