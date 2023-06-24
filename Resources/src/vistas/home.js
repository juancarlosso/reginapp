

/*
*
* @brief
* @author Juan Carlos Salinas Ojeda
* @param string
* @return
*
*/
function Home() {

    var json = Utiles.obtenerJSON('datos');
    var scroll = Ti.UI.createScrollView({
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: colores.fondo2,
        layout: 'vertical',
    });

    ponerTopBar(scroll);

    if (json.datos.perfil == 1) {
        ponerBuscador(scroll);
        ponerVentaDelDia(scroll);
        opcionesAdministrador(scroll);
    }


    return scroll;

}
module.exports = Home;


/*
 *
 * @brief
 * @author Juan Carlos Salinas Ojeda
 * @param string
 * @return
 *
 */
function ponerTopBar(scroll) {
    var json = Utiles.obtenerJSON('datos');
    scroll.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20 }));
    var topBar = Ti.UI.createView({ width: '90%', height: 60 });
    const lblBienvenida = Ti.UI.createLabel({
        top: 7,
        left: 10,
        text: 'Bienvenido(a)',
        color: colores.gris,
        textAlign: 'left',
        font: { fontFamily: params.fuente_normal, fontSize: 18 },
    });
    topBar.add(lblBienvenida);
    const lblNombre = Ti.UI.createLabel({
        top: 30,
        left: 10,
        text: json.datos.name,
        color: colores.negro,
        textAlign: 'left',
        font: { fontFamily: params.fuente_bold, fontSize: 18 },
    });
    topBar.add(lblNombre);
    var vistaPerfil = Ti.UI.createView({
        width: 40,
        height: 40,
        right: 10,
        borderRadius: 8,
        backgroundColor: colores.verde
    })
    vistaPerfil.add( Ti.UI.createImageView({image:'images/icos/notificaciones.png',width:27,height:27}) );
    topBar.add(vistaPerfil);
    scroll.add(topBar);
}
/*
 *
 * @brief
 * @author Juan Carlos Salinas Ojeda
 * @param string
 * @return
 *
 */
function ponerBuscador(scroll) {
    var Input = require("/src/ui/InputFlat");
    scroll.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20 }));
    var jBuscar = new Input("Buscar producto", '90%', 'A', 'N', 'buscar.png', 'barras.png');
    jBuscar.input.returnKeyType = Titanium.UI.RETURNKEY_SEARCH;
    jBuscar.input.addEventListener("return",function(){
          require('src/vistas/inventario/datosProducto').show( jBuscar.input.value, 'texto' );
    })
    scroll.add(jBuscar.view);
}
/*
 *
 * @brief
 * @author Juan Carlos Salinas Ojeda
 * @param string
 * @return
 *
 */
function ponerVentaDelDia(scroll) {
    scroll.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20 }));
    var vistaVenta = Ti.UI.createView({
        width: '90%',
        height: 100,
        borderRadius: 10,
        backgroundColor: colores.azul, // '#82b479'
    });
    scroll.add(vistaVenta);
    lblTotal = Ti.UI.createLabel({
        text: '$ 0.00',
        color: colores.blanco,
        font: { fontFamily: params.fuente_bold, fontSize: 34 },
        top: 5,
        left: 10,
        right: 10,
        textAlign: 'right'
    })
    vistaVenta.add(lblTotal);
    lblTarjeta = Ti.UI.createLabel({
        text: '💳 $ 0.00',
        color: colores.blanco,
        font: { fontFamily: params.fuente_normal, fontSize: 20 },
        bottom: 10,
        left: 10,
        right: 10,
        textAlign: 'left'
    })
    vistaVenta.add(lblTarjeta);
    lblEfectivo = Ti.UI.createLabel({
        text: '💵 $ 0.00',
        color: colores.blanco,
        font: { fontFamily: params.fuente_normal, fontSize: 20 },
        bottom: 10,
        left: 10,
        right: 10,
        textAlign: 'right'
    })
    vistaVenta.add(lblEfectivo);
}
/*
 *
 * @brief
 * @author Juan Carlos Salinas Ojeda
 * @param string
 * @return
 *
 */
function opcionesAdministrador(scroll) {
    var Button = require('src/ui/ButtonBig');
    scroll.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20 }));
    const lblProdu = Ti.UI.createLabel({
        text: 'Productos',
        color: colores.negro,
        textAlign: 'left',
        width: '90%',
        font: { fontFamily: params.fuente_bold, fontSize: 18 },
    })
    scroll.add(lblProdu);
    scroll.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 10 }));
    var vistaOpciones = Ti.UI.createView({
        width: '90%',
        height: 110,
    });
    scroll.add(vistaOpciones);

    var btnVentas = new Button('48%',110,'/images/icos/menu/ventas.png','Ventas',colores.verde,colores.blanco);
    btnVentas.left = 0;
    vistaOpciones.add(btnVentas);

    var btnCortesias = new Button('48%',110,'/images/icos/menu/cortesias.png','Cortesias',colores.naranja,colores.blanco);
    btnCortesias.addEventListener("singletap",function(){
        require('src/vistas/inventario/cortesias').SolicitarProducto( );
    });
    btnCortesias.right = 0;
    vistaOpciones.add(btnCortesias);

    scroll.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 15 }));
    var vistaOpciones2 = Ti.UI.createView({
        width: '90%',
        height: 110,
    });
    scroll.add(vistaOpciones2);

    var btnEntradas = new Button('48%',110,'/images/icos/menu/entradas.png','Entradas',colores.amarillo,colores.blanco);
    btnEntradas.addEventListener("singletap",function(){
        require('src/vistas/inventario/entradas').SolicitarProducto( );
    });
    btnEntradas.left = 0;
    vistaOpciones2.add(btnEntradas);

    var btnSalidas = new Button('48%',110,'/images/icos/menu/salidas.png','Salidas',colores.rojo,colores.blanco);
    btnSalidas.addEventListener("singletap",function(){
        require('src/vistas/inventario/salidas').SolicitarProducto( );
    });
    btnSalidas.right = 0;
    vistaOpciones2.add(btnSalidas);

}