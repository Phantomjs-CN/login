var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return page.open('https://www.taobao.com/');
    })
    .then(status => {
        console.log(status);
        return sitepage.property('cookies');
    })
    .then(cookies => {
        console.log(cookies);
        sitepage.close();
        phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });