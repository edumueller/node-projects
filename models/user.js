const mongoose = require('mongoose');
const { Schema } = mongoose; // This line is the equivalent of: const Schema = mongoose.Schema;

// Schema is used to create a frame for the objects in Mongo.

const userSchema = new Schema({
	googleID: String,
	credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema); // Creates the collection if it doesn't exist.
