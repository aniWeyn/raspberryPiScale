var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

var weight = 25;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
	res.status(200).send(weight);
});

app.get('/:num', function(req, res){
	console.log(req.params);
	console.log("TTT");
	weight = req.params.num;
	res.status(200).send(weight);
});


app.post('/', function(req, res){
   //weight = req.body;
   console.log(req);
   res.status(201);
});

var server = app.listen(8000, function () {
   console.log("app running on port.", server.address().port);
});

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});
