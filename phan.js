"use strict";

var page = require('webpage').create();

page.viewportSize = {
    width: 1024,
    height: 600
};


//

page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36';


page.open('https:/instagram.com/accounts/login/', function() {

    var ig = page.evaluate(function() {
        function getCoords(box) {
            return {
                x: box.left,
                y: box.top
            };
        }

        function getPosition(type, name) {
            // 找到字段填写
            var input = document.getElementsByTagName(type);
            for (var i = 0; i < input.length; i++) {
                if (name && input[i].name == name) return getCoords(input[i].getBoundingClientRect());
                else if (!name && input[i].className) return getCoords(input[i].getBoundingClientRect()); // this is for login button
            }
        }
        return {
            user: getPosition('input', 'username'),
            pass: getPosition('input', 'password'),
            login: getPosition('button')
        };




    });

    // 填充数据，点击登录
    page.sendEvent('click', ig.user.x, ig.user.y);
    page.sendEvent('keypress', 'zanjser');

    page.sendEvent('click', ig.pass.x, ig.pass.y);
    page.sendEvent('keypress', 'qq123456');
    page.sendEvent('click', ig.login.x, ig.login.y);


    // 等待回应
    setTimeout(function() {
        page.render('insta.png');
        phantom.exit();
    }, 5000);

});