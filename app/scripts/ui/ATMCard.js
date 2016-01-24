// import all the shit
'use strict';
var React = require('react');

// view for rendering ATM card
var ATMCard = React.createClass({
	render: function() {
		return (
			<div className="container">
				{this.props.atm.name}
			</div>
		);
	}
})

module.exports = ATMCard;
