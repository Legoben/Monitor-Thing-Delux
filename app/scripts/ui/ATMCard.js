// import all the shit
'use strict';
var React = require('react');

var StarRating = require('react-rater');

// lmao
var If = React.createClass({
	render: function() {
		if (this.props.test) {
			return this.props.children;
		}
		else {
			return false;
		}
	}
});

// view for rendering an ATM review
var ATMReview = React.createClass({
	render: function() {
		return (
			<div>
				<tr className="review">
					<td className="user-review-name">Anonymous</td>
					<td className="user-review-rating">
						<StarRating rating={ this.props.review.rating } total={5} />
					</td>
				</tr>
				<tr>
					<td></td>
					<td className="user-review-content">{this.props.review.comment}</td>
				</tr>
			</div>
		);
	}
});

// view for rendering ATM card
var ATMCard = React.createClass({
	getInitialState: function() {
		return {
			imageUrl: "images/defaultATM.jpg",
			avgRating: 0,
			hasReviews: false
		};
	},
	componentDidMount: function() {
		// calculate the average of the star ratings
		var reviews = this.props.atm.reviews;
		var numReviews = 0, runningAvg = 0;

		for (var i = reviews.length - 1; i >= 0; i--) {
			var review = reviews[i];

			runningAvg += review.rating;
			numReviews++;
		}

		// get street view url
		var latlng = this.props.atm.latlon;
		var url = "https://maps.googleapis.com/maps/api/streetview?size=1500x320&location="+latlng[0]+","+latlng[1]+"&fov=90&key=AIzaSyD61mHJfiQ6Nu9YJsOvfNRwJ1J98Xjl0Ts"

		this.setState({
			imageUrl: url,
			avgRating: (runningAvg / numReviews),
			hasReviews: (reviews.length != 0)
		});
	},

	render: function() {
		return (
			<div className="card hoverable card-item card-atm-overview" data-atm-id={this.props.atm.id}>
				<div className="card-image waves-effect waves-block waves-light">
					<img className="activator" src={ this.state.imageUrl } draggable="false" />
				</div>
				<div className="card-content">
					<span className="card-title activator grey-text text-darken-4">
						<span className="atm-name">{this.props.atm.name}</span>

						<If test={this.state.hasReviews}>
							<i className="material-icons right">more_vert</i>
						</If>
					</span>
					<div className="atm-amount">
						<span>${this.props.atm.amount_left}</span>
					</div>
					<If test={this.state.hasReviews}>
						<span className="card-title">
							<div className="rating">
								<StarRating rating={ this.state.avgRating } total={5} />
							</div>
						</span>
					</If>
				</div>

				<div className="card-reveal">
					<span className="card-title grey-text text-darken-4">
						<span className="review-title">Reviews</span>
						<i className="material-icons right">close</i>
					</span>

					<table className="user-reviews" border="0">
						<tbody>
							{this.props.atm.reviews.map(function(result, idx){
								return (
									<tr className="review">
										<td className="user-review-name">Anonymous</td>
										<td className="user-review-rating">
											<StarRating rating={ result.rating } total={5} />
											<p>{result.comment}</p>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
})

module.exports = ATMCard;
