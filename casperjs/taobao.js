var casper = require('casper').create({
    pageSettings: {
        loadImages: false,

        // 1.浏览器
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
    },

    // 2.浏览器窗口大小
    viewportSize: {
        width: 320,
        height: 568
    }
});

// var args = require('system').args;

var data = {
    name: "恬恬西瓜",
    password: "apily7q8w9epanli",
};

console.log(data.name)

casper.start();

casper.on('http.status.404', function(resource) {
    this.log('Hey, this one is 404: ' + resource.url, 'warning');
});

// 3.加载页面
casper.thenOpen('https://m.taobao.com/', function() {
    // 4.截取整个页面（无登录态）
    casper.captureSelector('./taobao/1.png', 'html');

    // 5.逐一读取cookie并显示出来
    console.log('---------------------------------------------------------------');
    var cookies = phantom.cookies;
    for (var i = 0, len = cookies.length; i < len; i++) {
        console.log(cookies[i].name + ': ' + cookies[i].value);
    }
    console.log('---------------------------------------------------------------');
    casper.wait(1000);
    // 6.点击登录按钮
    casper.mouse.click('.my');

    // 7.等待跳转到登陆页
    casper.wait(3000);
    casper.then(function() {

        // 8.登录页截图
        casper.captureSelector('./taobao/2.png', 'html');

        // 9.在当前页面的DOM环境中执行js代码
        // 更推荐的办法是使用fill或fillForm方法来填写表单
        casper.evaluate(function() {
            document.querySelector('[name=TPL_username]').value = "恬恬西瓜";
            document.querySelector('[name=TPL_password]').value = "apily7q8w9epanli";
            document.getElementById("submit-btn").disabled = "";
        });

        // 10.截取填写登录表单后的样子
        casper.captureSelector('./taobao/3.png', 'html');

        // 11.点击登录按钮
        casper.mouse.click('#submit-btn');

        // 12.等待跳转回首页
        casper.wait(2000);
        casper.then(function() {
            casper.captureSelector('./taobao/4.png', 'html');

            // 13.逐一读取cookie并显示出来
            console.log('---------------------------------------------------------------');
            var cookies = phantom.cookies;
            for (var i = 0, len = cookies.length; i < len; i++) {
                console.log(cookies[i].name + ': ' + cookies[i].value);
            }
            console.log('---------------------------------------------------------------');
        });
    });

});

casper.run();