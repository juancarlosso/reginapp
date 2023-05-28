function Input(placeholder, ancho, teclado, password, imagenPng, imagenBtn) {
    var rutaImagen = "/images/icos/inputs/";
    imagenPng = (typeof imagenPng !== 'undefined') ? imagenPng : '';
    imagenBtn = (typeof imagenBtn !== 'undefined') ? imagenBtn : '';
    var tipoTeclado;
    var esPassword;
    var autocapitalization;
    switch (teclado) {
        case "N":
            tipoTeclado = Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD;
            break;
        case "T":
            tipoTeclado = Titanium.UI.KEYBOARD_TYPE_PHONE_PAD;
            break;
        case "E":
            tipoTeclado = Titanium.UI.KEYBOARD_TYPE_EMAIL;
            break;
        default:
            Titanium.UI.KEYBOARD_TYPE_DEFAULT;
    }
    if (password == "S") {
        esPassword = true;
        autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
    } else {
        esPassword = false;
        autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS;
        if (teclado == "E") {
            autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
        }
    }
    autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
    var input = {
        view: null,
        input: null,
        label: null,
        imagen: null,
        boton: null,
    };
    input.view = Ti.UI.createView({
        borderRadius: 8,
        backgroundColor: colores.blanco,
        width: ancho,
        height: 55,
    });
    var imagenMostrar = "";
    if (imagenPng != "") {
        imagenMostrar = rutaImagen + imagenPng;
    } else {
        imagenMostrar = rutaImagen + "editar.png";
    }
    input.imagen = Ti.UI.createImageView({
        image: imagenMostrar,
        top: 12,
        left: 5,
        width: 27,
        height: 27,
    });
    input.view.add(input.imagen);
    input.input = Ti.UI.createTextField({
        autocapitalization: autocapitalization,
        font: { fontFamily: params.fuente, fontSize: 14 },
        tintColor: colores.negro,
        autocorrect: false,
        keyboardType: tipoTeclado,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        color: colores.negro,
        passwordMask: esPassword,
        hintText: placeholder,
        hintTextColor: colores.gris,
        left: 40,
        right: 50,
        height: 45,
    });
    input.view.add(input.input);
    if(imagenBtn!=''){
        imagenBtn = rutaImagen + imagenBtn;
        input.boton = Ti.UI.createView({
            width: 50,
            height: 50,
            right: 0,
        });
        input.boton.add( Ti.UI.createView({ height: '50%', right: 47, left: 2, borderWidth:1, borderColor: colores.gris,  backgroundColor: colores.gris }) )
        input.boton.add( Ti.UI.createImageView({image: imagenBtn, width: 25, height:25}));
        input.view.add(input.boton);
    }
    return input;
}
module.exports = Input;