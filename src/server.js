
const path = require("path");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('../config');
const { Household } = require('./models/household-model');

const DIST_DIR = path.join(__dirname, "../dist"),
	PORT = 8080,
	app = express();

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.use(morgan('common'));

// static end points
app.get("/", (req, res) => {
	res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.get("/house-stats", (req, res) => {
	res.sendFile(path.join(DIST_DIR, 'house-stats.html'));
});

app.get("/create-house", (req, res) => {
	res.sendFile(path.join(DIST_DIR, 'create-house.html'))
});

// api endpoints
app.get("/household", (req, res) => {

});
// ask about json parser
// creates a new household
app.post("/household", (req, res) => {
	Household.create({
		name: req.body.name,
		expenses: req.body.expenses,
		roommates: req.body.roommates
	}).then(household => {
		res.status(201).json(household);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ message: "nope" });
	});
});

// end point to assign bills to each roommate
app.post("/roommates/bills", (req, res) => {

});

// used to add roommates to a household
app.post("/roommates", (req, res) => {

});

// used to add expenses to the household
app.post("/expenses", (req, res) => {

});

app.put("/expenses/:id", (req, res) => {

});

app.put("/roommates/bills", (req, res) => {

});

let server;

function runServer() {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
		mongoose.connect(DATABASE_URL, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve(server);
			}).on('error', err => {
				mongoose.disconnect();
				reject(err);
			})
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					reject(err);
					return;
				}
				resolve();
			});
		})
	})
}

if (require.main === module) {
	runServer().catch(err => console.error(err));
}


module.exports = { runServer, app, closeServer };
