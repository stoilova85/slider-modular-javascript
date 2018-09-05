//logging module:  will look after all the necessary work related to logging messages  for our application
var ImagesInc_LoggingHandler = (function() {
    //private variable
    var defaultHelloMsg = 'this is just to say Hello to the users!',
        theInterface = {
            logError: function(errorMsg) {
                console.error(errorMsg);
            },
            logInfo: function(infoMsg) {
                if (!infoMsg) {
                    infoMsg = this.defaultHelloMsg;
                }
                console.log(infoMsg);
            }
        };
    return theInterface;
})();