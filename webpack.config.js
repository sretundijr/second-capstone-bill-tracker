const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const CLIENT_DIR = path.join(__dirname, 'src');

module.exports = {
  context: CLIENT_DIR,

  entry: {
    bundle: './main',
    houseStats: './app/house-stats.js',
    createHouse: './app/create-house.js',
    index: './app/index.js',
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(html)$/,
        exclude: /(views)/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(pug)$/,
        use: {
          loader: 'pug-loader',
        },
      },
    ],
  },
};

