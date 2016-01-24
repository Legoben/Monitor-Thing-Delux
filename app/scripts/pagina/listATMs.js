// import all the shit
'use strict';
var React = require('react');

var Link = require('react-router').Link

// view for rendering ATM card
var ATMCard = require('../ui/ATMCard')

// create the things
var ATMList = React.createClass({
	getInitialState: function() {
		return {
			atms: []
		};
	},

	// fetch the thing
	componentDidMount: function() {
		var oldThis = this;

		// figure out the request data
		var queryParams = this.props.location.query;

		var requestParam = {
			"event": "getatmdata",
			"lat": parseFloat(queryParams.lat),
			"lng": parseFloat(queryParams.lng)
		};

		window.SavedShit = {
			"ap": {},
			"current-location": {},
			"obj": []
		};

		// request ajax
		$.ajax({
			url: "https://pennapps.ngrok.io/command",
			method: "POST",

			// stringify the previously built options
			data: {
				"data": JSON.stringify(requestParam)
			},

			// success handler
			success: function(r) {
				// Figure out whether there are any ATMs.
				var airport = r.ap;

				var json = r.obj;
				console.log(json);
				
				if (json.length == 0) {
					alert("No ATMs FOUND!")
					return;
				}

				// ensure control is mounted
				if (this.isMounted()) {
					this.setState({
						atms: json
					});

					window.SavedShitObj = json;

					// update with swiping pls
					$(".card-atm-overview").on('swipeleft', function(e) {
						var target = $(e.target);
						var objId = target.data('atm-id');

						// animate it out
						target.addClass("animated");
						target.addClass("fadeOutLeft");

						setTimeout(function() {
							// remove from data set
							var idx = -1;

							for (var i = window.SavedShitObj.length - 1; i >= 0; i--) {
								if(objId == window.SavedShitObj[i].id) {
									console.log("found idx = " + i);

									idx = i;
									break;
								}
							}

							console.log("idx = " + idx);
							window.SavedShitObj.splice(idx, 1);

							oldThis.setState({
								atms: window.SavedShitObj
							});

							// remove from DOM
							target.remove();

							// how many ATMs are left? if it's 4, advance to the map view
							console.log("number of triangles: " + window.SavedShitObj.length);
							if(window.SavedShitObj.length <= 4) {
								window.SavedShit = {
									"ap": airport,
									"current-location": {
										"lng": parseFloat(queryParams.lng),
										"lat": parseFloat(queryParams.lat)
									},
									"obj": window.SavedShitObj
								};

								// navigate to map view
								oldThis.props.history.pushState(null, '/atm-map');
							}
						}, 666);
					});
				}
			}.bind(this)
		});
	},

	// callback for a swipe on a cell to remove it
	removeCallWithSwipe: function(e) {

	},

	// render
	render: function() {
		return (
			<div className="container route-atm-list">
				<div className="row">
					<div className="col s12">
						<h3>ATM List !!!</h3>
					</div>
				</div>

				<div className="row">
					<div className="col s12">
						{this.state.atms.map(function(result, idx){
							return (
								<div className="col s12 m12">
									<ATMCard key={idx} atm={result} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ATMList;