var webPage = require('webpage');
var page = webPage.create();

page.open('https://www.taobao.com', function(status) {

    setTimeout(function() {


        var cookies = page.cookies;

        // console.log(JSON.stringify(cookies));

        for (var i in cookies) {
            console.log(i + '****' + cookies[i].name + '=' + cookies[i].value + '*****domain ==' + cookies[i].domain);
        }
        phantom.exit();

    }, 5000)

});