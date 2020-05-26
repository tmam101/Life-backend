var envvar = require('envvar');
var bodyParser = require('body-parser');
var trelloKey = envvar.string('trellokey')
var trelloSecret = envvar.string('trellotoken')
var express = require('express');

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/', function(request, response) {
  console.log("get")
})
console.log("hey")
// the issue is its not connected to the right github account! none of the changes I've been making have taken effect.
