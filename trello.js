//MARK: REQUIREMENTS
var envvar = require('envvar');
var network = require('./network.js')
//MARK: PROPERTIES
var trelloKey = envvar.string('trellokey')
var trelloToken = envvar.string('trellotoken')
var doingListID = "5e388f5d25b5df537d00585c"
var doingCardsURL = "https://api.trello.com/1/lists/"+doingListID+"/cards?fields=name&key="+trelloKey+"&token="+trelloToken

//MARK: FUNCTIONS
async function getCardsFromDoing() {
  var response = await network.get(doingCardsURL)
  return response
}

//MARK: EXPORTS
exports.getCardsFromDoing = getCardsFromDoing;
