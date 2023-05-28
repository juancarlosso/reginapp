

var SolicitarProducto = function( ) {

    const codigo = "123456789";
    buscaProducto( codigo );
    if(1==1){
        return false;
    }

    var Barcode = require('ti.barcode');

    Barcode.displayedMessage = ' Displayed Message';
    Barcode.allowMenu = true;
    Barcode.allowInstructions = true;
    Barcode.useLED = false;

    Barcode.addEventListener('cancel', function (e) {
        Ti.API.info('Cancel received');
    });

    Barcode.addEventListener('success', function (e) {
        Ti.API.info('Success called with barcode: ' + e.result);
        Barcode.fireEvent('cancel');
    });

    var overlay = Ti.UI.createView({
        backgroundColor: 'transparent',
        top: 0,
        right: 0,
        height: 50,
        // left: 0
    });

    var cancelButton = Ti.UI.createButton({
        title: 'Cancelar',
        textAlign: 'center',
        color: '#000',
        backgroundColor: '#fff',
        style: 0,
        font: {
            fontWeight: 'bold',
            fontSize: 16
        },
        borderColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        opacity: 0.5,
        width: 220,
        height: 30,
        top: 20
    });
    cancelButton.addEventListener('click', function () {
        Barcode.cancel();
    });
    overlay.add(cancelButton);

    if (Ti.Media.hasCameraPermissions()) {
        activarLector();
    }
    else {
        Ti.Media.requestCameraPermissions(function (e) {
            if (e.success) {
                activarLector();
            }
            else {
                alert('No camera permission');
                return false;
            }
        });
    }

    function activarLector(){
            Barcode.capture({
                animate: false,
                showCancel: false,
                showRectangle: true,
                keepOpen: false,
                overlay:overlay,
            });
    }

}
exports.SolicitarProducto = SolicitarProducto;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function buscaProducto( codigo ) {
   var json = Utiles.obtenerJSON('datos') ;
   var Window = require("src/ui/window");
   var win = new Window( 'S', 'Producto', colores.rojo );
   var scroll = Ti.UI.createScrollView({ width: Ti.UI.FILL, height: Ti.UI.FILL, top: '10%', backgroundColor: colores.fondo2  });
   var contenedor = Ti.UI.createView({ width: Ti.UI.FILL, height: Ti.UI.SIZE, top:0, layout: 'vertical'});
   contenedor.add( Ti.UI.createView({ height: 10 }) );
   scroll.add(contenedor);
   win.add(scroll);
   win.open();
   win.addEventListener("open",function(){
           preloader.show(win);
           var peticionHTTP = Ti.Network.createHTTPClient({timeout:8000});
           peticionHTTP.onerror = function(e) {
               var resultado = Utiles.textoJSON(this.responseText);
               Ti.API.info("*** ERROR:::: " + JSON.stringify(this.responseText ));
               win.close();
               Utiles.Alerta( resultado.mensaje );
           };
           peticionHTTP.onload =  function() {
               var json = Utiles.textoJSON(this.responseText);
               preloader.hide(win);
               console.log( json );
               if(json.encontrado==1){
                   Utiles.mensajeBurbuja('danger',contenedor, 'SALIDAS DE INVENTARIO' );
                   bajasDelProducto( contenedor, json.producto, win );
                   return false;
               }
               if(json.encontrado==0){
                   // win.close();
                   // Utiles.Alerta("Producto no encontrado");
                   Utiles.mensajeBurbuja('danger',contenedor, 'PRODUCTO NO ENCONTRADO' );
               }
               else{
                   win.close();
                   Utiles.Alerta("Error");
               }
           };
           var url = params.API + 'buscar/producto';
           peticionHTTP.open("POST", url );
           peticionHTTP.setRequestHeader('token',json.datos.api_token);
           peticionHTTP.send({ codigo: codigo, user_id: json.datos.id });
   });
}

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function bajasDelProducto( contenedor, producto, win ){

   var Input = require('src/ui/InputImg');
   var Button = require('src/ui/Button');

   contenedor.add(Ti.UI.createView({height:25}));
   Utiles.mostrarTituloContenido(contenedor,'Nombre', producto.nombre );
   Utiles.mostrarTituloContenido(contenedor,'Existencia actual', producto.existencia );
   Utiles.mostrarTituloContenido(contenedor,'Existencia mínima aceptada', producto.minimo );
   Utiles.mostrarTituloContenido(contenedor,'Existencia máxima aceptada', producto.maximo );
   Utiles.mostrarTituloContenido(contenedor,'Precio', producto.precio );
   contenedor.add(Ti.UI.createView({height:15}));

   var jCantidad = new Input('Cantidad a registrar', '90%', 'N', 'N' );
   contenedor.add(jCantidad.view);

   contenedor.add(Ti.UI.createView({height:15}));

   var jMotivo = new Input('Motivo de la salida', '90%', 'N', 'N' );
   contenedor.add(jMotivo.view);

   contenedor.add(Ti.UI.createView({height:20}));

   var btnAceptar = new Button("Aceptar", colores.verde, colores.blanco, '90%');
   btnAceptar.addEventListener("singletap",function(){
       if(jCantidad.input.value==''){
           Utiles.Alerta('Debes capturar la cantidad de producto que está entrando al inventario');
           return false;
       }
       if( isNaN(jCantidad.input.value) ){
           Utiles.Alerta('Debes capturar un valor numérico para la cantidad');
           return false;
       }
       if(jMotivo.input.value==''){
          Utiles.Alerta('Debes capturar el motivo de salida');
          return false;
       }
       RegistrarBajaEnServidor( win, producto, jCantidad, jMotivo );
   });
   contenedor.add(btnAceptar);

   contenedor.add(Ti.UI.createView({height:20}));

   var btnCancelar = new Button("Cancelar", colores.rojo, colores.blanco, '90%');
   btnCancelar.addEventListener("singletap",function(){
       win.close();
   });
   contenedor.add(btnCancelar);

   contenedor.add(Ti.UI.createView({height:20}));

}

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function RegistrarBajaEnServidor( win, producto, jCantidad, jMotivo ){
    var json = Utiles.obtenerJSON('datos') ;
       preloader.show(win);
       var peticionHTTP = Ti.Network.createHTTPClient({timeout:8000});
       peticionHTTP.onerror = function(e) {
           var resultado = Utiles.textoJSON(this.responseText);
           Ti.API.info("*** ERROR:::: " + JSON.stringify(this.responseText ));
           preloader.hide(win);
           Utiles.NotificacionBanner('danger','ERROR',resultado.mensaje + resultado.message);
       };
       peticionHTTP.onload =  function() {
           var json = Utiles.textoJSON(this.responseText);
           preloader.hide(win);
           console.log( json );
           win.close();
           Utiles.NotificacionBanner('success','Bajas registradas',producto.nombre + "[" + jCantidad.input.value + "]");
       };
       var url = params.API + 'producto/bajas/inventario';
       peticionHTTP.open("POST", url );
       peticionHTTP.setRequestHeader('token',json.datos.api_token);
       peticionHTTP.send({
             user_id: json.datos.id ,
             codigo: producto.codigo,
             cantidad: jCantidad.input.value,
             motivo: jMotivo.input.value,
      });
}