var loggingInView;
var loggingInIndicator;
var loggingInLabel;
exports.show = function(customWin) {
    if (typeof customWin != 'undefined')  {
            if(Ti.Platform.osname=='android'){
              loggingInIndicator = Ti.UI.Android.createProgressIndicator({
                width: '90%',
                message: 'Por favor espere...',
                location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
                type: Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
                cancelable: true,
                min: 0,
                max: 10
              });
              loggingInIndicator.show();
            }
            else {
               customWin.touchEnabled = false;
               loggingInView = Ti.UI.createView({
                  borderWidth: 3,
                  borderColor: '#3a4761',
                  borderRadius : 10,
                  opacity : 0.9,
                  width: Ti.Platform.osname=="android" ? 130 : 80,
                  height: Ti.Platform.osname=="android" ? 130 : 80,
                  zIndex : 7777,
                  backgroundColor: 'black'
               });
               loggingInIndicator = Titanium.UI.createActivityIndicator({
                     style: Ti.UI.ActivityIndicatorStyle.BIG
               });
               loggingInView.add(loggingInIndicator);
               loggingInIndicator.show();
               customWin.add(loggingInView);
            }
    }
    else{
      Ti.API.info("*** No tenemos ventana....");
    }
};
exports.hide = function(customWin) {
  if (typeof customWin != 'undefined')  {
     if(Ti.Platform.osname=='android'){
       try{
        loggingInIndicator.hide();
       }
       catch(e){
        Ti.API.info("*** No podemos quitar el indicador");
       }
     }
     else{
       try{
            customWin.remove(loggingInView);
          }
          catch(e){
            Ti.API.info("*** Intentamos quitar el preloader");
          }
          customWin.touchEnabled = true;
        }
  }
};