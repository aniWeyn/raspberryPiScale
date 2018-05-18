var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

var appHttp = require('http').createServer(handler)
var io = require('socket.io')(appHttp)
var url = require('url')
var fs = require('fs')


var PythonShell = require('python-shell');

var options = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  pythonOptions: ['-u'],
  scriptPath: 'hx711py',
  args: []
};



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




appHttp.listen(5000);

// Http handler function
function handler (req, res) {

    // Using URL to parse the requested URL
    var path = url.parse(req.url).pathname;

    // Managing the root route
    if (path == '/') {
        index = fs.readFile(__dirname+'/public/index.html', 
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load index.html");
                }

                res.writeHead(200,{'Content-Type': 'text/html'});
                res.end(data);
            });
    // Managing the route for the javascript files
    } else if( /\.(js)$/.test(path) ) {
        index = fs.readFile(__dirname+'/public'+path, 
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load " + path);
                }

                res.writeHead(200,{'Content-Type': 'text/plain'});
                res.end(data);
            });
    } else if( /\.(css)$/.test(path) ) {
        index = fs.readFile(__dirname+'/public'+path, 
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load " + path);
                }

                res.writeHead(200,{'Content-Type': 'text/css'});
                res.end(data);
            });
    } 
    else {
        res.writeHead(404);
        res.end("Error: 404 - File not found.");
    }

}


// Web Socket Connection
io.sockets.on('connection', function (socket) {

  // If we recieved a command from a client to start watering lets do so
  socket.on('example-ping', function(data) {
 

      delay = data["duration"];

      // Set a timer for when we should stop watering
      setTimeout(function(){
           socket.emit('example-pong', { wgt: weight });
      }, delay*5);


  });

});


PythonShell.run('measure.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
});
