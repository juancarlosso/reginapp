
function Button(ancho,alto,imagen,texto,colorBoton,colorTexto) {


 var btn = Ti.UI.createView({
     borderRadius: 10,
     backgroundColor: colorBoton,
     borderColor: colorBoton,
     width: ancho,
     height: alto
 });

 var contenedor = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: Ti.UI.SIZE,
     layout: 'vertical'
 });
 btn.add(contenedor);

 var imagen = Ti.UI.createImageView({
     image:imagen,
     width: 30, height: 30,
 });
 contenedor.add(imagen);

 var lblBoton = Ti.UI.createLabel({
     text: texto,
     color:colorTexto,
     font: {fontFamily: params.fuente_normal, fontSize: 16},
     textAlign: 'center',
 });
 contenedor.add(lblBoton);

 return btn;

}
module.exports = Button;