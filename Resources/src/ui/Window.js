//Application Window Component Constructor
function GenericWindow(cerrar, textoTitulo, colorFondo) {

    colorFondo = (typeof colorFondo !== 'undefined') ? colorFondo : colores.azul;

    var self = Ti.UI.createWindow({
        orientationModes: [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT],
        backgroundColor: colorFondo,
        navBarHidden: false,
        exitOnClose: false,
        fullscreen: false,
        extendSafeArea: false,
        theme: params.temaVentana,
    });
    var objBarraTitulo = require("/src/ui/TopBarWindow");
    var barraTitulo = new objBarraTitulo(textoTitulo,colorFondo);
    self.add(barraTitulo);
    // Colocar el titulo
    if (cerrar == "S") {
        var vistaCerrar = Ti.UI.createView({
            width: '15%',
            height: Ti.UI.FILL,
            left: 0,
            top: 0,
        })
        vistaCerrar.add(Ti.UI.createImageView({ left: 8, width: 20, height: 20, image: "/images/icos/regresar.png" }))
        barraTitulo.add(vistaCerrar);
        vistaCerrar.addEventListener("singletap", function() { self.close({ animate: true }); });
        barraTitulo.add(vistaCerrar);
    }
    return self;
}
module.exports = GenericWindow;