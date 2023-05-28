
function Button(texto,colorBoton,colorTexto,ancho) {


 var btn = Ti.UI.createButton({
     title: texto,
     borderRadius: 20,
     backgroundColor: colorBoton,
     borderColor: colorBoton,
     font: { fontFamily: params.fuente_bold, fontSize: 16 },
     color: colorTexto,
     width: ancho,
     height: '50dp'
 });

 return btn;

}
module.exports = Button;