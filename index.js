//MARK: REQUIREMENTS
var envvar = require('envvar');
var bodyParser = require('body-parser');
var express = require('express');
var trello = require('./trello.js')
var database = require('./database.js')

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
  response.json({started: "true", cards: await trello.getCardsFromDoing(), stats: await database.getDoneAndTodo()})
})

app.get('/getDoing', async function(request, response) {
  var cards = await trello.getCardsFromDoing()
  response.json(cards)
})

app.get('/cardDone', async function(request, response) {
  // console.log(request)
  var id = request.query.id
  console.log("Card id to mark done: " +   id)
  var result = await trello.markCardDone(id)
  await database.incrementDone()
  response.json({done: result})
})

app.get('/getStats', async function(request, response) {
  response.json(await database.getDoneAndTodo())
})

app.get('/incrementDone', async function(request, response) {
  response.json({done: await database.incrementDone()})
})

app.get('/resetDone', async function(request, response) {
  response.json({done: await database.resetDone()})
})

app.get('/updateTodo', async function(request, response) {
  response.json({done: await database.updateTodo()})
})

app.get('/incrementTodo', async function(request, response) {
  response.json(await database.incrementTodo())
})

app.get('/decrementTodo', async function(request, response) {
  response.json(await database.decrementTodo())
})

app.get('/rose', async function(request, response) {
  response.json({hey: "Rose <3"})
})

app.get('/maleek', async function(request, response) {
  response.json({maleek: "your white wife is here"})
})

app.get('checklists', async function(request, response) {
  let id = request.query.id
  response.json(await trello.getChecklistsOnCard(id))
})
