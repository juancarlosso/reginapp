function ApplicationWindow() {
    mainWin = Ti.UI.createWindow({
        orientationModes: [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT],
        backgroundColor: colores.verde,
        navBarHidden: false,
        exitOnClose: false,
        fullscreen: false,
        extendSafeArea: false,
        theme: params.temaVentana,
    });

    // Creamos el contenedor principal
    mainView = Ti.UI.createView({ width: Ti.UI.FILL, height: Ti.UI.SIZE });
    mainWin.add(mainView);

    // Token
    if (Utiles.obtenerOpcion("token") == "") {
        Utiles.grabarOpcion("token", '');
    }

    // Si el usuario esta logueado
    // entonces mostramos el menú
    // Utiles.grabarOpcion("conectado","N");
    if (Utiles.obtenerOpcion("conectado") == "S") {
        winMenu.MostrarMenu(mainView, mainWin)
    } else {
        // si no está logueado, mostramos la pantalla
        // con el boton para login
        winLogin.Mostrar(mainWin, mainView)
    }
    Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
    Ti.API.info('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
    Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
    Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
    Ti.API.info("*** Es iPhoneX = " + Utiles.hasIOSNotch());
    Ti.API.info("*** hasIOSNotch() = " + Utiles.hasIOSNotch());

    return mainWin;
}
module.exports = ApplicationWindow;