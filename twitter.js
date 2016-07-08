function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}


/* THIS IS A BUG */



var args = require('system').args;
var page = require('webpage').create();

var data = {
    email: args[1],
    password: args[2],
};

page.open("https://twitter.com/login", function(status) {
    if (status === "success") {
        page.onConsoleMessage = function(msg, lineNum, sourceId) {
            console.log('CONSOLE: ' + msg);
        };

        evaluate(page, function(data) {
            document.getElementsByClassName("js-username-field")[0].value = data.email;
            document.getElementsByClassName("js-password-field")[0].value = data.password;
            document.getElementsByClassName("js-signin")[0].submit();
            console.log('Just entered Twitter info' + data);
        }, data);
    }
});