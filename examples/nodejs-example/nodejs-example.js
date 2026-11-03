// @ts-check
import { OpenCageGeoSearchPlugin } from '@opencage/geosearch-core';

console.log(typeof OpenCageGeoSearchPlugin);

const options = {
  key: process.env.OPENCAGE_SEARCH_TOKEN || '',
};

const plugin = OpenCageGeoSearchPlugin(options);

console.log(typeof plugin);
