/**
 * phantom-script.js
 */
"use strict";
// Example using HTTP POST operation in PhantomJS
var page = require('webpage').create(),
    system = require('system');

console.log('test');
console.log(system.args[0]);
var urls = system.args;
urls.shift();
console.log(urls[0]);

var x = 0;
var shouldRetry = false;
var callback = function(urls, retry) {
    var url = urls[x];
    console.log(url);
    if (url) {
    return page.open(url, function (status) {
        console.log("URL: " + url);
        console.log("Status: " + status);

        if (status !== "success") { 
            if (shouldRetry) {
                phantom.exit();
            }
            else {
                shouldRetry = true;
                return setTimeout(1000, callback(urls));  
            }         
        }
        else {
            x++;
        /*
        var script1 = 'function() { window.blocks = document.querySelectorAll("div[class=\'photo-block\']"); }';
        var script2 = 'function() { return window.blocks.array.map(function(element) { element.querySelector("a").href }); }';
        page.evaluateJavaScript(script1);
        var links = page.evaluateJavaScript(script2);
        console.log(links[0]);*/


            /*var mainChunk = page.evaluate(function() {
                return document.querySelector("div[class='main-column']").getAttribute("data-listing");
            });*/
            /*
            var description = page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
                return page.evaluate(function() {
                    $("a[class^='more']").click();
                    return document.querySelector("div[class='full']").innerText;
                });
            });*/
            var specRowsEven = page.evaluate(function() {
                return [].map.call(document.querySelectorAll("li[class^='specificationsTableRowEven']"), function(elem) {
                    return elem.innerText;
                });
            });
            var specRowsOdd = page.evaluate(function() {
                return [].map.call(document.querySelectorAll("li[class^='specificationsTableRowOdd']"), function(elem) {
                    return elem.innerText;
                });
            });/*
            var imgUrls = page.evaluate(function() {
                return [].map.call(document.querySelectorAll("li[style^='width'"), function(elem) {
                    return elem.firstChild.src;

                });
            });*/
            //console.log("description: " + description);  
               
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
            /*
            for(var i = 0; i < imgUrls.length; ++i) {
                if(imgUrls[i]) {
                    console.log("imgUrls: " + imgUrls[i]);                    
                }
            }*/

            if (x < urls.length) {
                // navigate to the next url and the callback is this function (recursion)
                return callback(urls);
            } else {
                // try navigate to the next url (it is undefined because it is the last element) so the callback is exit
                return callback(urls, function () {
                    console.log(urls[x]);
                    phantom.exit();
                });
            }          
        }  
    });   
}
else {
    x++;
    return callback(urls);
}
}
callback(urls);

