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
			atms: [{
				
			}]
		};
	},

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<h3>ATM List !!!</h3>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ATMList;