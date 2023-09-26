# `@opencage/leaflet-opencage-geosearch`

<p>A Leaflet plugin that lets you quickly add a search box and help your users find locations on the map</p>

Check out a demo page in [/leaflet-plugin-example](https://github.com/OpenCageData/geosearch/tree/master/examples/leaflet-plugin-example). Or take a look at the [live demo](https://codepen.io/opencage/full/podemjq).

## Leaflet version

Tested with latest version 1.7.1, 18.0 and 1.9.1, 1.9.3, 1.9.4

## Other external dependencies

This plugin at the moment uses the [Opencage geoseach SDK bundle]() with alogolia's autocomplete. Check the [instructions](#usage).

## Browser / device compatibility

This plugin will be compatible with the same browsers / device than the leaflet library is.

## Usage

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

var geosearchControl = L.Control.openCageGeosearch(options).addTo(map);
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

## API reference

1. the `options` parameter has the same API as the [core sdk](https://github.com/OpenCageData/geosearch) and dedicated leaflet ones, please see the example below

2. the `events` from the [core sdk](https://github.com/OpenCageData/geosearch) can be included directly in the `options` parameter.

   | example:

```js
var greenIcon = L.icon({
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
