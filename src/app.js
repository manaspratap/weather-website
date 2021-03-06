const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Manas Pratap Thakur",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Manas Pratap Thakur",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help shall be provided at Hogwarts, if only you ask for it.",
    title: "Help",
    name: "Manas Pratap Thakur",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({
          error: error,
        });
      } else {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            res.send({
              error: error,
            });
          } else {
            res.send({
              forecast: forecastData,
              location: location,
              address: req.query.address,
            });
          }
        });
      }
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Manas Pratap Thakur",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Manas Pratap Thakur",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port port.");
});
