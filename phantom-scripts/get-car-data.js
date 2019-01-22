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
console.log("Array length is: " + urls.length);

var x = 0;
var shouldRetry = false;
var callback = function(urls) {
    var url = urls[x];
    console.log(url);
    if (url) {
        return page.open(url, function (status) {
            console.log("URL: " + url);
            console.log("Status: " + status);
            console.log("Value of X: " + x);

            if (status !== "success") { 
                if (shouldRetry) {
                    phantom.exit();
                }
                else {
                    shouldRetry = true;
                    return setTimeout(2500, callback(urls));  
                }         
            }
            else {
                
            /*var mainChunk = page.evaluate(function() {
                return document.querySelector("div[class='main-column']").getAttribute("data-listing");
            }); */
            x++;
            var description = page.evaluate(function() {
                var a = document.querySelector("a[class^='more']");
                var e = document.createEvent('MouseEvents');
                e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e);
                waitforload = true;
                return document.querySelector("div[class='full']").innerText;
            });
            
            var specRowsEven = page.evaluate(function() {
                waitforload = true;
                return [].map.call(document.querySelectorAll("li[class^='specificationsTableRowEven']"), function(elem) {
                    return elem.innerText;
                });
            });
            var specRowsOdd = page.evaluate(function() {
                waitforload = true;
                return [].map.call(document.querySelectorAll("li[class^='specificationsTableRowOdd']"), function(elem) {
                    return elem.innerText;
                });
            });
            
            var imgUrls = page.evaluate(function() {
                waitforload = true;
                return [].map.call(document.querySelectorAll("li[style^='width']"), function(elem) {
                    return elem.firstChild.src;

                });
            });
              
            console.log("description:" + description);   
            for(var i = 0; i < specRowsEven.length; ++i) {
                if(specRowsEven[i]) {
                    console.log("car-info:" + specRowsEven[i]);                    
                }
            }    
             
            for(var i = 0; i < specRowsOdd.length; ++i) {
                if(specRowsOdd[i]) {
                    console.log("car-info:" + specRowsOdd[i]);                    
                }
            }
            
            for(var i = 0; i < imgUrls.length; ++i) {
                if(imgUrls[i]) {
                    console.log("imgUrls:" + imgUrls[i]);                    
                }
            }
            


                if (x < urls.length) {
                // navigate to the next url and the callback is this function (recursion)
                    return callback(urls);
                } else {
                // exit phantom once the array has been iterated through
                    phantom.exit();
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

