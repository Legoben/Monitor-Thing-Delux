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
		// figure out the request data
		var queryParams = this.props.location.query;

		var requestParam = {
			"event": "getatmdata",
			"lat": parseFloat(queryParams.lat),
			"lng": parseFloat(queryParams.lng)
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
				var json = r.obj
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
				}
			}.bind(this)
		});
	},

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
							return <ATMCard key={idx} atm={result} />;
						})}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ATMList;