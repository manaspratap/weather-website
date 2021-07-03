const request = require("request");

const geocode = (address, callback) => {
  const geocodingUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibWFuYXNwcmF0YXAiLCJhIjoiY2txZzZoYm13MGdrNDJ2b2U5ODdqY2xzdiJ9.G2FViDj15f7PvbUv21wFhQ&limit=1";

  request({ url: geocodingUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to geocoding service!", undefined);
    } else if (response.body.features.length == 0) {
      callback("Unable to find location.", undefined);
    } else {
      const { center, place_name } = response.body.features[0];

      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
