# `@opencage/ol-opencage-geosearch`

<p>An OpenLayers plugin that lets you quickly add a search box and help your users find locations on the map</p>

Check out a demo page in [/openlayers-library-example](https://github.com/OpenCageData/geosearch/tree/master/examples/openlayers-library-example). Or take a look at the [live demo](https://codepen.io/opencage/full/LYezKGz).

## OpenLayers version

Tested with versions:

- 6.14.1
- 7.1.0
- 7.3.0
- 7.4.0
- 8.1.0
- 8.2.0
- 9.0.0
- 9.1.0

## Other external dependencies

This plugin at the moment uses the [Opencage geoseach SDK bundle]() with alogolia's autocomplete. Check the [instructions](#usage).

## Browser / device compatibility

This plugin will be compatible with the same browsers / device than the OpenLayers library is.

## Usage

Load the plugin's CSS and JavaScript files:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@opencage/ol-opencage-geosearch/ol-opencage-geosearch.css"
/>

<script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle"></script>
<script src="https://cdn.jsdelivr.net/npm/@opencage/ol-opencage-geosearch"></script>
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
  // openlayers options:
  position: 'topright', // Possible values are 'topleft', 'topright', 'bottomleft' or 'bottomright'
};

var controlGeosearch = new OpenCageGeosearchControl(options);
map.addControl(controlGeosearch);
```

## API reference

1. the `options` parameter has the same API as the [core sdk](https://github.com/OpenCageData/geosearch)

2. the `events` from the [core sdk](https://github.com/OpenCageData/geosearch) can be included directly in the `options` parameter.

   | example:

```js
const options = {
  key: window.OPENCAGE_GEOSEARCH_KEY,
  // you will need to become a customer to get a geosearch key
  //
  onActive: () => {
    console.log('Happy Geosearch');
  },
  //
  // leafletjs options:
  position: 'topright', // Possible values are 'topleft', 'topright', 'bottomleft' or 'bottomright'
};
```

## License

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.

## Who is OpenCage GmbH?

[![OpenCage Logo](/resources/opencage_logo_300_150.png)](https://opencagedata.com)

We run the [OpenCage Geocoding API](https://opencagedata.com/api). Learn more [about us](https://opencagedata.com/about).

We also run [Geomob](https://thegeomob.com), a series of regular meetups for location based service creators, where we do our best to highlight geoinnovation. If you like geo stuff, you will probably enjoy [the Geomob podcast](https://thegeomob.com/podcast/).
