var path = require("path");

var DIST_DIR = path.join(__dirname, "dist"),
    CLIENT_DIR = path.join(__dirname, "src");

module.exports = {
    context: CLIENT_DIR,

    entry: {
        bundle: "./main",
        client: "./app/client.js",
        createHouse: "./app/create-house.js"
    },
    output: {
        path: DIST_DIR,
        filename: "[name].js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};