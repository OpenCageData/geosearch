const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  externals: {
    leaflet: 'leaflet',
  },
  optimization: {
    minimize: false,
  },
  output: {
    libraryTarget: 'umd',
    filename: 'leaflet-opencage-geosearch.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
};
