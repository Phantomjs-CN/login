var webPage = require('webpage');
var page = webPage.create();



var system = require('system');

var args = system.args;

page.open('https://m.taobao.com', function(status) {

    setTimeout(function() {


        var cookies = page.cookies;

        // window.localStorage


        console.log(JSON.stringify(localStorage));

        // console.log(JSON.stringify(cookies));

        for (var i in cookies) {
            console.log(i + '****' + cookies[i].name + '=' + cookies[i].value + '*****domain ==' + cookies[i].domain);
        }
        phantom.exit();

    }, 2000)

});