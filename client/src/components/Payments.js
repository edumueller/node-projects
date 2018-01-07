import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as Actions from '../actions';

class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 Email credits"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		); // Amount is in cents, Stripe defaults the currency to USD. Token is expecting to receive a callback function from Stripe.
	}
}

export default connect(null, Actions)(Payments);
