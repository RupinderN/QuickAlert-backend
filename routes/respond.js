// var express = require('express');
// var router = express.Router();
// const {NewAlert} = require('../db/mongoose.js');

// router.get('/', function(req, res, next) {
//     const Alert = NewAlert(req.body.name)
//     Alert.find({}).then(alerts => {
//         var JSONdata = JSON.stringify(alerts);
//         res.send(JSONdata);
//     }).catch(err => {
//         res.send("No alerts");
//     })
// });

// module.exports = router;