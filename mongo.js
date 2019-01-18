var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://strickland-auto:strickland1@ds011873.mlab.com:11873/heroku_lbsm09cg';
var dbName = 'heroku_lbsm09cg';
var carURLCollection = 'car-urls';
/*var tempUserCollection = 'temp-users';
var monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
*/
var self = this;

self.insertNewUrl = function(userObject, callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			var collection = dbo.collection(carURLCollection);
			collection.insertOne(userObject, function(err, result) {
				if (err) throw err;
				callback(result);
				db.close();
			});
		}
	);
};

self.removeAllDocumentsInUrlsCollection = function(callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			var collection = dbo.collection(carURLCollection);
			collection.remove({}, function(err, result) {
				if (err) throw err;
				callback(result);
				db.close();
			});
		}
	);
};

self.getAllUrls = function(callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			var collection = dbo.collection(carURLCollection);
			collection.find({}).toArray(function(err, result) {
    			if (err) throw err;
    			callback(result);
    			db.close();
  			});
		}
	);
};
/*
self.storeReviewApp = function(params, callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			var collection = dbo.collection(mainUserCollection).find({})
		}
	);
};
self.getReviewApp = function(callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			dbo
				.collection(mainUserCollection)
				.find({ reviewAppName })
				.toArray(function(error, docs) {
					callback(docs[0]);
					db.close();
				});
		}
	);
};
self.getEmail = function(queryObject, callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			dbo
				.collection(mainUserCollection)
				.find(queryObject)
				.toArray(function(error, docs) {
					if (error) throw error;
					//random doc
					var doc = docs[Math.floor(Math.random() * docs.length)];
					callback(doc);
					db.close();
				});
		}
	);
};
self.updateDocument = function(queryObject, updateObject, callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			var collection = dbo.collection(mainUserCollection);
			collection.updateOne({ queryObject }, { $set: updateObject }, function(
				err,
				result
			) {
				if (err) throw err;
				callback(result);
				db.close();
			});
		}
	);
};
self.tempUserCount = function(callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			dbo.collection(tempUserCollection).count({}, function(error, numOfDocs) {
				if (error) throw error;
				callback(numOfDocs);
				db.close();
			});
		}
	);
};

self.tempUserCountByMonth = function(callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			dbo
				.collection(tempUserCollection)
				.find({}, { projection: { _id: 1 } })
				.toArray(function(error, result) {
					if (error) throw error;
					var yearObject = {},
						monthObject = {},
						monthCount = 0;
					for (var i = 0; i < result.length; i++) {
						var date = new Date(ObjectId(result[i]._id).getTimestamp());
						var previousDate = new Date(
							ObjectId(result[i == 0 ? 0 : i - 1]._id).getTimestamp()
						);
						date.getMonth() !== previousDate.getMonth()
							? (monthCount = 0)
							: monthCount++;

						var month = date.getMonth();
						monthObject[monthNames[month]] = monthCount;
						yearObject[date.getFullYear()] = monthObject;
					}
					callback(yearObject);
					db.close();
				});
		}
	);
};
*/