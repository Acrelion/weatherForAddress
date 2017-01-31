//Make the request to the Google server to fetch the Lattitude and Longtitude.
const request = require('request');

var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURI(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Couldn\'t connect to the server. :(');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('No results for the specified address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longtitude: body.results[0].geometry.location.lng
            });
        }

    });
}

module.exports = {
    geocodeAddress
}
