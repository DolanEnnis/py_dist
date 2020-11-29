moment.locale('en', {
    calendar : {
        lastDay : '[Yesterday??? at] H:mm',
        sameDay : '[Today at] HH:mm',
        nextDay : '[Tomorrow at] HH:mm',
        lastWeek : '[last???] dddd [at] HH:mm',
        nextWeek : 'dddd [at] HH',
        sameElse : 'L'
    }
});


var shipData = {
	lat: 52,
	longitude: 9.5,
	speed: 10.0,
	delay: 0,
};

var line = [];

var output = {
	dToWP: 0,
	dToKil: 0,
	tToKil: 0,
	tToScat: 0,
	ETAScattery: "",
	mrwp: "",
	lastSeen: new Date(),
	ETAKil: "",
};

var waypoints = [
	new waypoint("Kilcreadaun", 52.55333, -9.71667, 0),
	new waypoint("Loop Head", 52.53333, -10, 10.43),
	new waypoint("Slyne Head", 53.40000, -10.46667, 65.11),
	new waypoint("Black Rock", 54.08333, -10.48333, 106.12),
	new waypoint("Eagle Island", 54.31333, -10.33333, 120.89),
	new waypoint("Tory Island", 55.32167, -8.28333, 214.19),
	new waypoint("Inishtrahull", 55.50833, -7.23333, 251.74),
	new waypoint("Middle Bank", 55.42500, -6.24333, 285.86),
	new waypoint("Rathlin TSS", 55.40167, -6.05, 292.60),
	new waypoint("East Maiden", 55.06667, -5.46667, 320.96),
	new waypoint("Black Head", 54.75833, -5.63333, 340.33),
	new waypoint("Inishtoosk", 52.15935, -10.61583, 40.63),
	new waypoint("Inishtearaght", 52.08675, -10.72698, 46.61),
	new waypoint("Little Foze", 52.01442, -10.75322, 51.05),
	new waypoint("Skellig", 51.75122, -10.60485, 67.7783),
	new waypoint("Bull", 51.56700, -10.3489, 82.3865),
	new waypoint("Fastnet", 51.25328, -9.57865, 116.877),
	new waypoint("BANN SHOAL BUOY", 50.34187, -5.88902, 267.458),
	new waypoint("Wolf Rock", 49.99257, -5.8866, 288.42),
	new waypoint("Lizard", 49.90167, -5.20282, 315.45),
	new waypoint("CS1", 50.53037, -0.05217, 517.30),
	new waypoint("Scilly", 49.72, -6.6412, 261.88),
	guard(52.532953, -9.99620, "Kilcreadaun"),
	guard(53.39683, -10.46664, "Loop Head"),
	guard(54.08, -10.48333, "Slyne Head"),
	guard(54.31333, -10.33633, "Black Rock"),
	guard(55.31951, -8.28533, "Eagle Island"),
	guard(55.50833, -7.23433, "Tory Island"),
	guard(55.42549, -6.243823, "Inishtrahull"),
	guard(55.40236, -6.05070, "Middle Bank"),
	guard(55.06903, -5.46967, "Rathlin TSS"),
	guard(54.76152, -5.63633, "East Maiden"),
	guard(52.16129, -10.61883, "Kilcreadaun"),
	guard(52.08918, -10.72998, "Inishtoosk"),
	guard(52.01767, -10.75324, "Inishtearaght"),
	guard(51.75121, -10.60785, "Little Foze"),
	guard(51.75122, -10.75322, "Little Foze"),
	guard(51.5670, -10.35190, "Skellig"),
	guard(51.25328, -9.58165, "Bull"),
	guard(50.34487, -5.89052, "Fastnet"),
	guard(49.9959, -5.88660, "BANN SHOAL BUOY"),
	guard(49.89867, -5.20582, "Wolf Rock"),
	guard(50.52974, -0.05317, "Lizard"),
	guard(49.72, -6.6418, "Bull"),
	guard(49.99, -5.89, "Scilly"),];

function waypoint(name, lat, longtit, distToKil, useWaypoint) {
	this.name = name;
	this.lat = lat;
	this.longtit = longtit;
	this.distToKil = distToKil;
	this.useWaypoint = useWaypoint || name;
}

function guard(lat, longtit, useWaypoint) {
	return new waypoint("guard " + useWaypoint, lat, longtit, 1000000, useWaypoint);
}


function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 52.5, lng: -9.71 },
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});
	mapWaypoints(waypoints);
    }

function getPosition() {
    document.getElementById("myForm").reset();
	var thenum = [0, 0, 0];
	var posAsString = document.getElementById("mt_string").value;
	var theBignum = posAsString.match(/\d+/g);
	if (theBignum.length == 4) { thenum = theBignum; }
	else if (theBignum.length > 10) {
        alert("Too many numbers here for me! Cut everything before Latitude / Longitude: !");
         return;
		/*shipData.delay = theBignum[0];
		thenum = [theBignum[6], theBignum[7], theBignum[8], theBignum[9]];
		//var temp =theBignum.reverse();
		shipData.speed = theBignum[-2] / 1 + (theBignum[-1] / 10);*/
	}
	else {
		thenum = [theBignum[0], theBignum[1], theBignum[2], theBignum[3]];
		shipData.speed = theBignum[4] / 1 + (theBignum[5] / 10);

	}
	document.getElementById("lat_deg").defaultValue = thenum[0];
	document.getElementById("lat_min").defaultValue = (60 * numToDecimal(thenum[1])).toFixed(1);
	document.getElementById("long_deg").defaultValue = thenum[2];
	document.getElementById("long_min").defaultValue = (60 * numToDecimal(thenum[3])).toFixed(1);
	document.getElementById("speed").defaultValue = shipData.speed;
}


function main() {
    document.getElementById("mtinfo").reset();
    const delay_hr = document.getElementById("Delay_hrs").value
    const delay_min = document.getElementById("Delay_min").value
    output.lastSeen = moment().subtract(delay_hr, 'h').subtract(delay_min, 'm')
    shipData.lat = document.getElementById("lat_deg").value/1 + ((document.getElementById("lat_min").value) / 60);
    shipData.longitude = document.getElementById("long_deg").value/1 + ((document.getElementById("long_min").value) / 60);
    shipData.speed = document.getElementById("speed").value/1
     // Show ship on map
    var shipPos = new google.maps.LatLng(shipData.lat, -shipData.longitude);
	var markerOptions = {
		position: shipPos
	};
	var marker = new google.maps.Marker(markerOptions);
	marker.setMap(map);
	// change zoom level of map
	var KilcreadaunPos = new google.maps.LatLng(waypoints[0].lat, waypoints[0].longtit);
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(KilcreadaunPos);
	bounds.extend(shipPos);
	map.fitBounds(bounds);
    output.mrwp = nextWP(shipPos, waypoints);
    mainOutput()
}

function mainOutput(){
    console.log(output.mrwp);
    var shipPos = new google.maps.LatLng(shipData.lat, -shipData.longitude);
	//get next WP
	var appropriateWP = pickWP(output.mrwp);
	// Line from ship to WP
	//clear old lines
	for (i = 0; i < line.length; i++) {
		line[i].setMap(null); //or line[i].setVisible(false);
	}
	//draw line from ship to first WP
	var legCoordinates = [
		{ lat: appropriateWP.lat, lng: appropriateWP.longtit },
		shipPos];
	var firstLeg = new google.maps.Polyline({
		path: legCoordinates,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	line.push(firstLeg);
	firstLeg.setMap(map);
    //Workout Dist and time to Kil
    output.dToWP = distanceInNM(shipPos, appropriateWP);
	output.dToKil = output.dToWP + appropriateWP.distToKil;
	output.tToKil = output.dToKil / shipData.speed;
	output.tToScat = (output.dToKil + 8.8 )/ shipData.speed;
    output.ETAKil = output.lastSeen.clone().add(output.tToKil, "h")
    output.ETAScattery = output.lastSeen.clone().add(output.tToScat, "h")
	updatepage()
}

function updatepage(){
    document.getElementById("timeSeen").innerHTML = output.lastSeen.calendar();
    document.getElementById("WP").innerHTML = output.mrwp.useWaypoint;
    document.getElementById("WPdist").innerHTML = output.dToWP.toFixed(1).toString() + " miles";
	document.getElementById("KillDist").innerHTML = output.dToKil.toFixed(1).toString() + " miles";
	document.getElementById("KillTime").innerHTML = output.tToKil.toFixed(2);
	document.getElementById("ETAKil").innerHTML = output.ETAKil.calendar();
	document.getElementById("ScatDist").innerHTML = (output.dToKil +8.8).toFixed(1).toString() + " miles";
	document.getElementById("ETAScattery").innerHTML = output.ETAScattery.calendar();

}

function pickWP(wp) {
	for (i = 0; i < waypoints.length; i++) {
		if (wp.useWaypoint == waypoints[i].name) {
			return waypoints[i];
		}
	}
	alert("Error");
}



function numToDecimal(num) {
	var num_length = num.toString().length;
	var numLog = Math.log(num) / Math.LN10;
	var decLog = (numLog - num_length);
	return Math.pow(10, decLog);
}

function nextWP(loc, waypoints) {
	var nearestDist = 10000000;
	var nearWP = new waypoint("Nothing Near", 0, 0, 10000000, []);
	for (i = 0; i < waypoints.length; i++) {
		var point = waypoints[i];
		var dist = distanceInNM(loc, waypoints[i]);
		/**var dist = loc.GetDistanceTo(point.lat ,point.longtit );*/
		if (dist < nearestDist) {
			nearestDist = dist;
			nearWP = point;
		}
	}
	return nearWP;
}

function distanceInNM(loc, waypoint) {
	var to = new google.maps.LatLng(waypoint.lat, waypoint.longtit);
	var dist = (google.maps.geometry.spherical.computeDistanceBetween(loc, to)) / 1852;
	return dist;
}
/*
function mapFunction() {
    shipData.lat = parseFloat(document.getElementById("lat_deg").value);
    shipData.longitude = parseFloat(document.getElementById("long_deg").value);
 draw_Polyline()
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to change route!",
        position: { lat: 53, lng: -10 },
    });

    map.addListener("click", (e) => {
    console.log(e)
        user_waypoint(e.latLng, map);
    });
   }

function user_waypoint(latLng, map) {
  new google.maps.Marker({
    position: latLng,
    map: map,
  });
  dist_to_clicked(latLng,map);
}

function draw_Polyline(){
   //need ship lat, ship long, next WP lat, next WP Long!

   const nextLegCoordinates = [
    { lat: shipData.lat, lng: -shipData.longitude },
    {lat: next_wp_lat, lng: next_wp_long },
    ];
    const nextLeg = new google.maps.Polyline({
        path: nextLegCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    nextLeg.setMap(map);
   }
*/
  function mapWaypoints(waypoints) {
	for (i = 0; i < waypoints.length; i++) {
		var markerOptions = {
			position: new google.maps.LatLng(waypoints[i].lat, waypoints[i].longtit),
			icon: { path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW, scale: 1 },
			title: "Use waypoint " + waypoints[i].useWaypoint
		};
		if (waypoints[i].distToKil < 1000000) {
			markerOptions.title = waypoints[i].name + "  " + waypoints[i].distToKil;
			markerOptions.icon = { path: google.maps.SymbolPath.CIRCLE, scale: 3 };
		}
		var marker = new google.maps.Marker(markerOptions);
		marker.setMap(map);
		// Set up listener so that clicking marker changes MRWP
		marker.addListener('click', function () {
			var markerPos = this.getPosition();
			output.mrwp = nextWP(markerPos, waypoints);
			mainOutput();
		});
	}
}

/*
function dist_to_clicked(latLng, map){
    var lat = shipData.lat
    var long = shipData.longitude
    const extraDistance= computeDistanceBetween(latLng,{lat,long})
    console.log(extraDistance)
   }*/

   /*

   TODO get site working without reloading page using waypoints hardcoded and javascript
        todo put event listener on speed box allow auto changes

   */
   /*
   TODO on clicking map this will be new WP and calculate Ship to WP and WP to Kilcreadaun
        Todo Distance clicked Position to Ship
        Todo Line ship to clicked position and clicked position to nearest WP
        Todo Clicked position to Kilcreadaun
        Todo Adjust output screen
   */

