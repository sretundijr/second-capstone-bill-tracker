
require("file-loader?name=index.html!./views/index.html");
require("file-loader?name=house-stats.html!./views/house-stats.html");

var hello = document.getElementById("hello");
hello.innerHTML = "Hello World!";


