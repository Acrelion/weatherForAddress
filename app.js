//27.1.2017
//Simple weather app.
//Description: Accepts a passed in address and makes a request to Google.

const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./forecast/forecast');

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


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results, (errorMessage, forecastResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log("Current temperature is:", forecastResults);
            }
        });
    }
});
