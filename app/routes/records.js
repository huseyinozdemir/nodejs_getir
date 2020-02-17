const express = require('express');
const { postListRecords } = require('../controllers/records');
const Records = require('../models/records');
const router = express.Router({ mergeParams: true });


// MidleWare
router.use(async function(req, res, next){
    console.log('Records Checking.....');
    next();
});

router
  .route('/')
  .post(postListRecords);

module.exports = router;
