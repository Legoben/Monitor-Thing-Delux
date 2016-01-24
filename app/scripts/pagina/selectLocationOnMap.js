// import all the shit
'use strict';
var React = require('react');

var Link = require('react-router').Link

// global shit
var latlon1 = {
	lat: 38.9283,
	lng: -77.1753
};

// create the things
var SelectLocationOnMap = React.createClass({
	// map to display
	map: null,
	// selected marker
	marker: null,

	// accepts the user's placed point.
	acceptUserPoint: function() {
		// get lat/ln and forward
		var lat = this.marker.getPosition().lat();
		var lng = this.marker.getPosition().lng();


		this.props.history.replaceState(null, '/atm-list', {
			"lat": lat, 
			"lng": lng
		});
	},

	// opens a demo window
	openDemo: function() {
		this.map.setCenter(latlon1);

		if(this.marker != null) {
			this.marker.setMap(null);
		}

		this.marker = new google.maps.Marker({
			position: latlon1,
			map: this.map,
			title: 'My location'
		});
	},

	// init all the shit (i.e. a map) !!!!
	componentDidMount: function() {
		this.map = new google.maps.Map(document.getElementById('map'), {
			center: {
				"lat": 30.2500,
				"lng": -97.7500
			},

			zoom: 8
		});

		// add a click event listener
		google.maps.event.addListener(this.map, "click", function(event) {
			var lat = event.latLng.lat();
			var lng = event.latLng.lng();

			var latlon = {
				"lat": lat,
				"lng": lng
			};

			// tear down previous marker
			if(this.marker != null) {
				this.marker.setMap(null);
			}

			// Show new marker
			this.marker = new google.maps.Marker({
				position: latlon,
				map: this.map,
				title: 'My location'
			});

			// populate yor box/field with lat, lng
			console.log("Lat=" + lat + "; Lng=" + lng);
		});
	},

	render: function() {
		return (
			<div className="route-select-location">
				<div id="map"></div>

				<div className="button-container">
					<a className="btn-floating btn-large waves-effect" tooltip="Go To Demo" onClick={this.openDemo}><i className="material-icons live_help">add</i></a>
					<a className="btn-floating btn-large waves-effect waves-light green" tooltip="Accept" onClick={this.acceptUserPoint}><i className="material-icons thumbs_up">accept</i></a>

					<Link to="/" className="btn-floating btn-large waves-effect waves-light red" tooltip="Cancel"><i className="material-icons not_interested">cancel</i></Link>
				</div>
			</div>
		);
	}
});

module.exports = SelectLocationOnMap;