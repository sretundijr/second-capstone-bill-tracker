
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('../config');
const Household = require('./models/household-model');

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

let aHousehold = '';

app.get('/api/household/:houseName', (req, res) => {
  // Household
  //   .findOne({ slug: req.params.houseName })
  //   .exec()
  const household = aHousehold.getHousehold();
  Promise.resolve(household)
    .then((house) => {
      if (house === null) {
        res.status(400);
      }
      res.status(200).json(house);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'nope' });
    });
});

// creates a new household
app.post('/api/household', (req, res) => {
  // Household.create({
  //   name: req.body.name,
  //   slug: req.body.slug,
  //   expenses: req.body.expenses,
  //   roommates: req.body.roommates,
  // })
  aHousehold = new Household({
    name: req.body.name,
    slug: req.body.slug,
    expenses: req.body.expenses,
    roommates: req.body.roommates,
  });
  Promise.resolve(aHousehold)
    .then((household) => {
      res.status(201).json(household);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'nope' });
    });
});

// used to add roommates to a household
// app.post('/api/roommates', (req, res) => {

// });

// used to add expenses to the household
// app.post('/api/expenses', (req, res) => {

// });

// edit a household expense
app.put('/api/expenses/:slug', (req, res) => {
  // console.log(aHousehold.editAnExpense(req.params.slug, req.body));
  // const update = {};
  // const updatedFields = ['amount', 'name', 'dueDate'];
  // updatedFields.forEach((field) => {
  //   if (field in req.body) {
  //     update[field] = req.body[field];
  //   }
  // });

  // Household
  //   .findById(req.body.house_id)
  //   .exec()
  //   .then((updateExpense) => {
  //     res.status(201).json(updateExpense);
  //   })
  //   .catch(err => res.status(500).json({ message: 'Something went wrong', error: err }));
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
