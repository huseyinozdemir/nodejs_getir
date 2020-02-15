# This Project is a Node Js enter project.

## INSTALL NodeJS on Mac
* brew install nodejs or brew upgrade nodejs
* npm init

## INSTALL Framework and Components
npm install --save express body-parser mongoose

## Don't restart
npm install -g nodemon

## RUN server.js
nodemon server.js OR node server.js

### An Advice
You can use Robomongo. It is a visual tool helping you manage Database MongoDB and free.

## Request Example
* http://localhost:3000/api/v1/records
* body
```json
{
	"startDate": "2016-01-01",
	"endDate": "2020-02-02",
	"minCount": 1,
	"maxCount": 1000
}
```

## Response Example
```json
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "2sdj3NZvCYrMFpeJ",
            "createdAt": "2017-01-15T10:02:54.547Z",
            "totalCount": 900
        },
        {
            "key": "7d4uR598BL4XpDiX",
            "createdAt": "2016-11-05T14:37:45.024Z",
            "totalCount": 300
        },
        {
            "key": "aWV3iBGfvrmUmc3F",
            "createdAt": "2016-12-01T09:52:49.472Z",
            "totalCount": 800
        },
        {
            "key": "NChqTIVamZJiXNkA",
            "createdAt": "2017-01-15T02:26:08.396Z",
            "totalCount": 400
        }
		...
}
```


### find of mongoos
```nodejs
        Records.find(function(err, records) {
            if (err) {
                code = 1;
                msg = "Error"
                res.status(500).send(err);
                return;
            }
            if (records === null) {
                res.status(404).send("Records Not Found")
                return;
            }
            res.json({
                code: code,
                msg: msg,
                records: records
            });
        //}).select('key createdAt sum(counts) as totalCount -_id');
        }).select({"key":"key", "createdAt":"createdAt", "_id":0}).aggregate({$sum :"counts"});
```

### aggregate of mongoos
```nodejs
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
                code = "404";
                msg = "Records Not Found"
                json_string = util.format('{"code": "%s", "msg": "%s"}', code, msg)
                res.status(404).send(json_string);
                console.log(json_string);
                return;
            }
            res.status(200).json({
                code: code,
                msg: msg,
                records: records
            });
        }
    );
```
