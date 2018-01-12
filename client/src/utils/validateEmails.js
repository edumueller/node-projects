// Returns an array of invalid e-mails
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default emails => {
	// Split the string of e-mails and trim spaces in between
	const invalidEmails = emails
		.split(',')
		.map(email => email.trim())
		.filter(email => (re.test(email) || !email.length) === false); // if the function inside filter returns true, the value will be kept, otherwise it will be thrown away (filtered).
	if (invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`;
	}

	return;
};
