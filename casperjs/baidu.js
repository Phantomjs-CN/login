var casper = require('casper').create({
    pageSettings: {
        loadImages: false,

        // 1.浏览器
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    },

    // 2.浏览器窗口大小
    viewportSize: {
        width: 1220,
        height: 776
    }
});

casper.start();

// 3.加载页面
casper.thenOpen('https://www.baidu.com/', function() {
    // 4.截取整个页面（无登录态）
    casper.captureSelector('./baidu/1.png', 'html');

    // 5.逐一读取cookie并显示出来
    console.log('---------------------------------------------------------------');
    var cookies = phantom.cookies;
    for (var i = 0, len = cookies.length; i < len; i++) {
        console.log(cookies[i].name + ': ' + cookies[i].value);
    }
    console.log('---------------------------------------------------------------');

    // 6.点击登录按钮
    casper.mouse.click('#su');

    // 7.等待跳转到登陆页
    casper.wait(3000);
    casper.then(function() {

        // 8.登录页截图
        casper.captureSelector('./baidu/2.png', 'html');

        // 9.在当前页面的DOM环境中执行js代码
        // 更推荐的办法是使用fill或fillForm方法来填写表单
        casper.evaluate(function() {
            document.querySelector('[name=username]').value = 'onmicn@163.com';
            document.querySelector('[name=password]').value = 'qq159753..';
        });

        // 10.截取填写登录表单后的样子
        casper.captureSelector('./baidu/3.png', 'html');

        // 11.点击登录按钮
        casper.mouse.click('#login-submit');

        // 12.等待跳转回首页
        casper.wait(3000);
        casper.then(function() {
            casper.captureSelector('./baidu/4.png', 'html');

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