var envvar = require('envvar');
var key = envvar.string('trellokey');
var token = envvar.string('trellotoken');
var keyAndToken = "?key=" + key + "&token=" + token
var baseURL = "https://api.trello.com/"
var boardsURL = baseURL + "1/members/me/boards" + keyAndToken
var network = require('./network.js')
var wtboardid = envvar.string('wtboardid')

async function getBoards() {
  var response = await network.get(boardsURL)
  return response
}

async function getWillowTreeBoard() {
  var response = await network.get('https://api.trello.com/1/boards/' + wtboardid + keyAndToken')
  return response
}
exports.getBoards = getBoards;
exports.getWillowTreeBoard = getWillowTreeBoard;
