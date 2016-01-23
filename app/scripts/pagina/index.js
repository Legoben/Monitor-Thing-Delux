// import all the shit
'use strict';
var React = require('react');

var Link = require('react-router').Link

// create the things
var IndexPage = React.createClass({
	render: function() {
		return (
			<div className="route-index">
				<div className="banner-container">
					<video autoPlay muted loop className="banner-video" poster="images/banner_video_poster.jpg">
						<source src="banner_video.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>

					<div className="row center banner-content">
						<h1 className="header center">Let's go "sightseeing"</h1>

						<div className="banner-buttons">
							<a href="http://materializecss.com/getting-started.html" className="btn-large waves-effect waves-light orange">Use Current Location</a>
							<Link to="/select-location/map" className="btn-large waves-effect">Select Location</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = IndexPage;