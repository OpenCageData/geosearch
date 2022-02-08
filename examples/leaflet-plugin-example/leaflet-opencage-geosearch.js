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
  L.Control.OpencageGeosearch = L.Control.extend({
    options: {
      key: '',
      bounds: '',
      countrycode: '',
      language: '',
      limit: '',
    },

    onAdd: function (map) {
      var className = 'leaflet-control-opencage-geosearch';
      var geosearch = L.DomUtil.create('div', className);

      const handleSelect = ({ item }) => {
        console.log('Selected Item is', item);
        const latlng = [item.geometry.lat, item.geometry.lng];
        marker = L.marker(latlng).addTo(map);
        marker.bindPopup(item.formatted);
        map.setView(latlng, 13);
      };

      opencage.algoliaAutocomplete({
        container: geosearch,
        placeholder: 'Search for places',
        plugins: [
          opencage.OpenCageGeoSearchPlugin(this.options, {
            onSelect: handleSelect,
          }),
        ],
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
