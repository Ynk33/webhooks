const path = require('path');

module.exports = {
  mode: 'production',
  entry: './server.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'server.js',
  },
  target: 'node',
  devtool: 'source-map',
};