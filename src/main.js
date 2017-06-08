
require("file-loader?name=index.html!./views/index.html");
require("file-loader?name=house-stats.html!./views/house-stats.html");
require("file-loader?name=create-house.html!./views/create-house.html");
require("file-loader?name=house-stats.css!./styles/house-stats.css");
require("file-loader?name=create-house.css!./styles/create-house.css");

require('./app/client');
require('./app/create-house');

const fetch = require('whatwg-fetch');
