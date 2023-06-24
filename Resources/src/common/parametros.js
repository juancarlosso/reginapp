// Variables Varias
var desarrollo      = "production"; // production // sandbox //
exports.desarrollo  = desarrollo;
exports.app_name    = "Abarrotes Regina";
exports.app_version = "0.0.1";
exports.isAndroid   =  ( Ti.Platform.osname=="android" ) ? true : false;
exports.temaVentana = 'Theme.AppCompat.NoTitleBar';

// Tipografias
exports.fuente_normal = "SFProRounded-Regular"; // CooperHewitt-Light";
exports.fuente_bold   = "SFProRounded-Bold"; // CooperHewitt-Semibold"

// url base para la api
var URLapi = "http://regina.jasoluciones.info";
if(desarrollo=='sandbox'){
  URLapi = "http://127.0.0.1:8000";
}

exports.URL = URLapi;
exports.API = URLapi + "/api/";
