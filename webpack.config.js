const path = require('path');
const { optimize } = require('webpack');

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