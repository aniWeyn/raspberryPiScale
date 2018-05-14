var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

var weight = 25;


var PythonShell = require('python-shell');
var pyshell = new PythonShell('hx711py/example.py', { mode: 'text '});
pyshell.send('hello world!');


pyshell.on('message', function (message) {
 
  console.log(message);
  weight = message;
  
});


pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
  console.log('finished');
});





app.get('/', function(req, res){
	res.status(200).send("weight: " + weight);
});


var server = app.listen(8000, function () {
   console.log("app running on port.", server.address().port);
});
