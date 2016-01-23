// import all the shit
'use strict';
var React = require('react');

var Link = require('react-router').Link

// create the things
var IndexPage = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<h3>hello please</h3>
						<p>lmao</p>						
					</div>
				</div>
			</div>
		);
	}
});

module.exports = IndexPage;