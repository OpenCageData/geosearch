(function (factory, window) {
  // define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
    define(['leaflet'], factory);

    // define a Common JS module that relies on 'leaflet'
  } else if (typeof exports === 'object') {
    module.exports = factory(require('leaflet'));
  }

  // attach your plugin to the global 'L' variable
  if (typeof window !== 'undefined' && window.L) {
    window.L.YourPlugin = factory(L);
  }
})(function (L) {
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
    onAdd: function (map) {
      var className = 'leaflet-control-opencage-geosearch';
      var geosearch = L.DomUtil.create('div', className);

      opencage.algoliaAutocomplete({
        container: geosearch,
        placeholder: 'Search for places',
        plugins: [opencage.OpenCageGeoSearchPlugin(this.options, this.events)],
      });

      return geosearch;
    },

    onRemove: function (map) {
      // Nothing to do here
    },
  });

  L.control.opencageGeosearch = function (opts) {
    return new L.Control.OpencageGeosearch(opts);
  };

  return L.control.opencageGeosearch;
}, window);
