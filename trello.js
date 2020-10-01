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
var doingCardsURL = baseTrelloURL + "lists/"+doingListID+"/cards?fields=name,desc&" + keyAndToken

//MARK: FUNCTIONS
async function getCardsFromDoing() {
  var response = await network.get(doingCardsURL)
  return response
}
// todo include checklist data as part of the initial getCardsFromDoing call
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

async function updateCard(id, description) {
  let putURL = baseTrelloURL + "cards/" + id + "?desc=" + description + "&" + keyAndToken
  let response = await network.put(putURL)
  if (response.statusCode = 200) {
    console.log("Card " + id + " description changed successfully")
    return true
  }
  console.log("Card " + id + " description failed to change")
  return false
}

async function markCardDoing(id) {
  let putURL = baseTrelloURL + "cards/" + id + "?idList=" + doingListID + "&" + keyAndToken
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
      delete response[i].pos
      // delete response[i].idCard
      delete response[i].idBoard
      // delete response[i].id
      for (var j = 0; j < response[i].checkItems.length; j++) {
        item = response[i].checkItems[j]
        delete item.idMember
        delete item.nameData
        delete item.pos //todo is pos useful for position? order of items?
        delete item.due
      }
    }
    return response
  } else {
    console.log(failure)
    return response
  }
}

async function markCheckItemState(cardId, checkItemId, state) {
  let url = baseTrelloURL + "cards/" + cardId + "/checkItem/" + checkItemId + "?state=" + state + "&" + keyAndToken
  console.log(url)
  let response = await network.put(url)
  return response
}

//MARK: EXPORTS
exports.getCardsFromDoing = getCardsFromDoing;
exports.markCardDone = markCardDone;
exports.markCardDoing = markCardDoing;
exports.getChecklistsOnCard = getChecklistsOnCard;
exports.markCheckItemState = markCheckItemState;
exports.updateCard = updateCard;
