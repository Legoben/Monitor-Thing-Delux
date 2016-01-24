// import all the shit
'use strict';
var React = require('react');

var Link = require('react-router').Link;

// some global shits
var map;
var points;
var markers;
var directionsService;
var directionsDisplay;
var images;
var total, wototal;

// create the things
var ATMDetail = React.createClass({
	// initial state
	getInitialState: function() {
		return {
			atms: window.SavedShit.obj
		};
	},

	// init all the shit !!!!
	componentDidMount: function() {
		// lmao
		var loc = window.SavedShit["current-location"];
		console.log(loc);
		
		var latlon = [this.round(loc["lat"]), this.round(loc["lng"])];
		// latlon = [38.9283, -77.1753];
		
		this.initMap(latlon);
		this.getWaypoints(latlon);
	},

	round: function(n) {
		return Math.round(n * 1000) / 1000
	},

	initMap: function(latlon) {
		directionsService = new google.maps.DirectionsService;
		directionsDisplay = new google.maps.DirectionsRenderer;
		
		console.log("HERE", latlon)
		map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: latlon[0],
				lng: latlon[1]
			},
			zoom: 12
		});

		directionsDisplay = new google.maps.DirectionsRenderer({
			map: map
		});
	},

	getWaypoints: function(latlon) {
		// PROVIDED BY AJAX REQUEST EARLIER
		var r = window.SavedShit;

		// yes
		var json = r.obj
		console.log(json);
		
		if (json.length == 0) {
			alert("No ATMs FOUND!")
			return;
		}

		var wps = []
		for (var i = 0; i < json.length; i++) {
			wps.push({
				"stopover": true,
				"location": json[i].geocode})
		}
		
		var request = {
			origin: {"lat": latlon[0], "lng": latlon[1]},
			destination: r['ap'],
			travelMode: google.maps.TravelMode.DRIVING,
			waypoints: wps,
			optimizeWaypoints: true,
		};
		
		directionsService.route(request, function(response, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
				var legs = response.routes[0].legs;
				
				var dist = 0;
				console.log(response);
				for(var i=0; i<legs.length; ++i) {
					dist += legs[i].distance.value;
				}
				
				total = dist / 1000;
				wototal = (dist - legs[legs.length -1].distance.value) / 1000;
				
				console.log(total, wototal);
				
				console.log("Yo fam, we good")    
			} else { console.log("uh oh") }
		});
	},

	// render
	render: function() {
		return (
			<div className="route-map">
				<div id="map"></div>
			</div>
		);
	}
});

module.exports = ATMDetail;