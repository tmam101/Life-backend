var trello = require('./trello.js');
async function getBoards() {
  print("started")
  var response = await trello.getBoards()
  console.log(response)
  console.log("done")
}
getBoards()
