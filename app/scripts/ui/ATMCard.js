// import all the shit
'use strict';
var React = require('react');

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

// view for rendering ATM card
var ATMCard = React.createClass({
	// calculate the average thing
	componentWillReceiveProps: function(newProperties) {
		// calculate the average of the star ratings
		var reviews = newProperties.reviews;
		var numReviews = 0, runningAvg = 0;

		for(review in reviews) {
			runningAvg += review.rating;
			numReviews++;
		}

		this.setState({
			avgRating: (runningAvg / numReviews),
			hasReviews: (reviews.length != 0)
		});
	},

	render: function() {
		return (
			<div className="row" id="index-banner">
				<div className="col s12">
					<div className="card hoverable card-item">
						<div className="card-image waves-effect waves-block waves-light">
							<img className="activator" src="images/defaultATM.jpg" draggable="false" />
						</div>
						<div className="card-content">
							<span className="card-title activator grey-text text-darken-4">
								<span className="atm-name">{this.props.atm.name}</span>
								<i className="material-icons right">more_vert</i>
							</span>
							<div className="atm-amount">
								<span>${this.props.atm.amount_left}</span>
							</div>
							<If test={this.props.hasReviews}>
								<span className="card-title">
									<div className="rating">
										<img src="images/star.svg" alt="Star 1" />
										<img src="images/star.svg" alt="Star 2" />
										<img src="images/star.svg" alt="Star 3" />
										<img src="images/star-half.svg" alt="Star 4" />
										<img src="images/star-outline.svg" alt="Star 5" />
									</div>
								</span>
							</If>
							<p>
								<a href="#">Write a review (IMPLEMENT THIS)</a>
							</p>
						</div>

						<!-- this shit is in the card actually -->
						<div className="card-reveal">
							<span className="card-title grey-text text-darken-4">
								<span className="review-title">Reviews</span>
								<i className="material-icons right">close</i>
							</span>

							<table className="user-reviews" border="0">
								<tbody>
									<tr className="review">
										<td className="user-review-name">Anonymous</td>
										<td className="user-review-rating">
											<img src="images/star-half.svg" alt="Star 1" />
											<img src="images/star-outline.svg" alt="Star 2" />
											<img src="images/star-outline.svg" alt="Star 3" />
											<img src="images/star-outline.svg" alt="Star 4" />
											<img src="images/star-outline.svg" alt="Star 5" />
										</td>
									</tr>
									<tr>
										<td></td>
										<td className="user-review-content">"I got arrested."</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
})

module.exports = ATMCard;
