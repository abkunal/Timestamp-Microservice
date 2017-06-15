// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// handle request other than home
app.use(function(req, res, next) {
  // remove the trailing / from the url
  var query = req.url.substr(1, req.url.length);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
               "October", "November", "December"];
  
  // decode the url string
  query = decodeURIComponent(query);
  
  // decoded string is unix timestamp
  if (parseInt(query)) {
    var date = new Date(parseInt(query));
  }
  // decoded string is not unix timestamp
  else {
    var date = new Date(query);
  }
  
  // invalid date is not given
  if (date != "Invalid Date") {
    var json = {"unix": date.getTime(), "natural": months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()};
    res.end(JSON.stringify(json));  
  }
  // invalid date is given
  else {
    var json = {"unix": null, "natural": null};
    res.end(JSON.stringify(json));
  }
    
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
