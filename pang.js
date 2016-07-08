"use strict";


function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}



var args = require('system').args;
var page = require('webpage').create();

var data = {
    email: args[1],
    password: args[2],
};

page.open("http://github.panli.com/user/login", function(status) {
    if (status === "success") {
        page.onConsoleMessage = function(msg, lineNum, sourceId) {
            console.log('CONSOLE: ' + msg);
        };

        evaluate(page, function(data) {
            document.getElementById("user_name").value = data.email;
            document.getElementById("password").value = data.password;
            document.getElementsByClassName("form")[0].click();
            console.log('Just entered Panli git info' + data);
        }, data);
    }
});