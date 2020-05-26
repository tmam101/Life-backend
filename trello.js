var trelloKey = envvar.string('trellokey')
var trelloSecret = envvar.string('trellotoken')
var doingListID = "5e388f5d25b5df537d00585c"
var doingCardsURL = "https://api.trello.com/1/lists/"+doingListID"/cards?fields=name&key="+trelloKey+"&token="+trellotoken

async function getCardsFromDoing() {
  var response = await network.get(doingCardsURL)
  return response
}

exports.getCardsFromDoing = getCardsFromDoing;
