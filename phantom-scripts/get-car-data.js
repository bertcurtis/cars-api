/**
 * phantom-script.js
 */
"use strict";
// Example using HTTP POST operation in PhantomJS
var mongo = require('../mongo.js');

var urls = mongo.getAllUrls(function(urls) {
    var sorted = urls.sort(function(a, b) {
        if (a[a.length - 1] > b[b.length - 1])
            return 1;
        else if (a[a.length - 1] < b[b.length - 1])
            return -1;
        else
            return 0;
    });
    return sorted;
});
var page = require('webpage').create();

urls.forEach(url => {
    page.open(url, function (status) {
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


            /*var mainChunk = page.evaluate(function() {
                return document.querySelector("div[class='main-column']").getAttribute("data-listing");
            });*/
            var description = page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
                return page.evaluate(function() {
                    $("a[class^='more']").click();
                    return document.querySelector("div[class='full']").innerText;
                });
            });
            var specRowsEven = page.evaluate(function() {
                return [].map.call(document.querySelectorAll("li[class^='specificationsTableRowEven']"), function(elem) {
                    return elem.innerText;
                });
            });
            var specRowsOdd = page.evaluate(function() {
                return [].map.call(document.querySelectorAll("li[class^='specificationsTableRowOdd']"), function(elem) {
                    return elem.innerText;
                });
            });
            var imgUrls = page.evaluate(function() {
                return [].map.call(document.querySelectorAll("li[style^='width'"), function(elem) {
                    return elem.firstChild.src;

                });
            });
            console.log("description: " + description);     
            for(var i = 0; i < specRowsEven.length; ++i) {
                if(specRowsEven[i]) {
                    console.log("car-info: " + specRowsEven[i]);                    
                }
            }       
            for(var i = 0; i < specRowsOdd.length; ++i) {
                if(specRowsOdd[i]) {
                    console.log("car-info: " + specRowsOdd[i]);                    
                }
            }
            for(var i = 0; i < imgUrls.length; ++i) {
                if(imgUrls[i]) {
                    console.log("imgUrls: " + imgUrls[i]);                    
                }
            }
            phantom.exit();          
        }  
    });
});
