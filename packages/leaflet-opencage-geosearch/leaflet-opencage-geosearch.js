/* eslint-disable no-underscore-dangle */
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
    _map: undefined,
    _marker: undefined,

    options: {
      key: '',
      bounds: '',
      countrycode: '',
      language: '',
      limit: '',

      customMarkerOptions: {},
      placeholder: 'Search for places',
      defaultZoomLevel: 13,
    },

    onAdd(map) {
      const className = 'leaflet-control-opencage-geosearch';
      const geosearch = L.DomUtil.create('div', className);
      this._map = map;

      const handleSelect = (params) => {
        if (typeof this.options.onSelect === 'function') {
          this.options.onSelect(params);
          return;
        }
        const { item } = params;
        const latlng = [item.geometry.lat, item.geometry.lng];
        if (this._marker) {
          this._map.removeLayer(this._marker);
        }
        const popupContent = document.createElement('span');
        popupContent.textContent = item.formatted;
        this._marker = L.marker(latlng, this.options.customMarkerOptions)
          .bindPopup(popupContent)
          .addTo(this._map);

        this._map.setView(latlng, this.options.defaultZoomLevel);
      };

      opencage.algoliaAutocomplete({
        container: geosearch,
        placeholder: this.options.placeholder,
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
