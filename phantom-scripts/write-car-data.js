var car = {
	price: "",
	vin: "",
	make: "",
	model: "",
	year: "",
	miles: "",
	description: "",
	trim: "",
	extcolor: "",
	intcolor: "",
	transmission: "",
	liters: "",
	cylinders: "",
	drivetype: "",
	numdoors: "",
	fuel: "",
	imgs: [],
	kslurl: ""
};
var descriptions = [],
	carInfoArrs = [],
	prices = [],
	imgArrs = [],
	kslUrls = [],
	cars = [];

var checkAttribute = function (input) {
	var parsedInput = input.split(':');
	switch (parsedInput[0].toLowerCase()) {
		case 'vin':
			car.vin = parsedInput[1].trim();
			break;
		case 'make':
			car.make = parsedInput[1].trim();
			break;
		case 'model':
			car.model = parsedInput[1].trim();
			break;
		case 'year':
			car.year = parsedInput[1].trim();
			break;
		case 'mileage':
			car.miles = parsedInput[1].trim();
			break;
		case 'trim':
			car.trim = parsedInput[1].trim();
			break;
		case 'exterior color':
			car.extcolor = parsedInput[1].trim();
			break;
		case 'interior color':
			car.intcolor = parsedInput[1].trim();
			break;
		case 'transmission':
			car.transmission = parsedInput[1].trim();
			break;
		case 'liters':
			car.liters = parsedInput[1].trim();
			break;
		case 'cylinders':
			car.cylinders = parsedInput[1].trim();
			break;
		case 'drive type':
			car.drivetype = parsedInput[1].trim();
			break;
		case 'number of doors':
			car.numdoors = parsedInput[1].trim();
			break;
		case 'fuel type':
			car.fuel = parsedInput[1].trim();
			break;
	}
}

var parseCarData = function (data) {
	for (var i = 0; i < data.length; ++i) {
		if (data[i] === 'description') {
			descriptions.push(data[i + 1]);
		}
		else if (data[i] === 'car-info') {
			carInfoArrs.push(data[i + 1]);
		}
		else if (data[i] === 'img-urls') {
			imgArrs.push(data[i + 1]);
		}
		else if (data[i] === 'url') {
			kslUrls.push(data[i + 1]);
		}
		else if (data[i] === 'price') {
			prices.push(data[i + 1]);
		}
	}
	/*
	if (data.startsWith('description')) {
		car.description = data.split('=')[1];
		return callback(car);
	}
	else if (data.startsWith('car-info')) {
		var infoData = data.split('=');
		var carInfos = infoData[1].split(',');
		var infosCount = 0;
		carInfos.forEach(function (infos) {
			if (infosCount > carInfos.length) {
				return callback(car);
			}
			else {
				++infosCount;
				checkAttribute(infos);
			}
		});
	}
	else if (data.startsWith('img-urls')) {
		var imgs = data.split('=');
		car.imgs = imgs[1].split(',');
		return callback(car);
	}
	else if (data.startsWith('url')) {
		car.kslurl = data.split('=')[1];
		return callback(car);
	}
	else if (data.startsWith('price')) {
		car.price = data.split('=')[1];
		return callback(car);
	}*/
};

var spawn = require("child_process").spawn;
var mongo = require("../mongo.js");
var urls = function (callback) {
	return mongo.getAllUrls(function (allUrls) {
		var sorted = allUrls.sort(function (a, b) {
			var fval = a.split('=');
			var sval = b.split('=');
			return fval[1] - sval[1];
		});
		callback(sorted);
	});
};

var populateArgs = function (callback) {
	return urls(function (sortedUrls) {
		if (sortedUrls) {
			console.log(["./get-car-data.js"].concat(sortedUrls));
			callback(["./get-car-data.js"].concat(sortedUrls));
		}
	});
};
populateArgs(function (args) {
	// In case you want to customize the process, modify the options object
	var options = {};

	// If phantom is in the path use 'phantomjs', otherwise provide the path to the phantom phantomExecutable
	// e.g for windows:
	// var phantomExecutable = 'E:\\Programs\\PhantomJS\\bin\\phantomjs.exe';
	var phantomExecutable = "../phantomjs";

	/**
	 * This method converts a Uint8Array to its string representation
	 */
	function Uint8ArrToString(myUint8Arr) {
		return String.fromCharCode.apply(null, myUint8Arr);
	}
	console.log("testing");
	console.log(args);
	var child = spawn(phantomExecutable, args, options);

	// Receive output of the child process
	child.stdout.on("data", function (data) {
		var textData = Uint8ArrToString(data);
		if (textData.startsWith('poop')) {
			parseCarData(textData.split('~=~'));
		}				
		console.log("textData:   " + textData);
	});

	// Receive error output of the child process
	child.stderr.on("data", function (err) {
		var textErr = Uint8ArrToString(err);
		console.log(textErr);
	});

	// Triggered when the process closes
	child.on("close", function (code) {
		
		console.log("Length of descriptions arr:" + descriptions.length);
		console.log("Length of carInfoArrs arr:" + carInfoArrs.length);
		console.log("Length of prices arr:" + prices.length);
		console.log("Length of kslUrls arr:" + kslUrls.length);
		console.log("Length of imgArrs arr:" + imgArrs.length);
		console.log("Process closed with status code: " + code);
	});
});
