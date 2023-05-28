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

   // creamos el controlador de paginas
   controlPaginas = Ti.UI.createScrollableView({
       backgroundColor: colores.fondo2,
       scrollingEnabled: false,
       width: Ti.UI.FILL,
       height: Ti.UI.FILL,
       views: [ vistaHome, vistaDummy, vistaDummy, vistaDummy ],
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
   var contieneHome = Ti.UI.createView({ width: '19%', height: Ti.UI.FILL  });
   contieneHome.addEventListener("click", function(){  cambiarPagina(0); cambiarMenuActual(); })
   imgHome = Ti.UI.createImageView({ image: "/images/menuInferior/homeOFF.png", height: 27, width: 27 });
   contieneHome.add(imgHome);
   contenedorMenu.add(contieneHome);



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
      case 0: imgHome.setImage( "/images/menuInferior/homeON.png" ); break;
      case 1:
      case 2:
      case 3:
      case 4:
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
    imgHome.setImage("/images/menuInferior/homeOFF.png");
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