//27.1.2017
//Simple weather app, rewritten with promises.
//Description: Accepts a passed in address and makes a request to Google.

const yargs = require('yargs');
const axios = require('axios');

//Configure yargs about the passed params upon start.
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Adress to fetch the weather for.',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//Get the address from the passed arguments and encode it.
var encodedAddress = encodeURI(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
    .then((response) => {

        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find address.');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/0fd21d0726648ec96328e0e7fb47c8c7/${lat},${lng}?units=si`;

        console.log(response.data.results[0].formatted_address);

        // make another call to fetch the weather, returning a second promise via axios
        return axios.get(weatherUrl);
    })
    .then((response) => {
        var temperature = response.data.currently.temperature;
        var apperentTemp = response.data.currently.apparentTemperature;
        console.log(`It is currently ${temperature}, but feels like ${apperentTemp}`);
    })
    .catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect to server.');
        } else {
            console.log(error.message);
        }
    });
