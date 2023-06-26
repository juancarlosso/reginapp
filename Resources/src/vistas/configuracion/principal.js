
var show = function() {

    var principal = Ti.UI.createView({
        width: Ti.UI.FILL,
        bottom: 0,
    });

    const lblConfig = Ti.UI.createLabel({
        top: 30,
        left: 30,
        text: "Configuración",
        color: colores.negro,
        textAlign: 'left',
        font: { fontFamily: params.fuente_bold, fontSize: 18 },
    });
    principal.add(lblConfig);

    var scroll = Ti.UI.createScrollView({
        top: 70,
        bottom: 0,
        width: Ti.UI.FILL,
    });
    principal.add(scroll);

    var contenedor = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: 'vertical',
        top: 0,
    });
    scroll.add(contenedor);

    var opcPerfil = opcionConfiguracion( "Perfil", 'images/icos/perfilVerde.png' );
    contenedor.add(opcPerfil);

    contenedor.add( Ti.UI.createView({ height: 15}) );

    var opcTerminos = opcionConfiguracion( "Términos y Condiciones", 'images/icos/legalVerde.png' );
    contenedor.add(opcTerminos);

    contenedor.add( Ti.UI.createView({ height: 5}) );

    var pp = opcionConfiguracion( "Políticas de Privacidad", 'images/icos/legalVerde.png' );
    contenedor.add(pp);

    contenedor.add( Ti.UI.createView({ height: 5}) );

    var acerca = opcionConfiguracion( "Acerca de ...", 'images/icos/infoVerde.png' );
    contenedor.add(acerca);

    contenedor.add( Ti.UI.createView({ height: 35}) );

    var salir = opcionConfiguracion( "Salir", 'images/icos/salirVerde.png' );
    salir.addEventListener("singletap",function(){
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: ['Si', 'No'],
            message: 'Por favor confirma',
            title: '¿ Cerrar tu sesión ?'
        });
        dialog.addEventListener('click', function(e) {
            if (e.index === e.source.cancel) {
                Ti.API.info('The cancel button was clicked');
            } else {
                mainView.removeAllChildren();
                Utiles.limpiarVariables();
                winLogin.Mostrar(mainWin, mainView);
            }
        });
        dialog.show();
    })
    contenedor.add(salir);

    return principal;
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
function opcionConfiguracion( titulo, imagen ){

    var vista = Ti.UI.createView({
        width: '90%',
        height: '40',
        backgroundColor: colores.blanco,
        borderRadius: 10
    });

    var imagen = Ti.UI.createImageView({
        width: 30, height: 30,
        image: imagen,
        left: 5
    });
    vista.add(imagen);

    var lblTitulo = Ti.UI.createLabel({
        text: titulo,
        left: 50, right: 50,
        color: colores.gris,
        font: { fontFamily: params.fuente, fontSize: 18 },
        textAlign: 'left'
    })
    vista.add(lblTitulo)

    var imagenDerecha = Ti.UI.createImageView({
        width: 20, height: 20,
        image: 'images/icos/derechaGris.pnh',
        right: 5
    });
    vista.add(imagenDerecha);


    return vista;

}