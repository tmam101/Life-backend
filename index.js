var trello = require('trello');
async function getBoards() {
  print("started")
  var response = await trello.getBoards()
  print(response)
  print("done")
}
getBoards()
