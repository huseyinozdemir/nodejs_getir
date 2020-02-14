var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordsSchema = new Schema({
	key: String,
	createdAt: { type: Date, default: Date.now },
	totalCount: Number
});

module.exports = mongoose.model('records', RecordsSchema)
