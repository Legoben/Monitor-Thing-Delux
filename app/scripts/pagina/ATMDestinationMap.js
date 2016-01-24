// import all the shit
'use strict';
var React = require('react');

var Link = require('react-router').Link

// create the things
var ATMDetail = React.createClass({
	// initial state
	getInitialState: function() {
		return {
			atms: window.ATMs
		};
	},

	// render
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
							<h3>lmao map ({this.props.atms})</h3>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ATMDetail;