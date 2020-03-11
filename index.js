var trello = require('./trello.js');
async function getBoards() {
  console.log("started")
  var response = await trello.getBoards()
  console.log(response)
  console.log("done")
}
async function getWillowTreeBoard() {
  var response = await trello.getWillowTreeBoard()
  console.log(response)
}

async function getOverdueCards() {
  var response = await trello.getOverdueCards()
  console.log(response)
}
// getBoards()
// getWillowTreeBoard()
getOverdueCards()
