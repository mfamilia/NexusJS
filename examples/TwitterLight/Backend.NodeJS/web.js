var express = require('express');

var app = express.createServer(express.logger());
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
app.use(express.bodyParser());

var arr = new Array();

app.get('/', function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  response.send("Twitter Light API is Running...");
  resonse.end();
});


app.get('/TwitterLight/GetAllTweets', function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  response.send(arr);
  resonse.end();
});

app.post('/TwitterLight/SaveTweet', function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  arr.push(request.body);
  response.end();
});

var port = 80;
app.listen(port, function() {
  console.log("Listening on " + port);
});
