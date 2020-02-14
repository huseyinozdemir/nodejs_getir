var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var util = require('util');
var mongoose = require('mongoose');
var Records = require('./app/models/records');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

var PORT = process.env.PORT || 3000;

// mongo connect
mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study', {useUnifiedTopology: true, useNewUrlParser: true});

var router = express.Router();

app.use('/api', router);

// MidleWare 
router.use(function(req, res, next){
	console.log('Checking.....');
	next();
});

// Test Route
router.get('/', function(req, res){
	res.json({message: 'Hello Getir'});
});


router.route('/records')
	.post(function(req, res){
		var code = 0;
		var msg = 'Success';
		let rec = null;
		Records.
		aggregate([
			{
				$group: {
					key: {"$first": "$key"},
					createdAt: {"$first": "$createdAt"},
					totalCount: {$sum: { $sum: "$counts"}},
					_id: "$_id"
				}
			},
			{ 
				$project: {
					"_id": 0,
					"key": "$key",
					"createdAt": "$createdAt",
					"totalCount": "$totalCount"
				}
			},
			{
				$match: {
					createdAt: {
						$gte: new Date(req.body.startDate),
						$lt: new Date(req.body.endDate)
					},
					totalCount: {
						$gte: req.body.minCount,
						$lt: req.body.maxCount
					},
				},
			}
		],
		function(err, records) {
			if (err) {
				code = "500";
				msg = err
				json_string = util.format('{"code": "%s", "msg": "%s"}', code, msg)
				res.status(500).send(err);
				return;
			}
			if (records.length === 0) {
				console.log(records);
				code = "404";
				msg = "Records Not Found"
				json_string = util.format('{"code": "%s", "msg": "%s"}', code, msg)
				res.status(404).send(json_string);
				return;
			}
			res.status(200).json({
				code: code,
				msg: msg,
				records: records
			});
		}
		);
	});

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
