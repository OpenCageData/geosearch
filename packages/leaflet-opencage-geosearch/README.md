# `@opencage/leaflet-opencage-geosearch`

<p>A Leaflet plugin that lets you quickly add a search box and help your users find locations on the map</p>

Check out a demo page in [/leaflet-plugin-example](https://github.com/OpenCageData/geosearch/tree/master/examples/leaflet-plugin-example). Or take a look at the [live demo](https://codepen.io/opencage/full/podemjq).

## Leaflet version

Tested with latest version 1.7.1

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

and insert this new control to your leaflet map

```js
const options = {
  key: 'YOUR_OPENCAGE_GEOSEARCH_KEY',
  // limit: 3,
  // noResults: 'Pas de résultat.',
  position: 'topright',
};

var geosearchControl = L.control.opencageGeosearch(options).addTo(map);
```

## API reference

1. the `options` parameter has the same API as the [core sdk](https://github.com/OpenCageData/geosearch)

2. the `events` from the [core sdk](https://github.com/OpenCageData/geosearch) can be included directly in the `options` parameter.

   | example:

```js
const options = {
  key: window.OPENCAGE_GEOSEARCH_KEY,
  onActive: () => {
    console.log('Happy Geosearch');
  },
  position: 'topright',
};
```

## License

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.

## Who is OpenCage GmbH?

[![OpenCage Logo](/resources/opencage_logo_300_150.png)](https://opencagedata.com)

We run the [OpenCage Geocoding API](https://opencagedata.com/api). Learn more [about us](https://opencagedata.com/about).

We also run [Geomob](https://thegeomob.com), a series of regular meetups for location based service creators, where we do our best to highlight geoinnovation. If you like geo stuff, you will probably enjoy [the Geomob podcast](https://thegeomob.com/podcast/).
