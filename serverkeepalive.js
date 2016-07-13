"use strict";
var port, server, service,
    system = require('system');

var webPage = require('webpage');
var page = webPage.create();

function getAllCiikies() {

}

port = 8890;
server = require('webserver').create();

service = server.listen(port, {
    keepAlive: true
}, function(request, response) {
    console.log('Request at ' + new Date());
    console.log(JSON.stringify(request, null, 4));

    var body = JSON.stringify(request, null, 4);
    response.statusCode = 200;
    response.headers = {
        'Cache': 'no-cache',
        'Content-Type': 'text/plain',
        'Connection': 'Keep-Alive',
        'Keep-Alive': 'timeout=5, max=100',
        'Content-Length': body.length
    };

    // page.open('https://www.taobao.com', function(status) {
    //     var cookies = page.cookies;

    //     console.log(JSON.stringify(cookies));
    //     response.write(cookies);

    //     response.close();
    //     phantom.exit();

    // });

});

if (service) {
    console.log('Web server running on port ' + port);
} else {
    console.log('Error: Could not create web server listening on port ' + port);
    phantom.exit();
}