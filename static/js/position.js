


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
	console.log("the info is " + thenum)

}

function numToDecimal(num) {
	var numlenght = num.toString().length;
	var numLog = Math.log(num) / Math.LN10;
	var decLog = (numLog - numlenght);
	return Math.pow(10, decLog);
}

function mapFunction() {
 draw_Polyline()
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to change route!",
        position: { lat: 53, lng: -10 },
    });

    map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map);
    });
   }

 function placeMarkerAndPanTo(latLng, map) {
  new google.maps.Marker({
    position: latLng,
    map: map,
  });
  map.panTo(latLng);
}

   function draw_Polyline(){
   //need ship lat, ship long, next WP lat, next WP Long!
   ship_lat = parseFloat(document.getElementById("lat_deg").value);
   ship_long = parseFloat(document.getElementById("long_deg").value);
   const nextLegCoordinates = [
    { lat: ship_lat, lng: -ship_long },
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

   /*
   TODO Any advantage in map being generated in python?
   */
   /*
   TODO on clicking map this will be new WP and calculate Ship to WP and WP to Kilcreadaun
   */