/**
 * phantom-script.js
 */
"use strict";
// Example using HTTP POST operation in PhantomJS
// This website exists and is for test purposes, dont post sensitive information
var page = require('webpage').create();

page.open('https://www.ksl.com/auto/search/index?p=&keyword=memberId%3A2982824&miles=0&page=0', function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
        phantom.exit();
    }
    else {
        var script1 = 'function() { window.blocks = document.querySelectorAll("div[class=\'photo-block\']"); }';
        var script2 = 'function() { return window.blocks.array.map(function(element) { element.querySelector("a").href }); }';
        page.evaluateJavaScript(script1);
        var links = page.evaluateJavaScript(script2);
        console.log(links[0]);
        /*var blocks = page.evaluate(function() {
            var elems = document.querySelectorAll("div[class='photo-block']");
            
            return elems;
        });
        console.log(blocks); */

        phantom.exit();
    }
    
});