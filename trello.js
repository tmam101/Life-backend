var envvar = require('envvar');
var key = envvar.string('trellokey');
var token = envvar.string('trellotoken');
var keyAndToken = "?key=" + key + "&token=" + token
var baseURL = "https://api.trello.com/"
var boardsURL = baseURL + "1/members/me/boards" + keyAndToken
var network = require('./network.js')
var wtboardid = envvar.string('wtboardid')
var overduelistid = '5e5d66d9d998814b05ba2253'

async function getBoards() {
  var response = await network.get(boardsURL)
  return response
}

async function getWillowTreeBoard() {
  var response = await network.get('https://api.trello.com/1/boards/' + wtboardid + keyAndToken)
  return response
}

async function getOverdueCards() {
  var response = await network.get(baseURL + '/1/lists/'+overduelistid+'/cards')
  return response
}
exports.getBoards = getBoards;
exports.getWillowTreeBoard = getWillowTreeBoard;
exports.getOverdueCards = getOverdueCards;
