// import all the shit
'use strict';
var React = require('react');

var Link = require('react-router').Link

// create the things
var RouteMap = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<h3>Route Map !!!</h3>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = RouteMap;