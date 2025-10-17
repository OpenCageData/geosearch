/* eslint-disable no-underscore-dangle */
import * as L from 'leaflet';
import * as opencage from '@opencage/geosearch-core';
// import { autocomplete } from '@algolia/autocomplete-js';
// import { OpenCageGeoSearchPlugin } from '@opencage/geosearch-core';

import './leaflet-opencage-geosearch.css';
/**
 * Detects if we're using Leaflet 2.x (ESM) or 1.x (global L)
 * In Leaflet 2.x, Control is imported directly
 * In Leaflet 1.x, it's accessed via L.Control
 */
const Control = L.Control || L.default?.Control;
const DomUtil = L.DomUtil || L.default?.DomUtil;
const marker = L.marker || L.default?.marker;
const Marker = L.Marker || L.default?.Marker;

/**
 * OpenCage Geosearch Control for Leaflet
 * Compatible with both Leaflet 1.x and 2.x
 */
class OpenCageGeosearchControl extends Control {
  constructor(options) {
    super(options);
    this._map = undefined;
    this._marker = undefined;

    this.options = {
      key: '',
      bounds: '',
      countrycode: '',
      language: '',
      limit: '',
      customMarkerOptions: {},
      placeholder: 'Search for places',
      defaultZoomLevel: 13,
      ...options,
    };
  }

  onAdd(map) {
    const className = 'leaflet-control-opencage-geosearch';
    const geosearch = DomUtil.create('div', className);
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

      // Support both Leaflet 1.x (factory) and 2.x (constructor)
      if (marker) {
        // Leaflet 1.x style
        this._marker = marker(latlng, this.options.customMarkerOptions)
          .bindPopup(item.formatted)
          .addTo(this._map);
      } else if (Marker) {
        // Leaflet 2.x style
        this._marker = new Marker(latlng, this.options.customMarkerOptions)
          .bindPopup(item.formatted)
          .addTo(this._map);
      }

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
  }

  // eslint-disable-next-line class-methods-use-this
  onRemove(/* map */) {
    // Nothing to do here
  }
}

/**
 * Factory function for Leaflet 1.x compatibility
 * @param {Object} opts - Options for the control
 * @returns {OpenCageGeosearchControl} New control instance
 */
export function openCageGeosearch(opts) {
  return new OpenCageGeosearchControl(opts);
}

// Default export for convenience
export default openCageGeosearch;

if (L.Control) {
  // Attach to L.Control for Leaflet 1.x compatibility
  L.Control.openCageGeosearch = openCageGeosearch;
}

// Also export the class for direct instantiation in Leaflet 2.x
export { OpenCageGeosearchControl };
