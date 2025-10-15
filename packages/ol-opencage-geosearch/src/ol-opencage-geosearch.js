import Control from 'ol/control/Control';
import { transform } from 'ol/proj';

import { autocomplete } from '@algolia/autocomplete-js';

// eslint-disable-next-line import/no-unresolved
import { OpenCageGeoSearchPlugin } from '@opencage/geosearch-core';

export default class OpenCageGeosearchControl extends Control {
  constructor(options) {
    const pluginOptions = options || {};

    const element = document.createElement('div');
    element.className = 'ol-opencage-geosearch ol-control ol-unselectable';

    super({
      element,
      target: options.target,
    });

    this.options = pluginOptions;
    this.element = element;

    this.setCssPosition(this.options.position);

    autocomplete({
      container: this.element,
      plugins: [
        OpenCageGeoSearchPlugin(this.options, {
          onSelect: this.handleSelect.bind(this),
          onActive: this.options.onActive,
          onSubmit: this.options.onSubmit,
        }),
      ],
    });
  }

  setMap(map) {
    super.setMap(map);
    this.map = map;
  }

  setCssPosition(positionName) {
    if (!positionName) return;

    // deal with
    // position = 'topleft', 'topright', 'bottomleft' or 'bottomright'
    if (positionName.match('top')) {
      this.element.style.top = 0;
    }
    if (positionName.match('bottom')) {
      this.element.style.bottom = 0;
    }
    if (positionName.match('left')) {
      this.element.style.left = 0;
    }
    if (positionName.match('right')) {
      this.element.style.right = 0;
    }
  }

  handleSelect(params) {
    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect(params);
      return;
    }

    const { item } = params;

    const coordinates = transform(
      [item.geometry.lng, item.geometry.lat],
      'EPSG:4326',
      this.getMap().getView().getProjection()
    );

    this.getMap().getView().setCenter(coordinates);
    this.getMap().getView().setZoom(13);
  }
}
