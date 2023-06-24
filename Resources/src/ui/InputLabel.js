function Input(placeholder, ancho, teclado, password) {
    var tipoTeclado;
    var esPassword;
    var autocapitalization;
    switch (teclado) {
        case "N":
            tipoTeclado = Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION;
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
    };
    input.view = Ti.UI.createView({
        borderRadius: 8,
        backgroundColor: colores.blanco, //colores.inputFondo,
        borderColor: colores.verde,
        width: ancho,
        height: 55,
    });
    input.label = Ti.UI.createLabel({
        text: placeholder,
        color: colores.verde,
        font: { fontFamily: params.fuente_normal, fontSize: 12 }  ,
        textAlign: 'left',
        top: 1,
        left:4,
    });
    input.view.add(input.label);
    input.input = Ti.UI.createTextField({
        autocapitalization: autocapitalization,
        font: { fontFamily: params.fuente, fontSize: 14 },
        tintColor: colores.gris,
        autocorrect: false,
        keyboardType: tipoTeclado,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        color: colores.gris,
        passwordMask: esPassword,
        // hintText: placeholder,
        // hintTextColor: colores.inputTexto,
        bottom: 1,
        right: 5,
        left: 5,
        height: 45,
    });
    input.view.add(input.input);
    return input;
}
module.exports = Input;