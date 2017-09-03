
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('../config');
const {
  createHousehold,
  getHousehold,
  updateAnExpense,
  deleteAnExpense,
  filterOutRemoved,
  addNewExpense,
  addNewRoommate,
  updateRoommate,
  deleteRoommate,
 } = require('./models/household-model');

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

app.get('/house-stats/:slug', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'house-stats.html'));
});

app.get('/create-house/:userType', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'create-house.html'));
});

// ******************************
// api endpoints
app.get('/api/household/:slug', (req, res) => {
  return getHousehold(req.params.slug)
    .then((house) => {
      if (house == null) {
        res.status(400).json(house);
      } else {
        const filteredHouse = {
          id: house._id,
          name: house.name,
          slug: house.slug,
          roommates: filterOutRemoved(house.roommates).slice(0),
          expenses: filterOutRemoved(house.expenses).slice(0),
        };
        res.status(200).json(filteredHouse);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'nope' });
    });
});

// creates a new household
app.post('/api/household', (req, res) => {
  createHousehold(req.body)
    .then((household) => {
      res.status(201).json(household);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'nope' });
    });
});

// add new expense
app.post('/api/expenses/:slug', (req, res) => {
  addNewExpense(req.params.slug, req.body)
    .then((status) => {
      res.status(200).json(status);
    });
});

// edit a household expense
app.put('/api/expenses/:slug', (req, res) => {
  updateAnExpense(req.params.slug, req.body)
    .then((expense) => {
      res.status(200).json(expense);
    });
});

// delete an expense
app.put('/api/expenses/delete/:slug', (req, res) => {
  deleteAnExpense(req.params.slug, req.body)
    .then((expenseStatus) => {
      res.status(200).json(expenseStatus);
    });
});

// add a new roommate
app.post('/api/roommates/new/:slug', (req, res) => {
  addNewRoommate(req.params.slug, req.body)
    .then(response => res.status(200).json(response));
});

// edit a roommate
app.put('/api/roommates/:slug', (req, res) => {
  updateRoommate(req.params.slug, req.body)
    .then((roommate) => {
      res.status(200).json(roommate);
    });
});

// remove a roommate
app.post('/api/roommates/remove/:slug', (req, res) => {
  deleteRoommate(req.params.slug, req.body)
    .then(response => res.status(200).json(response));
});

// *******************************************
let server;

function runServer(databaseUrl = DATABASE_URL) {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useMongoClient: true }, (err) => {
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
