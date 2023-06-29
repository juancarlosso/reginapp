


/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
var show = function( textoBuscar, tipo ) {

  var json = Utiles.obtenerJSON('datos') ;
     var Window = require("src/ui/Window");
     var win = new Window( 'S', 'Buscar Producto', colores.azul );
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
                 Utiles.Alerta( resultado.mensaje + " " + resultado.message );
             };
             peticionHTTP.onload =  function() {
                 var json = Utiles.textoJSON(this.responseText);
                 preloader.hide(win);
                 if(json.encontrado==1){
                     Utiles.mensajeBurbuja('warning',contenedor, 'RESULTADOS DE: ' + textoBuscar );
                     MostrarResultados( contenedor, json, win );
                     return false;
                 }
                 if(json.encontrado==0){
                     Utiles.mensajeBurbuja('danger',contenedor, 'No se encontró producto con el texto: ' +  textoBuscar  );
                 }
                 else{
                     win.close();
                     Utiles.Alerta("Error");
                 }
             };
             var url = params.API + 'buscar/producto';
             peticionHTTP.open("POST", url );
             peticionHTTP.setRequestHeader('token',json.datos.api_token);
             peticionHTTP.send({ texto: textoBuscar, user_id: json.datos.id, tipo:tipo });
     });

}
exports.show = show;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function MostrarResultados( contenedor, json, winResultados ){

   for(var x=0;x<json.productos.length;x++){
       contenedor.add(Ti.UI.createView({ height: 10 }));
       var renglon = Ti.UI.createView({
           width: '90%',
           height: 50,
           backgroundColor: colores.blanco,
           borderColor: colores.gris,
           borderRadius: 10,
           producto: json.productos[x],
       });
       var codigo = Ti.UI.createLabel({
           text: json.productos[x].codigo,
           color: colores.gris,
           font: { fontFamily: params.fuente_bold, fontSize: 16 },
           textAlign: 'left',
           top: 5, left: 5,
           producto: json.productos[x],
       });
       renglon.add(codigo);
       var nombre = Ti.UI.createLabel({
            text: json.productos[x].nombre,
            color: colores.gris,
            font: { fontFamily: params.fuente_normal, fontSize: 16 },
            textAlign: 'left',
            top: 25, left: 5,
            producto: json.productos[x],
       });
       renglon.add(nombre);
       var precio = Ti.UI.createLabel({
             text: '$ ' + json.productos[x].precio,
             color: colores.gris,
             font: { fontFamily: params.fuente_normal, fontSize: 16 },
             textAlign: 'left',
             top: 5, right: 5,
             producto: json.productos[x],
       });
       renglon.add(precio);
       renglon.addEventListener("singletap",function(e){
           mostrarProducto(e.source.producto, winResultados);
       });
       contenedor.add(renglon);
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
function mostrarProducto(producto,winResultados){

  var codigo = producto.codigo;
  var existencia = producto.existencia;
  var Button = require('src/ui/Button');
  var Input = require('src/ui/InputLabel');
  var Window = require("src/ui/Window");
  var win = new Window( 'S', 'Datos del Producto', colores.verde );
  var scroll = Ti.UI.createScrollView({ width: Ti.UI.FILL, height: Ti.UI.FILL, top: '10%', backgroundColor: colores.fondo2  });
  var contenedor = Ti.UI.createView({ width: Ti.UI.FILL, height: Ti.UI.SIZE, top:0, layout: 'vertical'});
  contenedor.add( Ti.UI.createView({ height: 10 }) );
  scroll.add(contenedor);
  win.add(scroll);

  var vistaOpciones = Ti.UI.createView({
      width: '10%', height: '10%',
      top: 0, right: 0,
      zIndex: 999
  });
  vistaOpciones.add( Ti.UI.createImageView({ image: 'images/icos/blancos.png', width: 25, height: 25}) );
  vistaOpciones.addEventListener("singletap",function(){
       var dialog = Ti.UI.createAlertDialog({
           cancel: 3,
           buttonNames: [
              'Registrar Entradas',
              'Registrar Salidas',
              'Registrar Cortesias',
              'Cancelar'
            ],
           message: '¿ Qué quieres hacer?',
           title: 'Selecciona'
       });
       dialog.addEventListener('click', function(e) {
           if (e.index === e.source.cancel) {
               Ti.API.info('The cancel button was clicked');
           }
           else {
               winResultados.close();
               win.close();
               switch( e.index ){
                   case 0: require('/src/vistas/inventario/entradas').buscaProducto(codigo); break;
                   case 1: require('/src/vistas/inventario/salidas').buscaProducto(codigo); break;
                   case 2: require('/src/vistas/inventario/cortesias').buscaProducto(codigo); break;
               }
           }
       });
       dialog.show();
  })
  win.add(vistaOpciones);

  contenedor.add( Ti.UI.createView({ height: 10 }) );

  Utiles.mensajeBurbuja('info',contenedor, producto.codigo + "\nExistencia actual: " + producto.existencia  );

  contenedor.add( Ti.UI.createView({ height: 10 }) );

  var jNombre = new Input('Nombre del Producto', '90%', 'A', 'N' );
  contenedor.add(jNombre.view);
  jNombre.input.value = producto.nombre;

  contenedor.add( Ti.UI.createView({ height: 10 }) );

  var jMinimo = new Input('Existencia Mínima', '90%', 'N', 'N' );
  contenedor.add(jMinimo.view);
  jMinimo.input.value = producto.minimo;

  contenedor.add( Ti.UI.createView({ height: 10 }) );

  var jMaxima = new Input('Existencia Máxima', '90%', 'N', 'N' );
  contenedor.add(jMaxima.view);
  jMaxima.input.value = producto.maximo;

  contenedor.add( Ti.UI.createView({ height: 10 }) );

  var jPrecio = new Input('Precio', '90%', 'N', 'N' );
  contenedor.add(jPrecio.view);
  jPrecio.input.value = producto.precio;

  contenedor.add( Ti.UI.createView({ height: 10 }) );

  var fechacad  = producto.caducidad;
  var caducidad = fechacad.substr(8,2) + fechacad.substr(5,2) + fechacad.substr(2,2);
  var jCaducidad = new Input('Caducidad ( DDMMAA )', '90%', 'N', 'N' );
  contenedor.add(jCaducidad.view);
  jCaducidad.input.value = caducidad;

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
    value: producto.especial ,
    right: 0,
  });
  renglonEspecial.add(swEspecial);

  contenedor.add( Ti.UI.createView({ height: 20 }) );

  var btnAceptar = new Button("Actualizar datos", colores.verde, colores.blanco, '90%');
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

      RegistrarProductoEnServidor( win, codigo, jNombre, jMinimo, jMaxima, jPrecio, existencia, fechaCaducidad, swEspecial, winResultados );

  });

  contenedor.add(btnAceptar);

  contenedor.add( Ti.UI.createView({ height: 20 }) );

  var btnCancelar = new Button("Cancelar", colores.rojo, colores.blanco, '90%');
  btnCancelar.addEventListener("singletap",function(){
      win.close();
  });
  contenedor.add(btnCancelar);

  contenedor.add( Ti.UI.createView({ height: 20 }) );

  win.open();

}

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function RegistrarProductoEnServidor( win, codigo, jNombre, jMinimo, jMaxima, jPrecio, existencia, fechaCaducidad, swEspecial, winResultados ){
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
           winResultados.close();
           win.close();
           Utiles.NotificacionBanner('success','Producto actualizado',jNombre.input.value);
       };
       var url = params.API + 'producto/actualizar';
       peticionHTTP.open("POST", url );
       peticionHTTP.setRequestHeader('token',json.datos.api_token);
       peticionHTTP.send({
             user_id: json.datos.id ,
             codigo: codigo,
             nombre: jNombre.input.value,
             minimo: jMinimo.input.value,
             maximo: jMaxima.input.value,
             existencia: existencia,
             precio: jPrecio.input.value,
             especial: swEspecial.value ? 1 : 0,
             caducidad: fechaCaducidad,
      });
}
