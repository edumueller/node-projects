const mongoose = require('mongoose');
const { Schema } = mongoose; // This line is the equivalent of: const Schema = mongoose.Schema;
const RecipientSchema = require('./Recipient');

// Schema is used to create a frame for the objects in Mongo.

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema); // Creates the collection if it doesn't exist.
