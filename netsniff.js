"use strict";

var url = require('system').args[1];
var page = require('webpage').create();
page.resourcesUrl = [];
page.onResourceReceived = function(resource) {
    page.resourcesUrl[resource.id] = resource.url;
};
page.open(url, function(status) {
    if (status == 'success') {
        var resources = [];
        page.resourcesUrl.forEach(function(url) {
            resources.push(url);
        });
        console.log(resources);
        phantom.exit();
    } else {
        console.log(status);
        phantom.exit(1);
    }
});