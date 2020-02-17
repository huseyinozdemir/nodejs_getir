const util = require('util');
const Records = require('../models/records');
const asyncHandler = require('../middleware/async');

exports.postListRecords = asyncHandler(async (req, res, next) => {
	var code = 0;
	var msg = 'Success';
	await Records.
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
				console.log(err);
				code = "500";
				msg = err
				json_string = util.format('{"code": "%s", "msg": "%s"}', code, msg)
				console.log(json_string);
				res.status(500).send(err);
				return;
			}
			if (records.length === 0) {
				code = "404";
				msg = "Records Not Found"
				json_string = util.format('{"code": "%s", "msg": "%s"}', code, msg)
				console.log(json_string);
				res.status(404).send(json_string);
				return;
			}
			res._json = {
                code: code,
                msg: msg,
                records: records
            },
			res.status(200).json(res._json);
		});
});
