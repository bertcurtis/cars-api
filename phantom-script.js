/**
 * phantom-script.js
 */
"use strict";
// Example using HTTP POST operation in PhantomJS
// This website exists and is for test purposes, dont post sensitive information
var page = require('webpage').create();

/*var links = [];
var curateMongo = function (urls, callback) {
    for (var i = 0; i < urls.length; ++i) {
        
        mongo.insertNewUserDocument(insertObject, function(result) {
            console.log(urls[i]);
            console.log(result);
        });
    }
    return callback;
};*/


page.open('https://www.ksl.com/auto/search/index?p=&keyword=memberId%3A2982824&miles=0&page=0', function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
        phantom.exit();
    }
    else {
        /*
        var script1 = 'function() { window.blocks = document.querySelectorAll("div[class=\'photo-block\']"); }';
        var script2 = 'function() { return window.blocks.array.map(function(element) { element.querySelector("a").href }); }';
        page.evaluateJavaScript(script1);
        var links = page.evaluateJavaScript(script2);
        console.log(links[0]);*/

        var blocks = page.evaluate(function() {
            return [].map.call(document.querySelectorAll("div[class='photo-block']"), function(elem) {
                return elem.querySelector("a").href;
            });
        });       
        for(var i = 0; i < blocks.length; ++i) {
            if(blocks[i]) {
                console.log(blocks[i]);                    
            }
        }       
        phantom.exit();
        /*
        mongo.insertNewUserDocument( { 'url' : blocks[i] }, function(result) {
            console.log(blocks[i]);
            console.log(result);
        }); */              
    }  
});
/*
for (var i = 0; i < links.length; ++i) {
    var insertObject = { url : "'" + links[i] + "'" };
    mongo.insertNewUserDocument(insertObject, function(result) {
        console.log(links[i]);
        console.log(result);
    });
    if (i >= links.length) {
        phantom.exit();
    }
}*/
