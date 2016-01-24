// import all the shit
'use strict';
var React = require('react');

var Link = require('react-router').Link

// global shit
var latlon1 = {
	lat: 38.9283,
	lng: -77.1753
};

var map = null;
var marker = null;

// create the things
var SelectLocationOnMap = React.createClass({

	// accepts the user's placed point.
	acceptUserPoint: function() {
		// get lat/ln and forward
		var lat = marker.getPosition().lat();
		var lng = marker.getPosition().lng();


		this.props.history.replaceState(null, '/atm-list', {
			"lat": lat, 
			"lng": lng
		});
	},

	// opens a demo window
	openDemo: function() {
		map.setCenter(latlon1);
		if(marker != null) {
			marker.setMap(null);
		}

		marker = new google.maps.Marker({
			position: latlon1,
			map: map,
			title: 'My location'
		});

		// disable btwn
		$("#btn-accept").removeClass("disabled");
	},

	// init all the shit (i.e. a map) !!!!
	componentDidMount: function() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {
				"lat": 30.2500,
				"lng": -97.7500
			},

			zoom: 8
		});

		// add a click event listener
		google.maps.event.addListener(map, "click", function(event) {
			var lat = event.latLng.lat();
			var lng = event.latLng.lng();

			var latlon = {
				"lat": lat,
				"lng": lng
			};

			// tear down previous marker
			if(marker != null) {
				marker.setMap(null);
			}

			marker = new google.maps.Marker({
				position: latlon,
				map: map,
				title: 'My location'
			});

			// disable btwn
			$("#btn-accept").removeClass("disabled");
		});
	},

	render: function() {
		return (
			<div className="route-select-location">
				<div id="map"></div>

				<div className="button-container">
					<a className="btn-floating btn-large waves-effect" title="Go To Demo" onClick={this.openDemo}><i className="material-icons">live_help</i></a>
					<a className="btn-floating btn-large waves-effect waves-light green disabled" id="btn-accept" title="Accept Location" onClick={this.acceptUserPoint}><i className="material-icons">thumb_up</i></a>

					<Link to="/" className="btn-floating btn-large waves-effect waves-light red" title="Cancel"><i className="material-icons">not_interested</i></Link>
				</div>
			</div>
		);
	}
});

module.exports = SelectLocationOnMap;