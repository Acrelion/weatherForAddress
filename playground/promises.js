const request = require('request');

var geocodeAddress = (address) => {

    var encodedAddress = encodeURI(address);

    return new Promise((resolve, reject) => {

        return request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Couldn\'t connect to the server. :(');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('No results for the specified address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longtitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('19146')
    .then((location) => {
        console.log(JSON.stringify(location, undefined, 2));
    }, (errorMessage) => {
        console.log(errorMessage);
    });
