var casper = require('casper').create();


casper.start();

casper.thenOpen('http://taobao.com/', function(response) {
    this.echo(this.getTitle());
    console.log('---------------------------------------------------------------');
    var cookies = phantom.cookies;
    // var cookies = this.page.cookies;
    for (var i = 0, len = cookies.length; i < len; i++) {
        console.log(cookies[i].name + ': ' + cookies[i].value);
    }
    console.log('---------------------------------------------------------------');
});

// casper.thenOpen('http://baidu.com', function() {
//     this.echo(this.getTitle());
// });

casper.run();