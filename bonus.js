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
`308XBLVESI422SMLC381MI2OUJ4RB5	A3FJSCZLT0F0WY
32N49TQG3GIPCPYAF9DFS47LX7WVA7	A2VM2EU6AHX5IC
33LK57MYLT5AL5PEX6O9YAEN7O8ZS6	A3HNEYFOIJWPH1
34FNN24DCM99ADHYPO9IRSVTNAXY5D	A11S8IAAVDXCUS
38F71OA9GTW1ITL9CXYGJ9ZZ3UYMFV	A12R2U6TBB3OOG
3AAJC4I4FGSHM26OACFV69N0B5WJZB	ACA6KEYX1WRUZ
3C44YUNSI1PA5C4QD7VICDQ9WMSPDI	A2MKXI4KCRRI7Y
3COPXFW7XBCIJIA05OH5GQLZGVPPKV	A27SMEOPKV84VI
3F1567XTNW5J2YSO1455QMXTAXZQ9T	A3VAAV7ZCSO7NA
3IUZPWIU1O783R71HAV08KTV9S9KW2	A13BZCNJ0WR1T7
3JZQSN0I3QA1QJPN1U0L64F278LFGF	A3CXK1KSRGU27V
3MX2NQ3YC9UKA8ROKSNG8EOKL43X56	A2QI3Y3LVVU9CG
3MYYFCXHJ37RS3SYHD42F0IBIICG4S	A9Z25VKRSKF8O
3P4RDNWND56VRCHEA8R96EKAFSUIJD	A2RVEG53L48BAE
3P529IW9KYLHCB3OCLX1JWKA3PGFLU	A1SIUJEL2LS8UO
3PQ8K71NHXK5K1VC4EMJWHT8CXVAAL	A26YV40SCUYZST
3R8YZBNQ9HIFOF4VM77LCQ6NF7B7QY	ATUY1BTU5BQDE
3TMFV4NEP8EO8Q508LYXIFK4ETC8W6	A3329CH71VMUBQ
3VJ40NV2QINZ11OMKXIISH35P39OT8	AW0K78T4I2T72
3WS1NTTKEYC4FFE2NSBILCSM0RX0FY	AF8KEA2127EAN
3X0H8UUIT1O6RAK9MJ42Z6K5QM5SWA	A3FR9J09Q672FQ
3Y9N9SS8LYB3YNZ3F9YBZAN8RQ0D3U	A2B5HZBQ6C3J3L`;

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


// INITIALIZE FUNCTION
function init () {
	if (okayToBonus) {
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

// CODE EXECUTION
try {
	init();
}
catch (e) {
	print.error(e);
}