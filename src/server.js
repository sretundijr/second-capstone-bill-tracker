const path = require("path");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const DIST_DIR = path.join(__dirname, "../dist"),
    PORT = 8080,
    app = express();

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.use(morgan('common'));

app.get("/", (req, res) => {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.get("/house-stats", (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'house-stats.html'));
});

let server;

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        }).on('error', err => {
            reject(err);
        });
    });
}

function closeServer() {
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
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}


module.exports = { runServer, app, closeServer };
