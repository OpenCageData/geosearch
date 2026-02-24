# OpenCage - geosearch

<div align="center">

[![header](/resources/OpenCage-geosearch-header.png)](https://opencagedata.com/geosearch)

<p>A JavaScript library that lets you quickly add a search box and help your users find locations</p>

[![Node.js CI](https://github.com/OpenCageData/geosearch/actions/workflows/node.js.yml/badge.svg)](https://github.com/OpenCageData/geosearch/actions/workflows/node.js.yml)
[![Version](https://img.shields.io/npm/v/@opencage/geosearch-core.svg?style=flat-square)](https://www.npmjs.com/package/@opencage/geosearch-core)
[![codecov](https://codecov.io/gh/OpenCageData/geosearch/branch/master/graph/badge.svg?token=VAZ0RZCGL3)](https://codecov.io/gh/OpenCageData/geosearch)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

</div>

## Example Screenshot

![header](/resources/screenshot-results-berlin.png)

See a configurable, [live demo on the OpenCage site](https://opencagedata.com/geosearch/demo), or play with the html/css/js [on codepen](https://codepen.io/collection/oEMyOj).

We also have tutorials/examples for integration on a map:
[Leaflet](https://opencagedata.com/tutorials/leaflet-location-search),
[OpenLayers](https://opencagedata.com/tutorials/openlayers-location-search),
[MapLibre](https://codepen.io/opencage/pen/JjaepyE).

## Getting started

To get started you need:

- A container (typically a `div`) to inject the autosuggest into
- An [OpenCage geosearch](https://opencagedata.com/geosearch) key (available when you become an OpenCage geosearch customer ([see pricing](https://opencagedata.com/pricing#geosearch)))
- To specify the domain for the `access-control-allow-origin` HTTP header (commonly known as a CORS header) in your [OpenCage account dashboard](https://opencagedata.com/dashboard) in the "Geosearch" tab.

This library comes as a plugin on [Algolia's Autocomplete](https://github.com/algolia/autocomplete), which creates an input and provides the interactivity and accessibility attributes.

By configuring the two required parameters (`container` and `key`), and configuring the CORS header in the geosearch section of your OpenCage account dashboard you can have an interactive geosearch experience for places (countries, states/provinces, cities/towns/villages, suburbs/neighbourhoods, major POIS) around the world.

**Note**: to learn more about this service please see the [OpenCage geosearch site](https://opencagedata.com/geosearch) (especially the [FAQ section](https://opencagedata.com/geosearch#faq)).

## Usage

For convenience, this repository is published as multiple [packages](#packages). For a simple usage, we bundle it with the [Algolia's Autocomplete](https://github.com/algolia/autocomplete).
To get started, with a simple HTML page, you need a container to anchor the geosearch into:

```html
<div id="place"></div>
```

Then, insert your search experience into it by calling the `algoliaAutocomplete` function, providing :

- The container (a CSS selector)
- The OpenCage Geosearch API `key`

Make sure to provide a container (e.g., a div), not an input. The Geosearch generates a fully accessible search box.

Please note: a geosearch key is unrelated to the keys for the OpenCage geocoding API. Geosearch keys are of the form `oc_gs_...` and will need to be configured for a specific domain in your OpenCage account dashboard after you become an OpenCage geosearch customer.

```html
<script type="text/javascript">
  opencage.algoliaAutocomplete({
    container: '#place',
    plugins: [
      opencage.OpenCageGeoSearchPlugin(
        {
          key: 'YOUR-GEOSEARCH-KEY',
        },
        // optional event handlers:
        {
          onSelect: function handleSelect(params) {
            console.log('Selected Item is', params.item);
            const latlng = [params.item.geometry.lat, params.item.geometry.lng];
            // do something with the coords
            console.log('Selected result coords', latlng);
          },
          onSubmit: function handleSubmit(params) {
            // Do something with the selected and then submitted value
            console.log('Submit with', params.state.query);
          },
        }
      ),
    ],
  });
</script>
```

and to run it, just add the following resources to the header of the HTML page:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle/dist/css/autocomplete-theme-classic.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle"></script>
```

### Optional configuration

```js
opencage.OpenCageGeoSearchPlugin(options, events);
```

#### 1. Options

In addition to the mandatory `key` parameter, the following optional parameters may also be set

- `bounds` - restricts the possible results to a defined bounding box.

  The value should be specified as two coordinate points forming the south-west and north-east corners of a bounding box (min longitude, min latitude, max longitude, max latitude).
  Values that are not valid coordinates are ignored. We have built [a small, map-based tool to easily see bounds values](https://opencagedata.com/bounds-finder).

  Example usage: `bounds: '-0.563160,51.280430,0.278970,51.683979'`

- `countrycode` - restricts results to the specified country/territory.

  The country code is a two letter code as defined by the ISO 3166-1 Alpha 2 standard. E.g. `gb` for the United Kingdom, `fr` for France, `us` for United States.
  Non-two letter country codes are ignored.

  Example usage: `countrycode: 'de'`

- `proximity` - bias results to favour those close to a specific point

  The value should be specified as a coordinate point in decimal format (latitude, longitude)
  Values that are not valid coordinates are ignored.

  Examples: `proximity: '52.5432379,13.4142133'`

- `language` - language to display results in.

  A two letter language code (such as `es` for Spanish or `de` for German).
  Currently supported languages are: `de`, `en`, `es`, `fr`, `it`, and `pt`.
  If no language is explicitly specified, we default to English `en`.

  Example usage: `language: 'de'`

  Note: We hope to add more languages in the future. Please get in touch if lack of a certain language is preventing you from becoming a customer.

- `limit` - maximum number of results the autosuggest should display.

  Default is 5. Maximum allowable value is 10.

  Example usage: `limit: 3`

- `debounce` - sets the time (in ms) to pass without any typing before doing a request to the API.

  Default is 300.

  Example usage: `debounce: 250`

- `noResults` - sets the label to display when the API returns no results (it is i18n).

  Default is `No results.`.

  Example usage: `noResults: 'Pas de résultat.'`

### 2. Events

- `onActive` - callback function called whenever a result is active.

  By default, this is an empty function.

  Function parameter type:

  ```js
  (params:
    { state: AutocompleteState,
    ...setters,
    event: Event,
    item: TItem,
    itemInputValue: string,
    itemUrl: string,
    source: AutocompleteSource }
    ) => void
  ```

- `onSelect` - callback function called whenever a result is selected.

  By default, this is an empty function.

  Function parameter type:

  ```js
  (params:
    { state: AutocompleteState,
    ...setters,
    event: Event,
    item: TItem,
    itemInputValue: string,
    itemUrl: string,
    source: AutocompleteSource }
    ) => void
  ```
  defaults to
  ```
    ({ setIsOpen }) => setIsOpen(false)
  ```

- `onSubmit` - callback function called when submitting the form.

  By default, this is an empty function.

  Function parameter type:

  ```js
  (params:
    { state: AutocompleteState,
    event: Event,
    ...setters }
    ) => void
  ```

## Tweaking the look and feel

Check Algolia's Autocomplete [CSS styles](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-theme-classic/#css-variables)

## Multiple datasources

It is possible to query not just geosearch but also other datasources. [Please see our examples](examples/multiple-sources/).

## React

In the `/examples directory` you can find an example implemenation with React.

## Geosearch on a map

We have tutorials showing how to [integrate geosearch with a Leaflet map](https://opencagedata.com/tutorials/leaflet-location-search) or [OpenLayers](https://opencagedata.com/tutorials/openlayers-location-search), and [a MapLibre codepen example](https://codepen.io/opencage/pen/JjaepyE).

## Packages

### [`@opencage/geosearch-bundle`](./packages/geosearch-bundle/)

[![npm version](https://img.shields.io/npm/v/@opencage/geosearch-bundle.svg?style=flat-square)](https://www.npmjs.com/package/@opencage/geosearch-bundle)

_For those who just want a simple HTML / JS integration_

This package bundles the [Algolia Autocomplete](https://github.com/algolia/autocomplete) and our GeoSearch plugin.

### [`@opencage/geosearch-core`](./packages/geosearch-core/)

[![npm version](https://img.shields.io/npm/v/@opencage/geosearch-core.svg?style=flat-square)](https://www.npmjs.com/package/@opencage/geosearch-core)

_For those using a javascript dependency manager_

This is the core package: the GeoSearch plugin to use with [Algolia Autocomplete](https://github.com/algolia/autocomplete).

### [`@opencage/leaflet-opencage-geosearch`](./packages/leaflet-opencage-geosearch/)

[![npm version](https://img.shields.io/npm/v/@opencage/leaflet-opencage-geosearch.svg?style=flat-square)](https://www.npmjs.com/package/@opencage/leaflet-opencage-geosearch)

This is a plugin for the well-known map API [leaflet](https://leafletjs.com/).
See our [integration tutorial](https://opencagedata.com/tutorials/leaflet-location-search).

### [`@opencage/ol-opencage-geosearch`](./packages/ol-opencage-geosearch/)

[![npm version](https://img.shields.io/npm/v/@opencage/ol-opencage-geosearch.svg?style=flat-square)](https://www.npmjs.com/package/@opencage/ol-opencage-geosearch)

This is a plugin for the well-known map API [OpenLayers](https://openlayers.org).
See our [integration tutorial](https://opencagedata.com/tutorials/openlayers-location-search).

## Browser support / Polyfills

This project is written with modern browser technologies in mind. It is required to include a polyfill when you wish to support older browsers:

- [unfetch](https://www.npmjs.com/package/unfetch), for fetch requests.

## Contributing

We welcome your contributions. Please refer to the following developer's [notes](BUILD.md)

## Reporting Issues

Find a bug or want to request a new feature? Please let us know by submitting [an issue](https://github.com/OpenCageData/geosearch/issues).

## Please Note - Geosearch is NOT Geocoding

Geosearch is an entirely different service than geocoding. OpenCage also operates a [forward and reverse geocoding API](https://opencagedata.com/api), please don't confuse the geosearch service with the geocoding API.

Learn more about [the difference between geosearch and geocoding](https://opencagedata.com/guides/the-difference-between-geocoding-and-geosearch).

## License

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.

## Who is OpenCage GmbH?

[![OpenCage Logo](/resources/opencage_logo_300_150.png)](https://opencagedata.com)

We run the [OpenCage Geocoding API](https://opencagedata.com/api). Learn more [about us](https://opencagedata.com/about).

We also run [Geomob](https://thegeomob.com), a series of regular meetups for location based service creators, where we do our best to highlight geoinnovation. If you like geo stuff, you will probably enjoy [the Geomob podcast](https://thegeomob.com/podcast/).
