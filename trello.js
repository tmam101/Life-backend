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

//MARK: FUNCTIONS
async function getCardsFromDoing() {
  var response = await network.get(doingCardsURL)
  return response
}

async function markCardDone(id) {
  let putURL = baseTrelloURL + "cards/" + id + "?idList=" + doneListID + "&" + keyAndToken
  let response = await network.put(putURL)
  if (response.statusCode = 200) {
    console.log("Card " + id + " marked done successfully")
    return true
  }
  console.log("Card " + id + " failed to mark done")
  return false
}

async function getChecklistsOnCard(id) {
  let url = baseTrelloURL + "cards/" + id + "/checklists?" + keyAndToken
  let response = await network.get(url)
  if (response.statusCode = 200) {
    console.log("Success fetching checklists on card " + id)
    // console.log(response)
    for (var i = 0; i < response.length; i++) {
      console.log(response[i])
      console.log(response[i].pos)
      delete response[i].pos
      // delete element.pos
    }
    return response
  } else {
    console.log(failure)
    return response
  }
}

//MARK: EXPORTS
exports.getCardsFromDoing = getCardsFromDoing;
exports.markCardDone = markCardDone;
exports.getChecklistsOnCard = getChecklistsOnCard;
