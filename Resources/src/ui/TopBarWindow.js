//FirstView Component Constructor
function BarraTitulo( texto, colorBarra ) {

    colorBarra = (typeof colorBarra !== 'undefined') ? colorBarra : colores.azul;

    //create object instance, a parasitic subclass of Observable
    var self = Ti.UI.createView({
        top: 0,
        backgroundColor: colorBarra,
        width: Ti.UI.FILL,
        height: '10%'
    });

 self.add( Ti.UI.createView({ bottom: 0, width: Ti.UI.FILL, height: 2, backgroundColor: colores.amarilloRegina }) );

 var txt = Ti.UI.createLabel({
     text: texto,
     textAlign: 'center',
     font: { fontFamily: params.fuente_bold, fontSize: 17 },
     color:colores.blanco,
     width: '90%',
     height: Ti.UI.SIZE
 });
 self.add(txt);
 if( Utiles.hasIOSNotch() ){
   txt.bottom = '17%';
 }

    return self;
}

module.exports = BarraTitulo;