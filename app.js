'use strict';


var page = require('webpage').create();


page.open('http://panli.com', function(status) {
    console.log("Status2: " + status);
    if (status === "success") {

        //page.render('./images/panli.png'); //生成渲染后的界面图片
    }

    var info = page.evaluate(function() {
        var json = {
            body: document.body,
            title: document.title
        }
        return json;
    });
    console.log('Page info ' + JSON.stringify(info));



    phantom.exit();
});