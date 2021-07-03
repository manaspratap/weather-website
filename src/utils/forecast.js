const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const weatherUrl =
    "http://api.weatherstack.com/current?access_key=0b0b98cb4aa1e2407e10953f71ced439&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  request({ url: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (error) {
      callback("Unable to find location.", undefined);
    } else {
      const { weather_descriptions, temperature, precip } = body.current;
      callback(
        undefined,
        weather_descriptions[0] +
          ". It is currently " +
          temperature +
          " degrees out. There is a " +
          precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
