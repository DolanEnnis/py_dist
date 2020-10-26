var input = {
	lat: 52,
	longtitude: 9.5,
	speed: 10.0,
	delay: 0,
};
/*
$("#timeButton").click(function () {
	computerTime = new Date();
	old = location.href.split("position")
	location.assign(old[0] + "position/" + computerTime.toString())
	console.log(computerTime)
}); */

function getPosition() {
console.log("getting position")
	var thenum = [0, 0, 0];

	var posAsString = document.getElementById("mt_string").value;
	var theBignum = posAsString.match(/\d+/g);
	if (theBignum.length == 4) { thenum = theBignum; }
	else if (theBignum.length > 10) {
		input.delay = theBignum[0];
		thenum = [theBignum[6], theBignum[7], theBignum[8], theBignum[9]];
		//var temp =theBignum.reverse();
		input.speed = theBignum[-2] / 1 + (theBignum[-1] / 10);
	}
	else {
		thenum = [theBignum[0], theBignum[1], theBignum[2], theBignum[3]];
		//var temp =theBignum.reverse();
		input.speed = theBignum[-2] / 1 + (theBignum[-1] / 10);
	}
	document.getElementById("lat_deg").defaultValue = thenum[0];
	document.getElementById("lat_min").defaultValue = (60 * numToDecimal(thenum[1])).toFixed(1);
	document.getElementById("long_deg").defaultValue = thenum[2];
	document.getElementById("long_min").defaultValue = (60 * numToDecimal(thenum[3])).toFixed(1);
	console.log("the info is " + thenum[1])
}

function numToDecimal(num) {
	var numlenght = num.toString().length;
	var numLog = Math.log(num) / Math.LN10;
	var decLog = (numLog - numlenght);
	return Math.pow(10, decLog);
}