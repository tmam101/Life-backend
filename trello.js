var envvar = require('envvar');
var key = envvar.string('trellokey');
var token = envvar.string('trellotoken');
var baseURL = "https://api.trello.com/"
var boardsURL = baseURL + "1/members/me/boards?key=" + key + "&token=" + token
var network = require('network.js')

function getBoards() {
  var response = await network.get(boardsURL)
  return response
}
exports.getBoards = getBoards;
