// SurveyField contains logic to render a single custom label and text input
import React from 'react';

export default ({ input, label }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} />
		</div>
	);
};
