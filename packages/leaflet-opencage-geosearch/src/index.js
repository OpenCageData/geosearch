const L = require('leaflet');

const opencage = require('@opencage/geosearch-core');

const fn = () => {};

L.Control.OpencageGeosearch = L.Control.extend({
  options: {
    key: '',
    bounds: '',
    countrycode: '',
    language: '',
    limit: '',
  },

  events: {
    onSelect: fn,
    onActive: fn,
    onSubmit: fn,
  },

  // eslint-disable-next-line no-unused-vars
  onAdd: function onAdd(map) {
    const className = 'leaflet-control-opencage-geosearch';
    const geosearch = L.DomUtil.create('div', className);

    opencage.algoliaAutocomplete({
      container: geosearch,
      placeholder: 'Search for places',
      plugins: [opencage.OpenCageGeoSearchPlugin(this.options, this.events)],
    });

    return geosearch;
  },

  // eslint-disable-next-line no-unused-vars
  onRemove: function onRemove(map) {
    // Nothing to do here
  },
});

L.control.opencageGeosearch = function opencageGeosearch(opts) {
  return new L.Control.OpencageGeosearch(opts);
};

module.exports = L.control.opencageGeosearch;
