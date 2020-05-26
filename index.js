var envvar = require('envvar');
var bodyParser = require('body-parser');
var express = require('express');
var trello = require('./trello.js')
var port = process.env.PORT || 5000

var app = express();
var server = app.listen(port, function() {
  console.log('server listening on port ' + port);
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/', async function(request, response) {
  console.log("/")
  response.json({started: "true"})
})

app.get('/getDoing', async function(request, response) {
  var cards = await trello.getCardsFromDoing()
  response.json(cards)
})

//TODO: Handle timeouts
