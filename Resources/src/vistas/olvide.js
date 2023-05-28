function Mostrar(win){

    var Input  = require("/src/ui/InputImg");
    var Button = require("/src/ui/Button");

    var contenedor = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: '10%',
        layout: 'vertical',
        backgroundColor: colores.fondo
    });
    win.add(contenedor);

    contenedor.add(Ti.UI.createView({height:20}));

    var imagen = Ti.UI.createImageView({
        image: 'images/ilustraciones/olvidepwd.png',
        width: '50%',
    });
    contenedor.add(imagen);

    var lblExplica = Titanium.UI.createLabel({
      font: { fontFamily: params.fuente_normal, fontSize: 16 },
         text: 'Captura el usuario con el que te encuentras registrado (a) y te enviaremos un SMS con instrucciones para recuperar tu contraseña',
         color: colores.negro,
         textAlign: 'left',
         width: '90%',
         height: Ti.UI.SIZE,
   });
   contenedor.add(lblExplica);

   contenedor.add(Ti.UI.createView({height:10}));

   var jEmail = new Input("Usuario",'90%','E','N','usuario.png');
   contenedor.add(jEmail.view);

   contenedor.add(Ti.UI.createView({height:10}));

   var btnConectar = new Button("Enviar instrucciones",colores.naranja,colores.blanco,'90%');
   btnConectar.addEventListener("singletap", function(){
         if(jEmail.input.value=="") {
           Utiles.Alerta("Debes capturar tu email");
           return false;
         };
         preloader.show(win);
         var peticionHTTP = Ti.Network.createHTTPClient({ timeout: 30000 });
         peticionHTTP.onerror = function(e) {
             preloader.hide(win);
             Ti.API.info(this.responseText);
             var resultado = Utiles.textoJSON(this.responseText);
             var mensaje = ":: " + resultado.mensaje;
             Utiles.NotificacionBanner("danger", "ERROR", mensaje);
         };
         peticionHTTP.onload = function() {
             var respuesta = Utiles.textoJSON(this.responseText);
             preloader.hide(win);
             console.log(respuesta);
             Utiles.NotificacionBanner("success", "¡Aviso!", respuesta.mensaje);
         };
         var url = params.API + "recovery/pwd";
         var parametros = {
            username: jEmail.input.value
         }
         console.log(url);
         console.log(parametros);
         peticionHTTP.open("POST", url );
         peticionHTTP.send(parametros);
   });
   contenedor.add(btnConectar);


}
exports.Mostrar = Mostrar;
