var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://strickland-auto:strickland1@ds011873.mlab.com:11873/heroku_lbsm09cg';
var dbName = 'heroku_lbsm09cg';
var carUrlCollection = 'car-urls';
var carsInfoCollection = 'cars-info';
var self = this;

self.insertNewObject = function(collectionName, userObject, callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			var collection = dbo.collection(collectionName);
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
			var collection = dbo.collection(carUrlCollection);
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
			var collection = dbo.collection(carUrlCollection);
			collection.find({}).toArray(function(err, result) {
    			if (err) throw err;
    			callback(result.map(function(val) { return val.url }));
    			db.close();
  			});
		}
	);
};

self.getAllCarsInfos = function(callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			var collection = dbo.collection(carsInfoCollection);
			collection.find({}).toArray(function(err, result) {
				if (err) throw err;
				Array.prototype.unique = function() {
					var a = this.concat();
					for(var i=0; i<a.length; ++i) {
						for(var j=i+1; j<a.length; ++j) {
							if(a[i] === a[j])
								a.splice(j--, 1);
						}
					}
				
					return a;
				};
				var filtered = result.filter(function(item){
					return item.make.includes("tacoma");         
				});
				finalArray = result.concat(filtered).unique();
    			callback(finalArray);
    			db.close();
  			});
		}
	);
};

//Returns an array of objects, although there should only be one
self.getInfoFromCar = function(searchQuery, field, callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			var collection = dbo.collection(carsInfoCollection);
			collection.find(searchQuery).toArray(function(err, result) {
    			if (err) throw err;
    			callback(result.map(function(val) { return val.field }));
    			db.close();
  			});
		}
	);
};

self.getAllCarInfo = function(searchQuery, callback) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true },
		function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			var collection = dbo.collection(carsInfoCollection);
			collection.find(searchQuery).toArray(function(err, result) {
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