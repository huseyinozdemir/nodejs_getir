# This Project is a Node Js enter project.

## INSTALL NodeJS on Mac
* brew install nodejs or brew upgrade nodejs
* npm init

## INSTALL Framework and Components
npm install --save express body-parser mongoose

## Don't restart
npm install -g nodemon

## RUN server.js
node server.js

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
