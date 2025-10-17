# `@opencage/leaflet-opencage-geosearch`

<p>A Leaflet plugin that lets you quickly add a search box and help your users find locations on the map</p>

**🆕 Now supports both Leaflet 1.x and Leaflet 2.0 alpha!**

## Demos

Check out the interactive demo pages in the [demo/](demo/) directory:

- **[Leaflet 2.0 ESM Demo](demo/leaflet2-esm.html)** - Modern ESM with factory methods
- **[Leaflet 2.0 Class Demo](demo/leaflet2-esm-class.html)** - Recommended Leaflet 2.0 approach
- **[Leaflet 1.x UMD Demo](demo/leaflet1-umd.html)** - Classic Leaflet 1.x implementation

Or view the [live CodePen demo](https://codepen.io/opencage/full/podemjq) (Leaflet 1.x).

## Leaflet version

- **Leaflet 1.x:** Tested with versions 1.7 to 1.9.4
- **Leaflet 2.0:** Compatible with v2.0.0-alpha and above

## Other external dependencies

This plugin uses the [Opencage geoseach SDK bundle](https://github.com/OpenCageData/geosearch/tree/master/packages/geosearch-bundle) with Alogolia's autocomplete. Check the [instructions](#usage).

## Browser / device compatibility

This plugin will be compatible with the same browsers / device than the leaflet library is.

## Usage with Leaflet v1.x

Load the plugin's CSS and JavaScript files:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@opencage/leaflet-opencage-geosearch/leaflet-opencage-geosearch.css"
/>

<script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle"></script>
<script src="https://cdn.jsdelivr.net/npm/@opencage/leaflet-opencage-geosearch"></script>
```

and insert this new control to your leaflet map:

```js
const options = {
  key: 'YOUR_OPENCAGE_GEOSEARCH_KEY',
  // you will need to become a customer to get a geosearch key
  //
  // limit: 3,
  // noResults: 'Pas de résultat.',
  //
  // leafletjs options:
  position: 'topright', // Possible values are 'topleft', 'topright' [default], 'bottomleft' or 'bottomright'
};

const geosearchControl = L.Control.openCageGeosearch(options).addTo(map);
```

**NB:**
You can specify a specific version of the plugin and geosearch bundle using

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@opencage/leaflet-opencage-geosearch@0.0.5/leaflet-opencage-geosearch.css"
/>

<script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle@0.0.2"></script>
<script src="https://cdn.jsdelivr.net/npm/@opencage/leaflet-opencage-geosearch@0.0.6"></script>
```

## Usage with Leaflet v2.x alpha (new)

### Option 1: Class-based (Recommended for Leaflet 2.0)

```javascript
import { Map, TileLayer } from 'leaflet';
import { OpenCageGeosearchControl } from '@opencage/leaflet-opencage-geosearch';
import '@opencage/leaflet-opencage-geosearch/leaflet-opencage-geosearch.css';

const map = new Map('map', { center: [51.505, -0.09], zoom: 13 });
const tileLayer = new TileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
tileLayer.addTo(map);

const control = new OpenCageGeosearchControl({
  key: 'YOUR-API-KEY',
  placeholder: 'Search for places...',
});
map.addControl(control);
```

### Option 2: Factory function (Backward compatible)

```javascript
import { Map } from 'leaflet';
import { openCageGeosearch } from '@opencage/leaflet-opencage-geosearch';
import '@opencage/leaflet-opencage-geosearch/leaflet-opencage-geosearch.css';

const map = new Map('map', { center: [51.505, -0.09], zoom: 13 });
openCageGeosearch({ key: 'YOUR-API-KEY' }).addTo(map);
```

**📘 See the [demo/README.md](demo/README.md) for complete working examples with import maps (no build tools required).**

## API reference

1. the `options` parameter has the same API as the [core sdk](https://github.com/OpenCageData/geosearch) and dedicated leaflet ones, please see the example below

2. the `events` from the [core sdk](https://github.com/OpenCageData/geosearch) can be included directly in the `options` parameter.

   | example:

```js
const greenIcon = L.icon({
  iconUrl: 'leaf-green.png',
  shadowUrl: 'leaf-shadow.png',

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const options = {
  key: window.OPENCAGE_GEOSEARCH_KEY,
  // you will need to become a customer to get a geosearch key
  //
  onActive: () => {
    console.log('Happy Geosearch');
  },
  //
  // leafletjs options:
  position: 'topright', // Possible values are 'topleft', 'topright' [default], 'bottomleft' or 'bottomright'
  customMarkerOptions: { icon: greenIcon }, // Optional Leaflet Marker options https://leafletjs.com/reference.html#marker-option, default is [{}]
  placeholder: 'Type here to search for places', // default [13]
  defaultZoomLevel: 12, // default [13]
};
```

## License

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.

## Who is OpenCage GmbH?

[![OpenCage Logo](/resources/opencage_logo_300_150.png)](https://opencagedata.com)

We run the [OpenCage Geocoding API](https://opencagedata.com/api). Learn more [about us](https://opencagedata.com/about).

We also run [Geomob](https://thegeomob.com), a series of regular meetups for location based service creators, where we do our best to highlight geoinnovation. If you like geo stuff, you will probably enjoy [the Geomob podcast](https://thegeomob.com/podcast/).
