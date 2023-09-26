/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable global-require */
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
    window.L.OpenCageGeosearch = factory(L);
  }
})(function (L) {
  const OpenCageGeosearchControl = L.Control.extend({
    options: {
      key: '',
      bounds: '',
      countrycode: '',
      language: '',
      limit: '',
      customMarkerOptions: {},
    },

    onAdd(map) {
      const className = 'leaflet-control-opencage-geosearch';
      const geosearch = L.DomUtil.create('div', className);

      const handleSelect = (params) => {
        if (typeof this.options.onSelect === 'function') {
          this.options.onSelect(params);
          return;
        }
        const { item } = params;
        const latlng = [item.geometry.lat, item.geometry.lng];
        marker = L.marker(latlng, options.customMarkerOptions).addTo(map);
        marker.bindPopup(item.formatted);
        map.setView(latlng, 13);
      };

      opencage.algoliaAutocomplete({
        container: geosearch,
        placeholder: 'Search for places',
        plugins: [
          opencage.OpenCageGeoSearchPlugin(this.options, {
            onSelect: handleSelect,
            onActive: this.options.onActive,
            onSubmit: this.options.onSubmit,
          }),
        ],
      });

      return geosearch;
    },

    onRemove(/* map */) {
      // Nothing to do here
    },
  });

  L.Control.openCageGeosearch = function (opts) {
    return new OpenCageGeosearchControl(opts);
  };

  return L.Control.openCageGeosearch;
}, window);
