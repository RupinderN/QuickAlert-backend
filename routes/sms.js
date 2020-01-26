var express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const axios = require('axios');
var router = express.Router();
var {Alert} = require('../db/mongoose');
var {User} = require('../db/mongoose');
var {Service} = require('../db/mongoose');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/', function(req, res, next) {
    const twiml = new MessagingResponse();
    const distanceBetween = (coordinates1, coordinates2) => {
        [lat1, long1] = coordinates1;
        [lat2, long2] = coordinates2;
        var lat1 = lat1.toRadians();
        var lat2 = lat2.toRadians();
        var differenceLat = (lat2-lat1).toRadians();
        var differenceLong = (long2-long1).toRadians;
        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) *Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return 6371 * c;
    }    
    
    User.find({phoneNumber: req.body.From}).then(userInfo => {
        var currentTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + req.body.Body + ".json?access_token=pk.eyJ1IjoiZXNoYWFuYyIsImEiOiJjazV1Z2RieDYxOWo1M21tanVpdmlxbG54In0.0WdUZzxQ-wDgly1Q44y4lA"
        currentTime = new Date(currentTime);
        axios.get(url)
            .then(response => {
                [long, lat] = response.data.features[0].center
                Service.find({}).then(services => {
                    const distances = []
                    services.forEach(service => {
                        const distance = distanceBetween([service.latitude, service.longitude], [lat, long]);
                        distances.push(distance);
                    })
                    const index = distances.indexOf(Math.min(distances));
                    serviceSelected = services[index]
                    const userInformation = {
                        name: userInfo[0].name,
                        time: currentTime,
                        currentLocation: req.body.Body,
                        serviceName: serviceSelected.name,
                        phoneNumber: userInfo[0].phoneNumber,
                        age: userInfo[0].age,
                        medicalConditions: userInfo[0].medicalConditions,
                        otherDetails: userInfo[0].otherDetails,
                    }
                    let newAlert = new Alert(userInformation)
                    newAlert.save().then(() => {
                        twiml.message('Your information has been sent to ')
                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
                    })
                })
            })
    })
})

module.exports = router;