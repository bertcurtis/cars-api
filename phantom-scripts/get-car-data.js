"use strict";
// Example using HTTP POST operation in PhantomJS
var page = require("webpage").create(),
  system = require("system");

console.log("test");
console.log(system.args[0]);
var urls = system.args;
urls.shift();
console.log("Array length is: " + urls.length);

var x = 0;
var failureIncrement = 0;
var callback = function (urls) {
  var url = urls[x];
  console.log(url);
  if (url) {
    return page.open(url, function (status) {
      console.log("url=" + url);
      console.log("Status=" + status);
      console.log("Value of X=" + x);

      if (status !== "success") {
        if (failureIncrement > 2) {
          phantom.exit();
        } else {
          ++failureIncrement;
          return setTimeout(2500, callback(urls));
        }
      } else {
        try {
        x++;
        /*var mainChunk = page.evaluate(function() {
                return document.querySelector("div[class='main-column']").getAttribute("data-listing");
            }); */
        var carInfo = [],
            imgs = [],
            desc;
        var description = page.evaluate(function () {
          var a = document.querySelector("a[class^='more']");
          var e = document.createEvent("MouseEvents");
          e.initMouseEvent(
            "click",
            true,
            true,
            window,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null
          );
          a.dispatchEvent(e);
          waitforload = true;
          return document.querySelector("div[class='full']").innerText;
        });

        var specRowsEven = page.evaluate(function () {
          waitforload = true;
          return [].map.call(
            document.querySelectorAll(
              "li[class^='specificationsTableRowEven']"
            ),
            function (elem) {
              return elem.innerText;
            }
          );
        });
        var specRowsOdd = page.evaluate(function () {
          waitforload = true;
          return [].map.call(
            document.querySelectorAll("li[class^='specificationsTableRowOdd']"),
            function (elem) {
              return elem.innerText;
            }
          );
        });

        var imgUrls = page.evaluate(function () {
          waitforload = true;
          return [].map.call(
            document.querySelectorAll("li[style^='width']"),
            function (elem) {
              return elem.firstChild.src;
            }
          );
        });
        
        
        desc = description.trim();
        for (var i = 0; i < specRowsEven.length; ++i) {
          if (specRowsEven[i]) {
            carInfo.push(specRowsEven[i].trim());
          }
        }

        for (var i = 0; i < specRowsOdd.length; ++i) {
          if (specRowsOdd[i]) {
            carInfo.push(specRowsOdd[i].trim());
          }
        }

        for (var i = 0; i < imgUrls.length / 2; ++i) {
          if (imgUrls[i]) {
            imgs.push(imgUrls[i].trim());
          }
        }
        console.log("description=" + desc);
        console.log("car-info=" + carInfo);
        console.log("img-urls=" + imgs);
      }
      catch (err) {
        console.log(err);
        --x;
        ++failureIncrement;
        return setTimeout(2500, callback(urls));
      }

        if (x < urls.length) {
          // navigate to the next url and the callback is this function (recursion)
          return setTimeout(2000, callback(urls));
        } else {
          // exit phantom once the array has been iterated through
          phantom.exit();
        }
      }
    });
  } else {
    x++;
    return callback(urls);
  }
};
callback(urls);
