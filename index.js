var trello = require('./trello.js');
async function getBoards() {
  console.log("started")
  var response = await trello.getBoards()
  console.log(response)
  console.log("done")
}
getBoards()
