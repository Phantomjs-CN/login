"use strict";


function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}


var u168 = 'https://login.1688.com/member/signin.htm?spm=a260k.635.1999448331.3.EwDpAt&Done=https%3A%2F%2Fwww.taobao.com%2F';

var backUrl = 'https://www.taobao.com/';

// u168 = u168 + backUrl;





var args = require('system').args;
var page = require('webpage').create();

var data = {
    email: args[1],
    password: args[2]
};

page.open(u168, function(status) {
    if (status === "success") {





        page.onConsoleMessage = function(msg, lineNum, sourceId) {
            console.log('CONSOLE: ' + msg);
        };
        console.log(data);
        evaluate(page, function(data) {
            document.getElementById("TPL_username_1").value = data.email;
            document.getElementById("TPL_password_1").value = data.password;
            document.getElementById("J_SubmitStatic").click();
            console.log('Just entered Panli git info' + data);
        }, data);


        setTimeout(function() {
            var cookies = page.cookies;

            console.log(JSON.stringify(cookies));

            phantom.exit()
        }, 1000)

    }
});