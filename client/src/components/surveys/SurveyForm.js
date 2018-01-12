// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
	{
		label: 'Survey Title',
		name: 'title',
		errMessage: 'You must provide a Survey title!'
	},
	{
		label: 'Subject Line',
		name: 'subject',
		errMessage: 'You must provide a subject!'
	},
	{
		label: 'Email Body',
		name: 'body',
		errMessage: 'You must provide an email body!'
	},
	{
		label: 'Recipient List',
		name: 'emails',
		errMessage: 'You must provide email recipients!'
	}
];

class SurveyForm extends Component {
	renderFields() {
		return _.map(FIELDS, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
						<i className="material-icons right">cancel</i>
					</Link>
					<button className="teal btn-flat right white-text" type="submit">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(FIELDS, ({ name, errMessage }) => {
		if (!values[name]) {
			errors[name] = errMessage;
		}
	});

	return errors; // If errors is empty, the form is valid ! Otherwise it's not and the form is not submitted.
}

export default reduxForm({
	validate,
	form: 'surveyForm'
})(SurveyForm);
