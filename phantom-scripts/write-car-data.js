var car = {
    price: '-',
    vin: '-', 
    make: '-',
    model: '-',
    year: '-',
    miles: '-',
    description: '-',
    trim: '-',
    extcolor: '-',
    intcolor: '-',
    transmission: '-',
    liters: '-',
    cylinders: '-',
    drivetype: '-',
    numdoors: '-',
    fuel: '-',
    imgs: []
}

/**
 * executing-phantom.js
 */

var spawn = require('child_process').spawn;
var mongo = require('../mongo.js');
var args = [];
var urls = function(callback) {
    return mongo.getAllUrls(function(allUrls) {
        var sorted = allUrls.sort(function(a, b) {
            var fval = a.split('=');
            //console.log(fval[1]);
            var sval = b.split('=');
            //console.log(sval[1]);
            if (fval[1] > sval[1])
                return 1;
            else if (fval[1] < sval[1])
                return -1;
            return 0;
        });
    //console.log(sorted);
    callback(sorted);
    });
};

var populateArgs = function(callback) {  
    return urls(function(sortedUrls) {
        if (sortedUrls) {
            console.log(["./get-car-data.js"].concat(sortedUrls));
            callback(["./get-car-data.js"].concat(sortedUrls));
        }
    });
}
populateArgs(function(args) {
    // In case you want to customize the process, modify the options object
var options = {};

// If phantom is in the path use 'phantomjs', otherwise provide the path to the phantom phantomExecutable
// e.g for windows:
// var phantomExecutable = 'E:\\Programs\\PhantomJS\\bin\\phantomjs.exe';
var phantomExecutable = "../phantomjs";

/**
 * This method converts a Uint8Array to its string representation
 */
function Uint8ArrToString(myUint8Arr){
    return String.fromCharCode.apply(null, myUint8Arr);
};
console.log("testing");
console.log(args);
var child = spawn(phantomExecutable, args, options);

// Receive output of the child process
child.stdout.on('data', function(data) {
    var textData = Uint8ArrToString(data);   
    console.log(textData);
});

// Receive error output of the child process
child.stderr.on('data', function(err) {
    var textErr = Uint8ArrToString(err);
    console.log(textErr);
});

// Triggered when the process closes
child.on('close', function(code) {
    console.log('Process closed with status code: ' + code);
});

});

