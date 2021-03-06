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

page.open("http://github.panli.com/", function(status) {
    if (status === "success") {
        page.onConsoleMessage = function(msg, lineNum, sourceId) {
            console.log('CONSOLE: ' + msg);
        };

        evaluate(page, function(data) {
            document.getElementById("user_name").value = data.email;
            document.getElementById("password").value = data.password;
            document.getElementsByClassName("green")[0].click();
            console.log('Just entered Panli git info' + data);
        }, data);


        setTimeout(function() {
            var cookies = page.cookies;


            for (var i in cookies) {
                console.log(i + '****' + cookies[i].name + '=' + cookies[i].value + '*****domain ==' + cookies[i].domain);
            }

            console.log(JSON.stringify(cookies));
            console.log(page.title); // get page Title

            phantom.exit()
        }, 3000)


    }
});