var path = require("path"),
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


var DIST_DIR = path.join(__dirname, "../dist"),
    PORT = 8080,
    app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("/", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT);