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
  for (var i = 0; i < cards.length; i++) {
    cards[i].checklists = await trello.getChecklistsOnCard(cards[i].id)
  }
  response.json(cards)
}) //todo null checklists

app.get('/cardDone', async function(request, response) {
  // console.log(request)
  var id = request.query.id
  console.log("Card id to mark done: " +   id)
  var result = await trello.markCardDone(id)
  // await database.incrementDone()
  response.json({done: result})
})

app.get('/cardDoing', async function(request, response) {
  var id = request.query.id
  console.log("Card id to mark doing: " + id)
  var result = await trello.markCardDoing(id)
  // await database.decrementDone()
  response.json({done: result})
})

app.get('/updateCard', async function(request, response) {
  var id = request.query.id
  var description = request.query.description
  var result = await trello.updateCard(id, description)
  response.json({done: result})
})

app.get('/getStats', async function(request, response) {
  const doing = await trello.getCardsFromDoing()
  const doingLength = doing.length
  const todoToday = await database.getTodoToday()
  console.log("doing: " + doingLength)
  console.log("todotoday: " + todoToday)
  // response.json(await database.getDoneAndTodo())
  response.json({todoRemaining: doingLength, todoTotal: todoToday})
})

// app.get('/incrementDone', async function(request, response) {
//   response.json({done: await database.incrementDone()})
// })

// app.get('/resetDone', async function(request, response) {
//   response.json({done: await database.resetDone()})
// })

// app.get('/updateTodoRemaining', async function(request, response) {
//   response.json({done: await database.updateTodo()})
// })

app.get('/setTodoToday', async function(request, response) {
  var cards = await trello.getCardsFromDoing()
  await database.setTodoToday(cards.length)
  let todo = await database.getTodoToday()
  console.log("Todo: " + todo)
  response.json({todoToday: todo})
})

app.get('/incrementTodoToday', async function(request, response) {
  var r = await database.incrementTodoToday();
  response.json({done: r})
})

// app.get('/incrementTodo', async function(request, response) {
//   response.json(await database.incrementTodo())
// })
//
// app.get('/decrementTodo', async function(request, response) {
//   response.json(await database.decrementTodo())
// })

app.get('/checklists', async function(request, response) {
  let id = request.query.id
  response.json(await trello.getChecklistsOnCard(id))
})

app.get('/checkItemState', async function(request, response) {
  let cardId = request.query.cardId
  let checkItemId = request.query.checkItemId
  var state = request.query.state
  let status = await trello.markCheckItemState(cardId, checkItemId, state)
  if (status.statusCode == 200) {
    response.json({done: true})
  } else {
    response.json({done: false})
  }
})
