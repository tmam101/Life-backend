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
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      console.log(result.rows[0].count)
      response.json(results)
      client.release();
    } catch (err) {
      console.error(err);
      response.json({error: "error /db"})
    }
  })

  app.get('/count', async function(request, response) {
    response.json({count: await getCount()})
  })

  app.get('/incrementCount', async function(request, response) {
    response.json({count: await incrementCount()})
  })

  app.get('/resetCount', async function(request, response) {
    response.json({count: await resetCount()})
  })

  async function getCount() {
    const data = await query('SELECT * FROM test_table')
    return data.rows[0].count
  }

  async function resetCount() {
    await query('UPDATE test_table SET count = 0')
    return await getCount()
  }

  async function incrementCount() {
    await query('UPDATE test_table SET count = count + 1')
    return await getCount()
  }

  async function query(string) {
    const client = await pool.connect();
    let result = await client.query(string);
    client.release();
    return result
  }

  //SAMPLE QUERIES
  // const client = await pool.connect();
  // const data = await client.query('SELECT * FROM test_table');
  // const results = { 'results': (data) ? data.rows : null};
  // var count = data.rows[0].count
  // const result = await client.query('SELECT * FROM test_table');
  // await client.query('CREATE TABLE IF NOT EXISTS test_table (count INT)');
  // await client.query('INSERT INTO test_table VALUES (1)')
  // await client.query('DELETE FROM test_table WHERE count=1')
  // await client.query('INSERT INTO test_table VALUES (1)')
//TODO: Handle timeouts
//TODO: Tests
