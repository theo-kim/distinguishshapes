/*
__          __     _____  _   _ _____ _   _  _____
\ \        / /\   |  __ \| \ | |_   _| \ | |/ ____|
 \ \  /\  / /  \  | |__) |  \| | | | |  \| | |  __ 
  \ \/  \/ / /\ \ |  _  /| . ` | | | | . ` | | |_ |
   \  /\  / ____ \| | \ \| |\  |_| |_| |\  | |__| |
    \/  \/_/    \_\_|  \_\_| \_|_____|_| \_|\_____|

*/
// ONLY RUN THIS FILE WHEN YOU WANT TO BONUS USERS
// PLEASE READ ALL THE INSTRUCTIONS BEFORE BONUSING TO AVOID MIS-BONUSES

// REQUIRES, DO NOT TOUCH THIS
var mturk = require('mturk-api');
var moment = require('moment');
// END REQUIRES

// STEP 1: Specify the reason why you are bonusing users, this is visible to the workers
var reason = 'For winning the polygon study';
// END STEP 1

// STEP 2: (optional) If all of the bonuses are the same for each worker, set 
// this variable equal to that value in USD (as a string).  If each worker has
// a specific bonus, set this variable equal to null.
var payout = "10.00";
// END STEP 2

// STEP 3: Add the individual worker information by pasting a list below.
// COLUMN 1 (required): Assignment ID
// COLUMN 2 (required): Worker ID
// COLUMN 3 (optional): Bonus amount (if each user is receiving a specific amount)
// NOTES ON FORMAT: - surround the list in back ticks (`, ascii char 0x60)
//					- seperate each row with a tab character (\t, ascii char 0x09)
//					- end each char with a newline character (\n, ascii char 0x0A)
//					- capitalization does not matter

var workerList = 
`31QTRG6Q2TDD3NZH93IWPY0AFUHYPN	A2HM35CWB7IIFM
32SVAV9L3F950GWRVZ7999F277G3A0	A3CXK1KSRGU27V
345LHZDEDXSPFPAP14O09ARWEA6U31	AWX99CTT8IKKD
388U7OUMF711I5JBENBC21654ZIR0Z	APGX2WZ59OWDN
3CN4LGXD5XOREUDYBJQ8M0PFOYG4YX	A2DBWV8AG1BKF0
3EJJQNKU9R5CT5P7CVIX8T5MQGKRH1	A2MKXI4KCRRI7Y
3J2UYBXQQLC8WMLRMZ8ER6F98C560H	A2EKR2ZFO10VMV
3K5TEWLKGVB4I7H8RX5S92V4BZCVIR	A20NITCOBY4775
3NGI5ARFTT5GDHOEXEBNBBP0894P1C	AI1C80MVFZXAK
3XUHV3NRVKYNOIR9FO5U5S0QYYYH5G	A39DT3X739APZJ
3YOH7BII097VO27WR0Q4MIAH34ZKVR	A3OY6J4ZJLCGOT`;

// END STEP 3

// STEP 4: enter your mTurk API credentials.  If you just want to test stuff, set sandbox to TRUE, otherwise, set to FALSE
var mturkConfig = {
	access: 'AKIAIM5RDWIKG2R3D2HA',
    secret: '1A0yUAG+EXJ1Jg5pEv6EyHHQ2tfm0DIT0Z2TlOZg',
	sandbox: false
};
// END STEP 4

// STEP 5: When you are ready to bonus, set the following variable to true
var okayToBonus = false;
// END STEP 5

// STEP 6: open terminal / command line and use the command ` node bonus ready`
// END STEP 6

// STEP 7: Reset the by setting okayToBonus to false to avoid misbonuses
// END STEP 7

// CONGRATS! You're done!





////////////////////////////////////////////////////////
///////// DO NOT EDIT THIS PART! IT'S THE CODE//////////
////////////////////////////////////////////////////////

// CMD COLOR FUNCTIONS
var print = {
	error: function(str) {
		console.log('\x1b[41m%s\x1b[0m', str);
	},
	success: function(str) {
		console.log('\x1b[36m%s\x1b[0m', str);
	},
	warning: function(str) {
		console.log('\x1b[43m%s\x1b[0m', str);
	},
	message: function(str) {
		console.log(str);
	}
}

// CMD UTILITY FUNCTIONS
function exit() {
	throw '';
}

// VARIABLE DELCARATIONS
var moneyRE = /^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{1,2}$/;
var workers = [];
var workerParse = [];
var globalPayout = false;
var start, end;
var hits = [];
var totalBonus = 0;


// INITIALIZE FUNCTION
function init () {
	if (okayToBonus && process.argv[2] === "ready") {
		print.success("You are okay to bonus");
		if (process.argv[2] === "ready") {
			print.success("You are ready to bonus");
			print.message("Please review the following settings...")
			if (payout === null) {
				print.message("You have not set a global payout. Individual payouts will be used")
			}
			else if (typeof payout === "string" && payout.match(moneyRE)) {
				print.message("You have set a global payout of " + payout + ". Individual payouts will be ignored");
				globalPayout = true;
			}
			else {
				print.error("Your payout is not in the correct format, please ensure that it is a string, without the $, and includes a decimal (so $10, would be 10.00)");
				exit();
			}
			if (reason != null && typeof reason === "string") {
				print.message("You have set the bonus reason as: " + reason);
			}
			else {
				print.error("You must specify a reason for bonusing the worker.")
			}

			// Wait for confirmation
		 	print.message("Are these settings good? (yes / no)")
			var stdin = process.openStdin();
			stdin.addListener("data", function(d) {
			    if (d.toString().trim() === "yes") {
			    	process.stdin.destroy();
			    	parse();
			    }
			    else {
			    	process.stdin.destroy();
			    	print.error("You didn't enter 'yes'.  So you must have some changes to make.")
			    }
		 	});
		}
		else {
			print.error("You aren't ready.  Please run the command with the ready argument.");
		}
	}
	else if (process.argv[2] === "report") {
		print.success("You have chosen to report bonusing summary");
		print.message("Please enter a start date for your inquiry? (yyyy-mm-dd)")
			var stdin = process.openStdin();
			stdin.addListener("data", function(d) {
			    if (moment(d.toString('utf8'), 'YYYY-MM-DD').isValid()) {
			    	if (start == null) {
			    		print.success("Start date added")
						print.message("Please enter an end date for your inquiry? (yyyy-mm-dd)")
			    		start = moment(d.toString('utf8'), 'YYYY-MM-DD');
			    	}
			    	else if (end == null) {
			    		print.success("End date added")
		    			end = moment(d.toString('utf8'), 'YYYY-MM-DD');
				    	console.log(end);
				    	process.stdin.destroy();
			    		getHits();
			    	}
			    }
			    else {
			    	process.stdin.destroy();
			    	print.error("You didn't enter a valid date (i.e. 2017-01-09).")
			    }
		 	});

	}
	else {
		print.error("You haven't enabled bonusing.  Please set 'okayToBonus' to TRUE");
	}
}

function parse() {
	print.success("Okay, starting the bonus process! (No turning back now...)")
	print.message("Parsing worker list");
	workers = workerList.split('\n');
	print.message("Found " + workers.length + " workers to bonus.");
	for (var i = 0; i < workers.length; ++i) {
		workerParse = workers[i].split('\t');
		workers[i] = { WorkerId: workerParse[1], AssignmentId: workerParse[0], Reason: reason };
		if (!globalPayout) {
			if (workerParse[2] == null || workerParse[2] == "") {
				print.error("Missing individual payout for assignment: " + workerParse[0]);
				exit();
			}
			else if (workerParse[2].match(moneyRE)) {
				workers[i].BonusAmount = { Amount: workerParse[2], CurrencyCode: "USD"};
			}
			else {
				print.error("Invalid payout currency format: " + workerParse[2]);
				exit();
			}
		}
		else {
			workers[i].BonusAmount = { Amount: payout, CurrencyCode: "USD"};
		}
	}
	print.success("Worker parsing was successful!");
	action();
}

function action() {
	var index = 0;
	establishConnection().then((api) => {
		bonus(api, workers, index);
	})
}

function establishConnection() {
	return mturk.createClient(mturkConfig);
}

function bonus(api, w, i) {
	api.req("GrantBonus", w[i]).then((res) => {
		print.success("Successfully bonused worker " + w[i].WorkerId + " amount " + w[i].BonusAmount.Amount);
		++i;
		if (i < w.length) {
			bonus(api, w, i);
		}
		else {
			print.success("Done bonusing " + i + " workers!");
		}
	})
		.catch((err) => {
			print.error(err);
		})
}

function getHits() {
	print.message("Fetching all HITs within that time frame")
	establishConnection().then((api) => {
		api.req('SearchHITs', { PageNumber: 1, PageSize: 100})
			.then((res) => {
				var hitRaw = res.SearchHITsResult[0].HIT;
				for (var i = 0; i < hitRaw.length; ++i) {
					if (start.isBefore(moment(hitRaw[i].CreationTime)) && end.isAfter(moment(hitRaw[i].CreationTime))) {
						hits.push(hitRaw[i].HITId);
					}
				}
				//console.log(hits)
				print.success("Found " + hits.length + " HITs within that timeframe");
				print.message("Processing number of bonuses for each HIT...");
				countBonuses(api, hits, 0)
			})
	});
}

function countBonuses(api, h, i) {
	api.req("GetBonusPayments", { HITId: h[i], PageSize: 100 }).then((res) => {
		totalBonus += parseInt(res.GetBonusPaymentsResult[0].TotalNumResults);
		console.log(parseInt(res.GetBonusPaymentsResult[0].TotalNumResults))
		++i;
		if (i < h.length) {
			countBonuses(api, h, i);
		}
		else {
			print.success("You have made " + totalBonus + " bonuses for these HITs");
		}
	})
}

// CODE EXECUTION
try {
	init();
}
catch (e) {
	print.error(e);
}