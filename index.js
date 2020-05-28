//MARK: REQUIREMENTS
var envvar = require('envvar');
var bodyParser = require('body-parser');
var express = require('express');
var trello = require('./trello.js')
const { Pool } = require('pg');
//MARK: PROPERTIES
var port = process.env.PORT || 5000
var app = express();
var server = app.listen(port, function() {
  console.log('server listening on port ' + port);
});
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//MARK: SETUP
app.use(bodyParser.urlencoded({
  extended: false
}));

//MARK: ENDPOINTS
app.get('/', async function(request, response) {
  console.log("/")
  response.json({started: "true"})
})

app.get('/getDoing', async function(request, response) {
  var cards = await trello.getCardsFromDoing()
  response.json(cards)
})

app.get('/cardDone', async function(request, response) {
  // console.log(request)
  var id = request.query.id
  console.log("Card id to mark done: " +   id)
  var result = await trello.markCardDone(id)
  response.json({done: result})
})

app.get('/db', async function(request, response) {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM stats');
      const results = { 'results': (result) ? result.rows : null};
      console.log(result.rows[0].done)
      response.json(results)
      client.release();
    } catch (err) {
      console.error(err);
      response.json({error: "error /db"})
    }
  })

  app.get('/done', async function(request, response) {
    response.json({done: await getDone()})
  })

  app.get('/incrementDone', async function(request, response) {
    response.json({done: await incrementDone()})
  })

  app.get('/resetDone', async function(request, response) {
    response.json({done: await resetDone()})
  })

  app.get('/updateDone', async function(request, response) {
    response.json({done: await updateDone()})
  }) // TODO update this every day

  app.get('/setup', async function(request, response) {
    // await query('DROP TABLE test_table')
    await query('CREATE TABLE IF NOT EXISTS stats (done int, todo int)')
    await query('INSERT INTO stats VALUES (0, 0)')
    response.json({done: await getDone(), todo: await getTodo()})
  }) // TODO update this every day

  async function getDone() {
    const data = await query('SELECT * FROM stats')
    return data.rows[0].done
  }

  async function getTodo() {
    const data = await query('SELECT * FROM stats')
    return data.rows[0].todo
  }

  async function resetDone() {
    await query('UPDATE stats SET done = 0')
    return await getDone()
  }

  async function incrementDone() {
    await query('UPDATE stats SET done = done + 1')
    return await getDone()
  }

  async function updateDone() {
    var cards = await trello.getCardsFromDoing()
    return cards.length
  }

  async function query(string) {
    const client = await pool.connect();
    let result = await client.query(string);
    client.release();
    return result
  }

  //SAMPLE QUERIES
  // const client = await pool.connect();
  // const data = await client.query('SELECT * FROM stats');
  // const results = { 'results': (data) ? data.rows : null};
  // var count = data.rows[0].count
  // const result = await client.query('SELECT * FROM stats');
  // await client.query('CREATE TABLE IF NOT EXISTS stats (count INT)');
  // await client.query('INSERT INTO stats VALUES (1)')
  // await client.query('DELETE FROM stats WHERE count=1')
  // await client.query('INSERT INTO stats VALUES (1)')
//TODO: Handle timeouts
//TODO: Tests
