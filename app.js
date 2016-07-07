'use strict';


var page = require('webpage').create();


page.open('http://biadu.com', function(status) {
    console.log("Status: " + status);
    if (status === "success") {
        page.render('example.png');
    }
    phantom.exit();
});



