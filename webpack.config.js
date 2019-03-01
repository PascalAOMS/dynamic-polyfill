const path = require('path');

const config = {
  module: {},
};

const indexConfig = Object.assign({}, config, {
  name: "index",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, ''),
    filename: "index.js"
  },
  mode: 'development'
});

const testConfig = Object.assign({}, config,{
  name: "test",
  entry: "./test/test.js",
  output: {
    path: path.resolve(__dirname, ''),
    filename: "test.js"
  },
  mode: 'development'
});

module.exports = [
  indexConfig, testConfig,
];
