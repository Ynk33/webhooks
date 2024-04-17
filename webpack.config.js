const path = require('path');
const child_process = require('child_process');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './server.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'server.js',
  },
  target: 'node',
  externals: ["child_process"]
};