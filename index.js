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
      // const result = await client.query('SELECT * FROM test_table');
      // await client.query('CREATE TABLE IF NOT EXISTS test_table (count INT)');
      // await client.query('INSERT INTO test_table VALUES (1)')
      // await client.query('DELETE FROM test_table WHERE count=1')
      // await client.query('INSERT INTO test_table VALUES (1)')
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      console.log(result.rows[0].count)
      // res.render('pages/db', results );
      response.json(results)
      client.release();
    } catch (err) {
      console.error(err);
      response.json({error: "error /db"})
    }
  })

  app.get('/count', async function(request, response) {
    let count = await getCount()
    response.json({count: count})
  })

  app.get('/incrementCount', async function(request, response) {
    const count = await incrementCount()
    response.json({count: count})
  })

  app.get('/resetCount', async function(request, response) {
    const count = await resetCount()
    response.json({count: count})
  })

  async function getCount() {
    // const client = await pool.connect();
    // const data = await client.query('SELECT * FROM test_table');
    // const results = { 'results': (data) ? data.rows : null};
    // var count = data.rows[0].count
    const data = await query('SELECT * FROM test_table')
    // var count = data.rows[0].count
    // client.release();
    return data.rows[0].count
  }

  async function resetCount() {
    await query('UPDATE test_table SET count = 0')
    const count = await getCount // can you return await getCount?
    return count
  }

  async function incrementCount() {
    // const client = await pool.connect();
    // await client.query('UPDATE test_table SET count = count + 1') // You can set it to vars
    // client.release();
    await query('UPDATE test_table SET count = count + 1')
    const count = await getCount // can you return await getCount?
    return count
  }

  async function query(string) {
    const client = await pool.connect();
    let result = await client.query(string);
    client.release();
    return result
  }

//TODO: Handle timeouts
//TODO: Tests
