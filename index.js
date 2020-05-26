//MARK: REQUIREMENTS
var envvar = require('envvar');
var bodyParser = require('body-parser');
var express = require('express');
var trello = require('./trello.js')
//MARK: PROPERTIES
var port = process.env.PORT || 5000
var app = express();
var server = app.listen(port, function() {
  console.log('server listening on port ' + port);
});

//MARK: SETUP
app.use(bodyParser.urlencoded({
  extended: false
}));

//MARK: ENDPOINTS
app.get('/', async function(request, response) {
  console.log("/")
  await trello.markCardDone("4AbE76vv")
  response.json({started: "true"})
})

app.get('/getDoing', async function(request, response) {
  var cards = await trello.getCardsFromDoing()
  response.json(cards)
})

app.post('/cardDone', async function(request, response) {
  //TODO
  console.log(request)
  var id = request.query.id
  console.log(id)
  var result = await trello.markCardDone(id)
  response.json({done: result})
})

//TODO: Handle timeouts
//TODO: Tests
