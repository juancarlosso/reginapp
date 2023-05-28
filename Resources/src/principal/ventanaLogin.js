/*
 *
 * @brief
 * @author Juan Carlos Salinas Ojeda
 * @param string
 * @return
 *
 */
var Mostrar = function(win2, mainView2) {

  var Input = require("/src/ui/InputImg");
  var Button = require("/src/ui/Button");

  Utiles.grabarJSON('perfil',{});

  win2.backgroundColor = colores.verde;

  mainView.removeAllChildren();
  var vistaTotal = Ti.UI.createView({
    width: Ti.UI.FILL,
    height: Ti.UI.FILL,
  });
  mainView.add(vistaTotal);

  var logo = Ti.UI.createImageView({
      image: 'images/logo.png',
      width: '45%' ,
      top: '5%',
  })
  mainView.add(logo);

  var baseTitulo = Ti.UI.createView({
      width: Ti.UI.FILL,
      height: Ti.UI.FILL,
      top: '30%',
      backgroundColor: colores.grisSuave,
      borderRadius: [ 30, 30, 0, 0 ] ,
  })
  mainView.add(baseTitulo);
  var nombreApp = Ti.UI.createLabel({
      text: 'Acceso a ReginAPP',
      color: colores.negro,
      textAlign: 'center',
      top: '32.5%',
  });
  mainView.add(nombreApp);

  var scroll = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: '38%',
        backgroundColor: colores.blanco,
        borderRadius: [ 30, 30, 0, 0 ] ,
        layout: 'vertical',
        borderColor: colores.inputFondo
  })
  mainView.add(scroll);

  var contenedor = Ti.UI.createView({
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE,
      top: 0,
      layout: 'vertical'
  });
  scroll.add(contenedor);

  contenedor.add(Ti.UI.createView({ height: 30 }));

  // USUARIO
  var jUsuario = new Input("Usuario", '80%', 'A', 'N', 'usuario.png');
  contenedor.add(jUsuario.view);
  contenedor.add(Ti.UI.createView({ height: 20 }));
  // PASSWORD
  var jPassword = new Input("Contraseña", '80%', 'A', 'S', 'candado.png');
  contenedor.add(jPassword.view);
  contenedor.add(Ti.UI.createView({ height: 30 }));

  var lblOlvide = Ti.UI.createLabel({
      text: 'Olvidé mi contraseña',
      font: { fontFamily: params.fuente_bold, fontSize: 14 },
      width: Ti.UI.SIZE,
      height: 20,
      textAlign: 'right',
      color: colores.amarillo,
  });
  lblOlvide.addEventListener("singletap", function() {
      Recuperar(mainWin);
  });
  contenedor.add(lblOlvide);
  contenedor.add(Ti.UI.createView({ height: 20 }));

  var btnEntrar = new Button("Entrar", colores.verde, colores.blanco, '80%');
    btnEntrar.addEventListener("singletap", function() {
      if (jUsuario.input.value == "") {
        Utiles.Alerta("Captura tu usuario por favor");
        return false;
      }
      if (jPassword.input.value == "") {
        Utiles.Alerta("Captura el password por favor");
        return false;
      }
      jUsuario.input.blur();
      jPassword.input.blur();
      EntrarConUsuario(mainWin, mainView, jUsuario, jPassword);
    });
    contenedor.add(btnEntrar);

    contenedor.add(Ti.UI.createView({ height: 30 }));

    var lblCrear = Ti.UI.createLabel({
        text: '¿No tienes cuenta? Regístrate aquí 👍',
        font: { fontFamily: params.fuente_bold, fontSize: 14 },
        width: 'auto',
        height: 30,
        textAlign: 'center',
        color: colores.verde,
    });
    contenedor.add(lblCrear);

    contenedor.add(Ti.UI.createView({ height: 40 }));
      var lblVersion = Ti.UI.createLabel({
        text: 'Versión ' + params.app_version,
        font: { fontFamily: params.fuente_normal, fontSize: 14 },
        width: 'auto',
        textAlign: 'center',
        color: colores.negro,
      });
      contenedor.add(lblVersion);


};
exports.Mostrar = Mostrar;

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function EntrarConUsuario(win, mainView, jUsuario, jPassword) {
  // Utiles.grabarOpcion("conectado", "S");
  // winMenu.MostrarMenu(mainView, win);
  // if(1==1){
  //     return true;
  // }
  preloader.show(win);
  var peticionHTTP = Ti.Network.createHTTPClient({ timeout: 10000 });
  peticionHTTP.onerror = function(e) {
    var resultado = Utiles.textoJSON(this.responseText);
    preloader.hide(win);
    Ti.API.info("*** Aca vemos el error: " + JSON.stringify(this.responseText));
    Utiles.Alerta(resultado.mensaje);
  };
  peticionHTTP.onload = function() {
    var json = Utiles.textoJSON(this.responseText);
    preloader.hide(win);
    Ti.API.info("*** " + JSON.stringify(json));
    Utiles.grabarJSON('datos', json);
    Utiles.grabarOpcion("conectado", "S");
    winMenu.MostrarMenu(mainView, win);
  };
  var parametros = {
    username: jUsuario.input.value,
    password: jPassword.input.value,
    manufacturer: Ti.Platform.manufacturer,
    model: Ti.Platform.model,
    osname: Ti.Platform.osname,
    osversion: Ti.Platform.version,
  };
  var url = params.API + "login";
  Ti.API.info("*** URL Login: " + url);
  peticionHTTP.open("POST", url);
  peticionHTTP.send(parametros);
}
/*
 *
 * @brief
 * @author Juan Carlos Salinas Ojeda
 * @param string
 * @return
 *
 */
function Recuperar(win) {
  var GenericWindowSolicitar = require("src/ui/Window");
  var win = new GenericWindowSolicitar("S", "¿Olvidaste tu contraseña?");
  require("src/vistas/olvide").Mostrar(win);
  win.open();
}