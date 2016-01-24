// import all the shit
'use strict';
var React = require('react');

var Router = require('react-router').Router
var Link = require('react-router').Link

// create the things
var SelectLocation = React.createClass({
	// when the view is rendered, attempt to get the location.
	componentDidMount: function() {
		var history = this.props.history;

		// options for location finding
		var locationOptions = {
			enableHighAccuracy: true,
			timeout: 15000,
			maximumAge: 0
		};

		// success handler
		function locationSuccess(position) {
			console.log("Got location:");
			console.log(position);

			history.replaceState(null, '/atm-list', {
				lat: position.coords.latitude, 
				lng: position.coords.longitude
			});
		};

		// error handler
		function locationError(error) {
			console.log("Error acquiring location");
			console.log(error);
		};

		// get fix
		navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
	},

	render: function() {
		return (
			<div className="container route-current-location">
				<div className="row">
					<div className="col m6 offset-m3 s10 offset-s1">
						<h4>Please wait… your location is being determined.</h4>
						<p>If your device asks for permission to access your location, tap "Allow."</p>

						<div className="spinny-fucker">
							<div className="preloader-wrapper big active">
								<div className="spinner-layer spinner-blue">
									<div className="circle-clipper left">
										<div className="circle"></div>
									</div>
									<div className="gap-patch">
										<div className="circle"></div>
									</div>
									<div className="circle-clipper right">
										<div className="circle"></div>
									</div>
								</div>

								<div className="spinner-layer spinner-red">
									<div className="circle-clipper left">
										<div className="circle"></div>
									</div>
									<div className="gap-patch">
										<div className="circle"></div>
									</div>
									<div className="circle-clipper right">
										<div className="circle"></div>
									</div>
								</div>

								<div className="spinner-layer spinner-yellow">
									<div className="circle-clipper left">
										<div className="circle"></div>
									</div>
									<div className="gap-patch">
										<div className="circle"></div>
									</div>
									<div className="circle-clipper right">
										<div className="circle"></div>
									</div>
								</div>

								<div className="spinner-layer spinner-green">
									<div className="circle-clipper left">
										<div className="circle"></div>
									</div>
									<div className="gap-patch">
										<div className="circle"></div>
									</div>
									<div className="circle-clipper right">
										<div className="circle"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = SelectLocation;