const { autocomplete } = require('@algolia/autocomplete-js');
const { OpenCageGeoSearchPlugin } = require('@opencage/geosearch-core');

module.exports = { OpenCageGeoSearchPlugin, algoliaAutocomplete: autocomplete };
