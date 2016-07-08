## PhantomJS 模拟登陆



## 目录

- 概述
- REPL环境
- webpage模块
    - open()
    - evaluate()
    - includeJs()
    - render()
    - viewportSize，zoomFactor
    - onResourceRequested
    - onResourceReceived
- system模块
- 应用
    - 过滤资源
    - 截图
    - 抓取图片
    - 生成网页
- 参考链接


### 概述

有时，我们需要浏览器处理网页，但并不需要浏览，比如生成网页的截图、抓取网页数据等操作。
[PhantomJS](http://phantomjs.org/)的功能，就是提供一个浏览器环境的命令行接口，
你可以把它看作一个“虚拟浏览器”，
除了不能浏览，其他与正常浏览器一样。它的内核是WebKit引擎，不提供图形界面，
只能在命令行下使用，我们可以用它完成一些特殊的用途。

PhantomJS是二进制程序，需要安装后使用。

```
$ npm install phantomjs -g
```

使用下面的命令，查看是否安装成功。

```
$ phantomjs --version
```

### REPL环境

phantomjs提供了一个完整的REPL环境，允许用户通过命令行与PhantomJS互动。
键入phantomjs，就进入了该环境。

```
$ phantomjs
```

这时会跳出一个phantom提示符，就可以输入Javascript命令了。

```
phantomjs> 1+2
3

phantomjs> function add(a,b) { return a+b; }
undefined

phantomjs> add(1,2)
3
```


按 `ctrl+c` 可以退出该环境。


下面，我们把上面的`add()`函数写成一个文件 `add.js` 文件。

```
// add.js

function add(a,b){ return a+b; }

console.log(add(1,2));

phantom.exit();
```


上面的代码中，console.log()的作用是在终端窗口显示，phantom.exit()则表示退出phantomjs环境。
一般来说，不管什么样的程序，exit这一行都不能少。

现在，运行该程序。

```
$ phantomjs add.js
```


终端窗口就会显示结果为3。

下面是更多的例子。

```s
phantomjs> phantom.version
{
   "major": 2,
   "minor": 1,
   "patch": 1
}
phantomjs> window.navigator
{
   "appCodeName": "Mozilla",
   "appName": "Netscape",
   "appVersion": "5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1",
   "cookieEnabled": true,
   "language": "zh-CN",
   "mimeTypes": {
      "length": 0
   },
   "onLine": true,
   "platform": "MacIntel",
   "plugins": {
      "length": 0
   },
   "product": "Gecko",
   "productSub": "20030107",
   "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1",
   "vendor": "Apple Computer, Inc.",
   "vendorSub": ""
}
phantomjs> 
```


### webpage模块

webpage模块是PhantomJS的核心模块，用于网页操作。

```js
var webPage = require('webpage');
var page = webPage.create();
```

上面代码表示加载PhantomJS的webpage模块，并创建一个实例。


#### open()


open方法用于打开具体的网页。


```js
var page = require('webpage').create();

page.open('http://zanjs.com', function (s) {
  console.log(s);
  phantom.exit();
});
```

上面代码中，open()方法，用于打开具体的网页。它接受两个参数。
第一个参数是网页的网址，第二个参数是回调函数，网页打开后该函数将会运行，
它的参数是一个表示状态的字符串，如果打开成功就是success，否则就是fail。

注意，只要接收到服务器返回的结果，
`PhantomJS` 就会报告网页打开成功，而不管服务器是否返回404或500错误。


`open` 方法默认使用 `GET` 方法，与服务器通信，但是也可以使用其他方法。

```js
var webPage = require('webpage');
var page = webPage.create();
var postBody = 'user=username&password=password';

page.open('http://www.google.com/', 'POST', postBody, function(status) {
  console.log('Status: ' + status);
  // Do other things here...
});
```

上面代码中，使用 `POST` 方法向服务器发送数据。
`open` 方法的第二个参数用来指定 
`HTTP`方法，
第三个参数用来指定该方法所要使用的数据。


`open` 方法还允许提供配置对象，对`HTTP`请求进行更详细的配置。


```js
var webPage = require('webpage');
var page = webPage.create();
var settings = {
  operation: "POST",
  encoding: "utf8",
  headers: {
    "Content-Type": "application/json"
  },
  data: JSON.stringify({
    some: "data",
    another: ["custom", "data"]
  })
};

page.open('http://your.custom.api', settings, function(status) {
  console.log('Status: ' + status);
  // Do other things here...
});
```

#### evaluate()

`evaluate`方法用于打开网页以后，在页面中执行`JavaScript`代码。

```js
var page = require('webpage').create();

page.open(url, function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });
  console.log('Page title is ' + title);
  phantom.exit();
});
```

网页内部的 `console` 语句，以及 `evaluate` 方法内部的 `console` 语句，默认不会显示在命令行。
这时可以采用 `onConsoleMessage` 回调函数，上面的例子可以改写如下。


```js
var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  console.log('Page title is ' + msg);
};

page.open(url, function(status) {
  page.evaluate(function() {
    console.log(document.title);
  });
  phantom.exit();
});
```

上面代码中，`evaluate`方法内部有 `console` 语句，
默认不会输出在命令行。这时，可以用 `onConsoleMessage`方法监听这个事件，进行处理。

#### includeJs()

includeJs方法用于页面加载外部脚本，加载结束后就调用指定的回调函数。

```js
var page = require('webpage').create();
page.open('https://www.taobao.com', function() {
  page.includeJs("http://github.panli.com/js/jquery-1.11.3.min.js", function() {
    page.evaluate(function() {
      $("button").click();
    });
    phantom.exit()
  });
});
```

上面的例子在页面中注入 `jQuery` 脚本，然后点击所有的按钮。需要注意的是，
由于是异步加载，所以 `phantom.exit()` 语句要放在 
`page.includeJs()` 方法的回调函数之中，否则页面会过早退出。




## License

The MIT License (MIT)