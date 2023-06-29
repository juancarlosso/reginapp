

var SolicitarProducto = function( ) {

    // const codigo = "1234567890";
    // buscaProducto( codigo );
    // if(1==1){
    //     return false;
    // }

    var Barcode = require('ti.barcode');

    Barcode.displayedMessage = ' Coloca el código en el cuadro';
    Barcode.allowMenu = true;
    Barcode.allowInstructions = true;
    Barcode.useLED = false;

    Barcode.addEventListener('cancel', function (e) {
        Ti.API.info('Cancel received');
    });

    Barcode.addEventListener('success', function (e) {
        Ti.API.info('Success called with barcode: ' + e.result);
        Barcode.fireEvent('cancel');
        buscaProducto( e.result );
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
        width: '30%',
        height: 30,
        top: 35,
        left: 10,
    });
    cancelButton.addEventListener('click', function () {
        Barcode.cancel();
    });
    overlay.add(cancelButton);

    var manualButton = Ti.UI.createButton({
         title: 'Manual', textAlign: 'center',
         color: '#000', backgroundColor: '#fff', style: 0,
         font: { fontWeight: 'bold', fontSize: 16 },
         borderColor: '#000', borderRadius: 10, borderWidth: 1,
         opacity: 0.5, width: '30%', height: 30, top: 35,right: 10,
     });
     manualButton.addEventListener('click', function () {
         Barcode.cancel();
         Manual();
     });
     overlay.add(manualButton);

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
var Manual = function() {
   var vistaCodigo = Ti.UI.createView({
        left: 10, right: 10,
        height: Ti.UI.SIZE,
    });
    var codigoCaptura = Ti.UI.createTextField({
         autocapitalization: false,
         font: { fontFamily: params.fuente_opensans, fontSize: 14 },
         tintColor: colores.verde,
         autocorrect: false,
         color: colores.verde,
         left: 10,
         right: 10,
         height: '38dp',
    });
    vistaCodigo.add(codigoCaptura);
    var dialog = Ti.UI.createAlertDialog({
      title: 'Captura el código',
      androidView: params.isAndroid ? vistaCodigo : null ,
      style: params.isAndroid ? null : Ti.UI.iOS.AlertDialogStyle.PLAIN_TEXT_INPUT,
      buttonNames: ['Cancelar', 'Aceptar']
    });
    dialog.addEventListener("click",function(e){
         if(e.index){
            if(params.isAndroid){
              if(codigoCaptura.value==''){
                Utiles.Alerta("Es necesario que captures el código");
                return false
              }
            }
            else{
              if (e.text == "") {
                Utiles.Alerta("Es necesario que captures el código");
                return false
              }
            }
            var codigoValidar;
            if(params.isAndroid){
               codigoValidar = codigoCaptura.value;
            }
            else{
              codigoValidar = e.text;
            }
            buscaProducto( codigoValidar );
         }
    });
    dialog.show();
}
exports.Manual = Manual;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var buscaProducto = function( codigo ) {
   var json = Utiles.obtenerJSON('datos') ;
   var Window = require("src/ui/Window");
   var win = new Window( 'S', 'Producto', colores.amarillo );
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
                   Utiles.mensajeBurbuja('info',contenedor, 'ENTRADAS DE INVENTARIO' );
                   altasDelProducto( contenedor, json.producto, win );
                   return false;
               }
               if(json.encontrado==0){
                   Utiles.mensajeBurbuja('success',contenedor, codigo + ' - PRODUCTO NUEVO');
                   NuevoProducto( codigo, contenedor, win );
               }
               else{
                   win.close();
                   Utiles.Alerta("Error");
               }
           };
           var url = params.API + 'buscar/producto';
           peticionHTTP.open("POST", url );
           peticionHTTP.setRequestHeader('token',json.datos.api_token);
           peticionHTTP.send({ codigo: codigo, user_id: json.datos.id, tipo:'codigo' });
   });
}
exports.buscaProducto = buscaProducto;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function NuevoProducto( codigo, contenedor, win ) {

    var Input = require('src/ui/InputImg');
    var Button = require('src/ui/Button');

    contenedor.add( Ti.UI.createView({ height: 10 }) );

    var jNombre = new Input('Nombre del Producto', '90%', 'A', 'N' );
    contenedor.add(jNombre.view);

    contenedor.add( Ti.UI.createView({ height: 10 }) );

    var jMinimo = new Input('Existencia Mínima', '90%', 'N', 'N' );
    contenedor.add(jMinimo.view);

    contenedor.add( Ti.UI.createView({ height: 10 }) );

    var jMaxima = new Input('Existencia Máxima', '90%', 'N', 'N' );
    contenedor.add(jMaxima.view);

    contenedor.add( Ti.UI.createView({ height: 10 }) );

    var jActual = new Input('Existencia Actual', '90%', 'N', 'N' );
    contenedor.add(jActual.view);

    contenedor.add( Ti.UI.createView({ height: 10 }) );

    var jPrecio = new Input('Precio', '90%', 'N', 'N' );
    contenedor.add(jPrecio.view);

    contenedor.add( Ti.UI.createView({ height: 10 }) );

    var jCaducidad = new Input('Caducidad ( DDMMAA )', '90%', 'N', 'N' );
    contenedor.add(jCaducidad.view);

    contenedor.add( Ti.UI.createView({ height: 20 }) );

    var renglonEspecial = Ti.UI.createView({
        width: '90%',
        height: Ti.UI.SIZE,
    })
    contenedor.add(renglonEspecial);

    var lblEspecial = Ti.UI.createLabel({
        text: " Producto Especial",
        left: 0,
        color: colores.verde,
        font: { fontFamily: params.fuente, fontSize: 14},
        textAlign: 'left',
    });
    renglonEspecial.add(lblEspecial);

    var swEspecial = Ti.UI.createSwitch({
      value:false ,
      right: 0,
    });
    renglonEspecial.add(swEspecial);

    contenedor.add( Ti.UI.createView({ height: 20 }) );

    var btnAceptar = new Button("Aceptar", colores.verde, colores.blanco, '90%');
    btnAceptar.addEventListener("singletap",function(){
        if(jNombre.input.value==''){
            Utiles.Alerta('Debes capturar el nombre del producto');
            return false;
        }
        if(jMinimo.input.value==''){
            Utiles.Alerta('Debes capturar la existencia mínima');
            return false;
        }
        if( isNaN(jMinimo.input.value) ){
            Utiles.Alerta('Debes capturar un valor numérico para la existencia mínima');
            return false;
        }
        if(jMaxima.input.value==''){
            Utiles.Alerta('Debes capturar la existencia Máxima');
            return false;
        }
        if( isNaN(jMaxima.input.value) ){
            Utiles.Alerta('Debes capturar un valor numérico para la existencia Máxima');
            return false;
        }
        if(jPrecio.input.value==''){
            Utiles.Alerta('Debes capturar el Precio');
            return false;
        }
        if( isNaN(jPrecio.input.value) ){
            Utiles.Alerta('Debes capturar un valor numérico para el Precio');
            return false;
        }
        if(jCaducidad.input.value==''){
            Utiles.Alerta('Debes capturar la caducidad del producto en formato DDMMAA');
            return false;
        }
        var dia = Utiles.Left(jCaducidad.input.value,2);
        var mes = jCaducidad.input.value.substr(2,2); // 000000
        var axo = Utiles.Right(jCaducidad.input.value,2);
        var fechaGenerada =  dia + "/"+ mes + "/20" + axo;
        if(!Utiles.isValidDate(fechaGenerada,'dd/mm/yyyy')){
            Utiles.Alerta('La fecha de caducidad no es válida ' + fechaGenerada );
            return false;
        }
        var fechaCaducidad = axo + "-" + mes + "-" + dia;
        RegistrarProductoEnServidor( win, codigo, jNombre, jMinimo, jMaxima, jPrecio, jActual, fechaCaducidad, swEspecial );

    });
    contenedor.add(btnAceptar);

    contenedor.add( Ti.UI.createView({ height: 15 }) );

    var btnCancelar = new Button("Cancelar", colores.rojo, colores.blanco, '90%');
    btnCancelar.addEventListener("singletap",function(){
        win.close();
    });
    contenedor.add(btnCancelar);

}

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function RegistrarProductoEnServidor( win, codigo, jNombre, jMinimo, jMaxima, jPrecio, jActual, fechaCaducidad, swEspecial ){
       var json = Utiles.obtenerJSON('datos') ;
       preloader.show(win);
       var peticionHTTP = Ti.Network.createHTTPClient({timeout:8000});
       peticionHTTP.onerror = function(e) {
           var resultado = Utiles.textoJSON(this.responseText);
           Ti.API.info("*** ERROR:::: " + JSON.stringify(this.responseText ));
           win.close();
           Utiles.Alerta( resultado.mensaje + " " + resultado.message );
       };
       peticionHTTP.onload =  function() {
           var json = Utiles.textoJSON(this.responseText);
           preloader.hide(win);
           console.log( json );
           win.close();
           Utiles.NotificacionBanner('success','Producto registrado',jNombre.input.value);
       };
       var url = params.API + 'producto/crear';
       peticionHTTP.open("POST", url );
       peticionHTTP.setRequestHeader('token',json.datos.api_token);
       peticionHTTP.send({
             user_id: json.datos.id ,
             codigo: codigo,
             nombre: jNombre.input.value,
             minimo: jMinimo.input.value,
             maximo: jMaxima.input.value,
             existencia: jActual.input.value,
             precio: jPrecio.input.value,
             especial: swEspecial.value ? 1 : 0,
             caducidad: fechaCaducidad,
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
function altasDelProducto( contenedor, producto, win ){

   var Input = require('src/ui/InputImg');
   var Button = require('src/ui/Button');

   contenedor.add(Ti.UI.createView({height:20}));
   Utiles.mostrarTituloContenido(contenedor,'Nombre', producto.nombre );
   Utiles.mostrarTituloContenido(contenedor,'Existencia actual', producto.existencia );
   Utiles.mostrarTituloContenido(contenedor,'Existencia mínima aceptada', producto.minimo );
   Utiles.mostrarTituloContenido(contenedor,'Existencia máxima aceptada', producto.maximo );
   Utiles.mostrarTituloContenido(contenedor,'Precio', producto.precio );
   contenedor.add(Ti.UI.createView({height:20}));

   var jCantidad = new Input('Cantidad a registrar', '90%', 'N', 'N' );
   contenedor.add(jCantidad.view);

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
       RegistrarAltaEnServidor( win, producto, jCantidad);
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
function RegistrarAltaEnServidor( win, producto, jCantidad){
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
           Utiles.NotificacionBanner('success','Altas registradas',producto.nombre + "[" + jCantidad.input.value + "]");
       };
       var url = params.API + 'producto/altas/inventario';
       peticionHTTP.open("POST", url );
       peticionHTTP.setRequestHeader('token',json.datos.api_token);
       peticionHTTP.send({
             user_id: json.datos.id ,
             codigo: producto.codigo,
             cantidad: jCantidad.input.value,
      });
}




/*

*/