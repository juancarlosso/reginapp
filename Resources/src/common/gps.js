//
//	gps.js
//	a3vte App
//
//	Created by Juan Carlos SO on 12/02/21.
//



/*
*
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function geoLocalizacion() {
  console.log('*** Verificamos permisos de gps');
  if(!Titanium.Geolocation.hasLocationPermissions( Titanium.Geolocation.AUTHORIZATION_ALWAYS ) ) {
      Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
           if(e.success) {
              console.log('*** Tenemos permisos');
              Ti.Geolocation.addEventListener("location", getLocation );
              Utiles.grabarOpcion('transmitir_coordenadas','S');
           }
           else{
              console.log('*** No hay permisos de Geolocalización');
              console.log('*** Interrumpiremos la transmisión de Coordenadas');
              Utiles.grabarOpcion('transmitir_coordenadas','N');
              Utiles.NotificacionBanner("danger","ERROR","No fue posible determinar tus coordenadas, revisa que tengas los permisos de geolocalización");
           }
       }) ;
  }
  else{
     console.log('*** Ya teniamos los permisos de gps');
     Utiles.grabarOpcion('transmitir_coordenadas','S');
     Ti.Geolocation.addEventListener("location", getLocation );
  }
}
exports.geoLocalizacion = geoLocalizacion;


/*
*
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function getLocation( e ){
  var index;
  if(e.success){
     latitud  = e.coords.latitude;
     longitud = e.coords.longitude;
  }
  else{
     console.log("*** Sin coordenadas");
     Utiles.NotificacionBanner('warning', 'Lo sentimos', "No fue posible detectar los permisos de geolocalización, verifica que los tengas activos");
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
function EnviarCoordenadasServidor(latitud,longitud){
    Ti.API.info("*** Enviando Coordenadas al Servidor");
    Ti.API.info("*** Al servidor de asistencia " + Utiles.obtenerOpcion('asistencia') );
    Ti.API.info("*** " + latitud + "," + longitud);
    var json = Utiles.obtenerJSON('datos');
    var peticionHTTP = Ti.Network.createHTTPClient({ timeout: 30000 });
    peticionHTTP.onerror = function(e) {
        Ti.API.info("*** Error al enviar las coordenadas");
        Ti.API.info(this.responseText);
    };
    peticionHTTP.onload = function() {
        Ti.API.info("*** Coordenadas registradas");
    };
    var url = params.API + "api/proveedor/actualizar-ubicacion";
    peticionHTTP.open("POST", url );
    peticionHTTP.setRequestHeader('Authorization', 'Bearer ' + json.access_token);
    peticionHTTP.send({
        'asistencia': Utiles.obtenerOpcion('asistencia'),
        'expediente': Utiles.obtenerOpcion('expediente'),
        lat: latitud,
        long: longitud,
    });
}
exports.EnviarCoordenadasServidor = EnviarCoordenadasServidor;