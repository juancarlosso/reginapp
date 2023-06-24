import NotificationBanner from 'ti.notificationbanner';

/*
*
* @brief  Funcion que sirve para determinar si el dispositivo cuenta con notch
* @author Juan Carlos Salinas Ojeda
* @return true/false
*
*/
exports.hasIOSNotch = function(){
 if( Ti.Platform.osname=="android" ){
    return false;
 }
 if (
     // iPhone X/Xs/XR
     // iPhone X/Xs/XR/12 mini
     Ti.Platform.displayCaps.platformWidth === 375 &&
     Ti.Platform.displayCaps.platformHeight === 812 &&
     (Ti.Platform.displayCaps.logicalDensityFactor === 3 || Ti.Platform.displayCaps.logicalDensityFactor === 2)) {
     return true;
 }
 if (
     // iPhone XR/XS max
     Ti.Platform.displayCaps.platformWidth === 414 &&
     Ti.Platform.displayCaps.platformHeight === 896 &&
     ( Ti.Platform.displayCaps.logicalDensityFactor === 2 || Ti.Platform.displayCaps.logicalDensityFactor === 3) ) {
     return true;
 }

 if (
     // iPhone 12/12 Pro
     // iPhone 13/13 Pro
     // iPhone 14
     Ti.Platform.displayCaps.platformWidth === 390 &&
     Ti.Platform.displayCaps.platformHeight === 844 &&
     (Ti.Platform.displayCaps.logicalDensityFactor === 2 || Ti.Platform.displayCaps.logicalDensityFactor === 3)) {
     return true;
 }

 if (
     // iPhone 12 Pro max
     // iPhone 13 Pro max
     // iPhone 14 Plus
     Ti.Platform.displayCaps.platformWidth === 428 &&
     Ti.Platform.displayCaps.platformHeight === 926 &&
     (Ti.Platform.displayCaps.logicalDensityFactor === 3)) {
     return true;
 }

 if (
      // iPhone 14 Pro
      Ti.Platform.displayCaps.platformWidth === 393 &&
      Ti.Platform.displayCaps.platformHeight === 852 &&
      (Ti.Platform.displayCaps.logicalDensityFactor === 3)) {
      return true;
  }

  if (
      // iPhone 14 Pro Max
      Ti.Platform.displayCaps.platformWidth === 430 &&
      Ti.Platform.displayCaps.platformHeight === 932 &&
      (Ti.Platform.displayCaps.logicalDensityFactor === 3)) {
      return true;
  }

 return false;
}
/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
exports.Left = function(str, n){
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0,n);
}
/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
exports.Right = function(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
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
exports.FechaCadena = function( fecha ) {
  // 0123456789012345678
  // 0000-00-00 00:00:00
  if(fecha==null){
    return "-";
  }
  var axo = fecha.substring(0,4);
  var mes = fecha.substr(5,2);
  var dia = fecha.substr(8,2);
  var fec = dia + "/" + ObtieneMes(mes) + "/" + axo;
  var hrs = "";
  if( fecha.substr(13, 1) == ":" ) {
      hrs = fecha.substr(10,6);
  }
  fec = fec + hrs ;
  return fec;
}
function ObtieneMes(mes) {
   var texto="";
   switch(mes)  {
       case '01': texto = "Ene"; break;
       case '02': texto = "Feb"; break;
       case '03': texto = "Mar"; break;
       case '04': texto = "Abr"; break;
       case '05': texto = "May"; break;
       case '06': texto = "Jun"; break;
       case '07': texto = "Jul"; break;
       case '08': texto = "Ago"; break;
       case '09': texto = "Sep"; break;
       case '10': texto = "Oct"; break;
       case '11': texto = "Nov"; break;
       case '12': texto = "Dic"; break;
   }
   return texto;
}
/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var obtenerOpcion = function (parametro) {
  var valor;
  valor  = Ti.App.Properties.getString( parametro );
  if(valor==null){
    valor = "";
  }
  return valor;
}
exports.obtenerOpcion = obtenerOpcion;
/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var grabarOpcion = function( tipo, valor ) {
  if(typeof(valor)!='string'){
    valor = valor.toString();
  }
  valor = valor.trim();
  Ti.App.Properties.setString( tipo, valor );
}
exports.grabarOpcion = grabarOpcion;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var grabarJSON = function( tipo, valor ) {
 Ti.App.Properties.setObject( tipo, valor );
}
exports.grabarJSON = grabarJSON;
/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
exports.obtenerJSON = function( tipo ) {
 return Ti.App.Properties.getObject( tipo );
}
/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
exports.Alerta = function(texto,titulo){
   titulo = typeof titulo !== 'undefined' ?  titulo : params.app_name;
   var dialog = Ti.UI.createAlertDialog({
    message: "\r"+texto+"\r",
    ok: 'OK',
    title: titulo
  });
  dialog.show();
}

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var MarcarNumero = function(numero){
 Titanium.Platform.openURL('tel:' + numero );
}
exports.MarcarNumero = MarcarNumero;
/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var limpiarVariables = function() {
 grabarOpcion("conectado", "n");
 // grabarOpcion("asistencia", "");
 grabarJSON( "datos", {} );
 grabarJSON( "perfil", {} );
};
exports.limpiarVariables = limpiarVariables;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var zeroFill = function(n,pad){
    var p = Math.pow(10,pad);
    var a = Math.abs(n);
    var g = (n<0);
    return (a < p) ?  ((g ? '-' : '') + (p+a).toString().substring(1)) : n;
}
exports.zeroFill = zeroFill;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
exports.textoJSON = function(texto){
  var json;
  try{
    var json = JSON.parse(unescape(texto));
  }
  catch(e){
    json = { "error": "Error de conectividad, intenta mas tarde", "mensaje": "Error de conectividad, intenta mas tarde" };
    console.log( texto );
  }
  return json;
}

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var abrirEnlace = function(url) {
  if(url!="" && url!=null) {
    var dialog = require('ti.webdialog');
    if (dialog.isSupported()) {
        dialog.open({
            url: url
        });
    }
    else{
       Titanium.Platform.openURL(url);
    }
  }
  else{
    alert("No hay URL especificada");
  }
}
exports.abrirEnlace = abrirEnlace;


/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
exports.mostrarTituloContenido = function( vistaPrincipal, titulo, contenido, clr_titulo, clr_contenido ) {

  clr_titulo    = typeof clr_titulo    !== 'undefined' ?  clr_titulo    : colores.azul;
  clr_contenido = typeof clr_contenido !== 'undefined' ?  clr_contenido : colores.negro;

  var contenedora = Ti.UI.createView({
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE,
      layout: 'vertical'
  });

  // Titulo
  var titulo = Ti.UI.createLabel({
      text: titulo,
      left:  '5%',
      width: '90%',
      height: 'auto',
      color: clr_titulo,
      font: {  fontFamily: params.fuente_bold, fontSize: 18 },
  }) ;
  contenedora.add(titulo);
  contenedora.add( Ti.UI.createView({ width: Ti.UI.FILL, height: 2 })  );

  //  contenido
  var contenido = Ti.UI.createLabel({
         text: contenido,
         left:  '5%',
         width: '90%',
         height: 'auto',
         color: clr_contenido,
         font: {  fontFamily: params.fuente_normal, fontSize: 16 },
     }) ;
  contenedora.add(contenido);
  contenedora.add( Ti.UI.createView({ width: Ti.UI.FILL, height: 10 }));

  vistaPrincipal.add(contenedora);

  return { titulo: titulo, contenido: contenido };

};


/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var NotificacionBanner = function( tipo, titulo, subtitulo, duracion ) {
 var duracion = (typeof duracion !== 'undefined') ? duracion : 3;
 var subtitulo = (typeof subtitulo !== 'undefined') ? subtitulo : '.';
 var colorFondo;
 var sonido;
 switch (tipo) {
    case 'success': colorFondo = "#2fa716"; sonido="sonidos/s1.wav"; break;
    case 'info':    colorFondo = "#057cb8"; sonido="sonidos/s1.wav"; break;
    case 'warning': colorFondo = "#dc9805"; sonido="sonidos/s2.wav";break;
    case 'danger':  colorFondo = "#f50303"; sonido="sonidos/s2.wav";break;
    default: colorFondo = tipo; break;
 }
 if(subtitulo.length>100){
   subtitulo = subtitulo.substring(0, 100) + "....";
 }
 if(Utiles.hasIOSNotch()){
   titulo = "\n" + titulo;
 }
 NotificationBanner.show({
    title: titulo,
    duration: duracion,
    subtitle: subtitulo,
    backgroundColor: colorFondo,
 });
 var sndRecibir = Ti.Media.createSound({url:sonido });
 sndRecibir.play();
}
exports.NotificacionBanner = NotificacionBanner;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var mensajeBurbuja = function( tipo, contenedor, texto ){
    var colorFondo;
    switch (tipo) {
        case 'success': colorFondo = "#d1e7de";break;
        case 'info':    colorFondo = "#cff4fc";break;
        case 'warning': colorFondo = "#fff3cd";break;
        case 'danger':  colorFondo = "#f9d7da";break;
        default: colorFondo = tipo; break;
     }
    var burbuja = Ti.UI.createView({
        width: '90%',
        height: Ti.UI.SIZE,
        layout: 'vertical',
        borderRadius: 7,
        backgroundColor: colorFondo
    });
    burbuja.add( Ti.UI.createView({ height:10 }) );
    var txt = Ti.UI.createLabel({
        text: texto,
        width: '90%',
        textAlign: 'center',
        color: colores.negro,
        font: { fontFamily: params.fuente, fontSize: 14 },
        height: Ti.UI.SIZE,
    })
    burbuja.add(txt);
    burbuja.add( Ti.UI.createView({ height:10 }) );
    contenedor.add(burbuja);
}
exports.mensajeBurbuja = mensajeBurbuja;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
exports.isValidDate = function(value, userFormat) {

  // date instanceof Date && !isNaN(date.valueOf())

  // Set default format if format is not provided
  userFormat = userFormat || 'mm/dd/yyyy';

  // Find custom delimiter by excluding the
  // month, day and year characters
  var delimiter = /[^mdy]/.exec(userFormat)[0];

  // Create an array with month, day and year
  // so we know the format by index
  var theFormat = userFormat.split(delimiter);

  // Get the user date now that we know the delimiter
  var theDate = value.split(delimiter);

  function isDate(date, format) {
    var m, d, y, i = 0, len = format.length, f;
    for (i; i < len; i++) {
      f = format[i];
      if (/m/.test(f)) m = date[i];
      if (/d/.test(f)) d = date[i];
      if (/y/.test(f)) y = date[i];
    }
    return (
      m > 0 && m < 13 &&
      y && y.length === 4 &&
      d > 0 &&
      // Is it a valid day of the month?
      d <= (new Date(y, m, 0)).getDate()
    );
  }

  return isDate(theDate, theFormat);

}
