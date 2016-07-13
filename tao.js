"use strict";


function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}



var args = require('system').args;
var page = require('webpage').create();

var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";

page.settings.userAgent = userAgent;

var data = {
    url: "https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm",
    email: args[1],
    password: args[2],
};

page.open(data.url, function(status) {
    if (status === "success") {
        page.onConsoleMessage = function(msg, lineNum, sourceId) {
            console.log('CONSOLE: ' + msg);
        };

        evaluate(page, function(data) {
            document.getElementById("J_Static2Quick").click();
            document.getElementById("TPL_username_1").value = data.email;
            document.getElementById("TPL_password_1").value = data.password;
            document.getElementById("J_SubmitStatic").click();
            console.log('taobao info' + data);
        }, data);


        setTimeout(function() {
            var cookies = page.cookies;


            for (var i in cookies) {
                console.log(i + '****' + cookies[i].name + '=' + cookies[i].value + '*****domain ==' + cookies[i].domain);
            }

            // console.log(JSON.stringify(cookies));
            console.log(page.url); // get page Title
            console.log(page.title); // get page Title

            phantom.exit()
        }, 1000)


    }
});