//MARK: REQUIREMENTS
var envvar = require('envvar');
var network = require('./network.js')
//MARK: PROPERTIES
var trelloKey = envvar.string('trellokey')
var trelloToken = envvar.string('trellotoken')
var doingListID = "5e388f5d25b5df537d00585c"
var doneListID = "5e388f5daa59850ac464ed62"
var baseTrelloURL = "https://api.trello.com/1/"
var keyAndToken = "key="+trelloKey+"&token="+trelloToken
var doingCardsURL = baseTrelloURL + "lists/"+doingListID+"/cards?fields=name&" + keyAndToken
var cardsDoneToday = 0 // TODO

//MARK: FUNCTIONS
async function getCardsFromDoing() {
  var response = await network.get(doingCardsURL)
  return response
}

async function markCardDone(id) {
  // TODO
  let putURL = baseTrelloURL + "cards/" + id + "?idList=" + doneListID + keyAndToken
  let r = await network.put(putURL)
  // cardsDoneToday += 1
  console.log(r)
}

//MARK: EXPORTS
exports.getCardsFromDoing = getCardsFromDoing;
exports.markCardDone = markCardDone;
