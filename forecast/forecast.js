//Make a request to the Dark Sky API to fetch the weather.

const request = require('request');

var getWeather = (coordinates, callback) => {
    request({
        url: `https://api.darksky.net/forecast/0fd21d0726648ec96328e0e7fb47c8c7/${coordinates.latitude},${coordinates.longtitude}?units=si`,
        json: true
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {
            callback(undefined, body.currently.temperature);
        } else {
            callback('Unable to fetch weather.');
        }
    });
};


module.exports = {
    getWeather: getWeather
};
