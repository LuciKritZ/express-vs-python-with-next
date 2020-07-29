var express = require('express'),
    { Client } = require('pg'),
    app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const cons = require('consolidate');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'admin',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// count
let count = 1;

// Query for inserting the data into the table
let query = {
  text: 'INSERT INTO node(name, description, count) VALUES($1, $2, $3)',
  values: [`test_${count}`, `test_description_${count}`, count],
}

const deleteQuery = {
  text: 'DELETE FROM node',
}

// PG Connect
client.connect();

app.get('/', function(req, res) {
  client.query('SELECT * from node', (err, response) => {
    res.header('Content-Type: text/event-stream');
    res.send(response.rows.length.toString());
  });

});

app.get('/insert_and_delete/count/:id', function (req, res) {
  const id = req.params.id;
  client.query('DELETE FROM node', (err) => {
    if(err){
      console.log("Error occured", err);
      return;
    }
    const startTime = moment();
    const start = moment.now();
    for (let i = 1; i <= id; i++) {
      query = {
        text: 'INSERT INTO node(name, description, count) VALUES($1, $2, $3)',
        values: [`test_${i}`, `test_description_${i}`, i],
      }
      client.query(query, (error) => {
        if(error){
          throw error;
        }
      });
    }
    const end = moment.now();
    const completeTime = moment();
    client.query('SELECT * from node', (errorInSelect, response) => {
      res.header('Content-Type: text/event-stream');
      let sendResponse = {
        length: response.rows.length,
        timeTaken: completeTime.diff(startTime),
        startTime: start,
        endTime: end
      }
      res.json(sendResponse);
    });
  })
})

app.get('/delete/all', function (req, res) {
  client.query('DELETE FROM node', (err, response) => {
    console.log(response);
  })
})

// Server
app.listen(4000, function(){
  console.log('Server started on Port 4000.');
})
