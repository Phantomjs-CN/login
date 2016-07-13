var http = require('http'),
    phantom = require('phantom');
url = require("url");

http.createServer(function(request, response) {
    var start = Date.now();

    request.on('end', function() {
        phantom.create(function(ph) {
            ph.createPage(function(page) {
                var _get = url.parse(request.url, true).query;

                page.open(_get[url], function(status) {
                    if (status == 'success') {
                        var time = Date.now() - start;
                        console.log(time);
                    }
                });
            });
        });
    });
}).listen(8808, '');