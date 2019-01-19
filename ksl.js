//var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var mongo = require('./mongo.js');
mongo.getAllUrls(function(allUrls) {
    var sorted = allUrls.sort(function(a, b) {
        if (a[a.length - 1] > b[b.length - 1])
            return 1;
        else if (a[a.length - 1] < b[b.length - 1])
            return -1;
        else
            return 0;
    });
    console.log(sorted);
});
/*var username = 'key';
var password = '******';

var self = this;

function getSearchData() {
	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function() {
        if (this.status == 200) {
            console.log(this.responseText);
        }
    };
	oReq.open("GET", "https://www.ksl.com/auto/search/index?p=&keyword=memberId%3A2982824&miles=0&page=0");
	oReq.send();
	/*request.get( 'https://www.ksl.com/auto/search/index?p=&keyword=memberId%3A2982824&miles=0&page=0', function(error, response, body) {
		if (error) throw error;
		console.log(body);
	});
}
getSearchData();
/*
self.executeMongoInsert = function() {
	insertNewUserFromMabl(
		{
			variables: {
				user: {
					NewEmail: 'test@test.co'
				}
			}
		},
		function(value) {
			console.log(value);
		}
	);
};

function waitForPlanToFinishThenPostToSlack(url, callback) {
	setTimeout(function() {
		request.get({ url: url }, function(error, response, body) {
			if (error) throw error;
			try {
				var responseBody = JSON.parse(body);
				console.log(
					'Waiting for plan to finish. Start time is:  ' +
						responseBody.executions[0].start_time
				);
				if (responseBody.executions[0].stop_time) {
					console.log(
						'Plan finished. Stop time was: ' +
							responseBody.executions[0].stop_time
					);
					callback(responseBody);
				} else {
					throw 'No stop time found';
				}
			} catch (err) {
				if (err !== 'No stop time found') {
					throw err;
				}
				console.log(err);
				waitForPlanToFinishThenPostToSlack(url, callback);
			}
		});
	}, 5000);
}
function getSlackBody(response, callback) {
	var summaryArray = [];
	response.executions[0].journey_executions.forEach(function(execution) {
		var failureSummary;
		try {
			failureSummary = execution.failure_summary.error;
			console.log(failureSummary);
		} catch (err) {
			console.log('No failure summary found');
			failureSummary = 'None';
		}
		summaryArray.push({
			fallback: 'View the details of the tests at ' + execution.app_href,
			text:
				'*Test Name:* ' +
				response.executions[0].journeys.find(o => o.id === execution.journey_id)
					.name +
				'\n*Test Passed:* ' +
				execution.success +
				'\n*Error Details:* ' +
				'_' +
				failureSummary +
				'_',
			actions: [
				{
					type: 'button',
					text: 'View more details',
					url: execution.app_href
				}
			]
		});
	});

	var stopTime = new Date(response.executions[0].stop_time);
	var startTime = new Date(response.executions[0].stop_time);
	var diffMs = stopTime.getTime() - startTime.getTime();
	var diffTime = Math.round(diffMs / 60000);
	console.log('Plan took ' + diffTime);
	var slackBody = {
		text:
			'All "' +
			response.executions[0].plan.name +
			'"' +
			' integration test results are as follows:' +
			'\nTotal run time for test plan was: ' +
			diffTime +
			' minutes' +
			'\n' +
			response.journey_execution_metrics.passed +
			' out of ' +
			response.journey_execution_metrics.total +
			' tests passed.' +
			'\n\n_Individual test run details:_\n\n\n',
		attachments: summaryArray
	};
	console.log(slackBody.text);
	callback(slackBody);
}

function mablPlanTrigger(body) {
	var requestShiz = {
		uri:
			'https://' +
			username +
			':' +
			password +
			'@api.mabl.com/events/deployment',
		body: body,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	request(requestShiz, function(error, response, body) {
		if (error) throw error;
		var responseBody = JSON.parse(body);
		var url =
			'https://' +
			username +
			':' +
			password +
			'@api.mabl.com/execution/result/event/' +
			responseBody.id;
		waitForPlanToFinishThenPostToSlack(url, function(response) {
			getSlackBody(response, function(slackBody) {
				postToSlack(slackBody);
			});
		});
	});
}
function postToSlack(payload) {
	var requestShiz = {
		uri: 'https://hooks.slack.com/services/slackapptokenhere',
		body: JSON.stringify(payload),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	request(requestShiz, function(error, response) {
		console.log(error, response.body);
		return;
	});
}

self.postToMabl = function(appEnv) {
	if (appEnv.toLowerCase() === 'development') {
		mablPlanTrigger(
			'{"environment_id":"env_id_here","application_id":"app_id_here"}'
		);
	} else if (appEnv.toLowerCase() === 'staging') {
		mablPlanTrigger(
			'{"environment_id":"env_id_here","application_id":"app_id_here"}'
		);
	} else if (appEnv.toLowerCase() === 'production') {
	} else {
		throw 'Heroku web-app environment not configured.';
	}
};
*/
