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

# API Curl GET Request test
curl http://localhost:3000/api/

# An Advice
You can use Robomongo. It is a visual tool helping you manage Database MongoDB and free.

# find of mongoos
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

# aggregate of mongoos
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
