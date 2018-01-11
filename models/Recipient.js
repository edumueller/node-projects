const mongoose = require('mongoose');
const { Schema } = mongoose; // This line is the equivalent of: const Schema = mongoose.Schema;

// Schema is used to create a frame for the objects in Mongo.

const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

module.exports = recipientSchema; // Creates the collection if it doesn't exist.
