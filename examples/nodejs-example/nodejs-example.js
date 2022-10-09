const { OpenCageGeoSearchPlugin } = require('@opencage/geosearch-core');

// eslint-disable-next-line import/no-extraneous-dependencies
require('isomorphic-unfetch');

console.log(typeof OpenCageGeoSearchPlugin);

const options = {
  key: process.env.OPENCAGE_SEARCH_TOKEN,
};

const plugin = OpenCageGeoSearchPlugin(options);

console.log(typeof plugin);
