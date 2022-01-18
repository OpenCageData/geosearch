const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    library: 'opencage',
    libraryTarget: 'umd',
    filename: 'opencage-geosearch-bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
};
