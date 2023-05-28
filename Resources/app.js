// Cargamos Modulos
global.params         = require("src/common/parametros");
global.colores        = require("src/common/colores");
global.Utiles         = require("src/common/utiles");
global.preloader      = require("src/common/preloader");
global.winLogin       = require("src/principal/ventanaLogin");
global.winMenu        = require("src/principal/ventanaMenu");

// Variables
global.mainView;
global.mainWindow;

// Control del Menu
global.paginaActual = 0;
global.controlPaginas = null;
global.imgHome;


// global.anchoPantalla = Ti.Platform.displayCaps.platformWidth;
// global.tipoNotificacion = 0;
// global.vistaNotificaciones;

// if(!params.isAndroid){
//   if(!Utiles.isSimulator()){
//       var core = require('firebase.core');
//       core.configure();
//   }
// }

// This is a single context application with multiple windows in a stack
(function() {
  mainWindow = require('src/principal/ApplicationWindow');
  new mainWindow().open();
})();
