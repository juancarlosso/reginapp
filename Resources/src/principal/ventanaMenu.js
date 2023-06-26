var lblTotal;
var lblEfectivo;
var lblTarjeta;


var controlPaginas;
/*
 *
 * @brief
 * @author Juan Carlos Salinas Ojeda
 * @param string
 * @return
 *
 */
var MostrarMenu = function(mainView, win) {

    index = 0;
    win.backgroundColor = colores.fondo2;
    mainView.removeAllChildren();

    // Creamos la vista de home
    var objHome   = require("/src/vistas/home");
    var vistaHome = new objHome();

    var contenedor = Ti.UI.createView({
           top:0,
           bottom: '97%',
           width: Ti.UI.FILL,
           height: '97%',
           backgroundColor:
           colores.fondo
    });
    mainView.add(contenedor);

   var vistaDummy = Ti.UI.createView({ width: Ti.UI.FILL, height: Ti.UI.FILL });
   var vistaConfig = require('/src/vistas/configuracion/principal').show();

   // creamos el controlador de paginas
   controlPaginas = Ti.UI.createScrollableView({
       backgroundColor: colores.fondo2,
       scrollingEnabled: false,
       width: Ti.UI.FILL,
       height: Ti.UI.FILL,
       views: [ vistaHome, vistaDummy, vistaDummy, vistaDummy, vistaConfig ],
       showPagingControl: false
   });
   contenedor.add(controlPaginas);

   // Contenedor del menu
   var contenedorMenu = Ti.UI.createView({
      top: '90%',
      width: '95%',
      bottom: 10 ,
      backgroundColor: colores.blanco,
      layout: 'horizontal',
      borderRadius: 20,
   });
   mainView.add(contenedorMenu);


   // Home
   var contieneHome = Ti.UI.createView({ width: '25%', height: Ti.UI.FILL  });
   contieneHome.addEventListener("singletap", function(){  cambiarPagina(0); cambiarMenuActual(); })
   imgHome = Ti.UI.createImageView({ image: "/images/menuInferior/homeOFF.png", height: 27, width: 27 });
   contieneHome.add(imgHome);
   contenedorMenu.add(contieneHome);

   //
   var contieneNOSE1 = Ti.UI.createView({ width: '25%', height: Ti.UI.FILL  });
   contieneNOSE1.addEventListener("singletap", function(){  cambiarPagina(1); cambiarMenuActual(); })
   imgNOSE1 = Ti.UI.createImageView({ image: "/images/menuInferior/noseOFF.png", height: 27, width: 27 });
   contieneNOSE1.add(imgNOSE1);
   contenedorMenu.add(contieneNOSE1);

   //
   var contieneNOSE2 = Ti.UI.createView({ width: '24%', height: Ti.UI.FILL  });
   contieneNOSE2.addEventListener("singletap", function(){  cambiarPagina(2); cambiarMenuActual(); })
   imgNOSE2 = Ti.UI.createImageView({ image: "/images/menuInferior/noseOFF.png", height: 27, width: 27 });
   contieneNOSE2.add(imgNOSE2);
   contenedorMenu.add(contieneNOSE2);

   //
   var contieneConfig = Ti.UI.createView({ width: '25%', height: Ti.UI.FILL  });
   contieneConfig.addEventListener("singletap", function(){  cambiarPagina(4); cambiarMenuActual(); })
   imgConfig = Ti.UI.createImageView({ image: "/images/menuInferior/noseOFF.png", height: 27, width: 27 });
   contieneConfig.add(imgConfig);
   contenedorMenu.add(contieneConfig);

   // Revisamos cual es la opcion actual, para mostrarla
   cambiarMenuActual();

};
exports.MostrarMenu = MostrarMenu;



/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function cambiarMenuActual() {
   apagarTodoElMenu();
   switch(paginaActual){
      case 0: imgHome.image   = "/images/menuInferior/homeON.png"; break;
      case 1: imgNOSE1.image  = "/images/menuInferior/noseON.png"; break;
      case 2: imgNOSE2.image  = "/images/menuInferior/noseON.png"; break;
      case 3: imgConfig.image = "/images/menuInferior/configON.png"; break;
   }
}

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function apagarTodoElMenu(){
    imgHome.image = "/images/menuInferior/homeOFF.png";
    imgNOSE1.image = "/images/menuInferior/noseOFF.png";
    imgNOSE2.image = "/images/menuInferior/noseOFF.png";
    imgConfig.image = "/images/menuInferior/configOFF.png";
}

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function cambiarPagina(pagina){

   if(pagina==paginaActual){
     return false;
   }
   paginaActual = pagina;
   controlPaginas.currentPage = paginaActual ;
}