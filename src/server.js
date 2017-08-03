
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('../config');
const Household = require('./models/household-model');

// const Household = mongoose.model('Household');


const DIST_DIR = path.join(__dirname, '../dist');
const app = express();

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.use(morgan('common'));

// *************************
// static end points
app.get('/', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.get('/house-stats', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'house-stats.html'));
});

app.get('/create-house', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'create-house.html'));
});

// ******************************
// api endpoints
app.get('/api/household', (req, res) => {
  Household
    .find()
    .exec()
    .then((house) => {
      res.status(200).json(house);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'nope' });
    });
});
// ask about json parser
// creates a new household
app.post('/api/household', (req, res) => {
  Household.create({
    name: req.body.name,
    expenses: req.body.expenses,
    roommates: req.body.roommates,
  })
    .then((household) => {
      res.status(201).json(household);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'nope' });
    });
});

// end point to assign bills to each roommate
// app.post('/api/roommates/bills', (req, res) => {

// });

// used to add roommates to a household
// app.post('/api/roommates', (req, res) => {

// });

// used to add expenses to the household
// app.post('/api/expenses', (req, res) => {

// });

// edit a household expense
app.put('/api/expenses/:id', (req, res) => {
  // console.log(req.body);
  const update = {};
  const updatedFields = ['amount', 'name', 'dueDate'];
  updatedFields.forEach((field) => {
    if (field in req.body) {
      update[field] = req.body[field];
    }
  });
  // I have the correct id but when I search for it I'm returning null
  // see end point test on line 88 of end-point-test.js
  Household
    .findById(req.body.house_id)
    .exec()
    .then((updateExpense) => {
      console.log(`${updateExpense} here}`);
      res.status(201).json(updateExpense);
    })
    .catch(err => res.status(500).json({ message: 'Something went wrong', error: err }));
});

// *******************************************
let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, { useMongoClient: true }, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      }).on('error', (error) => {
        mongoose.disconnect();
        reject(error);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  }));
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}


module.exports = { runServer, app, closeServer };
