# OpenCage - geosearch

<div align="center">

[![header](/resources/OpenCage-geosearch-header.png)](https://opencagedata.com/geosearch)

<p>A JavaScript library that lets you quickly add a search box and help your users find locations</p>

[![Build Status](https://app.travis-ci.com/OpenCageData/geosearch.svg?token=8YN5QSo2Lnt3LymLoxZZ&branch=develop)](https://app.travis-ci.com/OpenCageData/geosearch)
[![Version](https://img.shields.io/npm/v/@opencage/geosearch-core.svg?style=flat-square)](https://www.npmjs.com/package/@opencage/geosearch-core)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

</div>

To get started you need:

- A container to inject the autosuggest into
- An [OpenCage geosearch](https://opencagedata.com/geosearch) key (available when you become a geosearch customer)
- To specify the domain for the `access-control-allow-origin` HTTP header (commonly known as a CORS header) in your [OpenCage account dashboard](https://opencagedata.com/dashboard)

This library comes as a plugin on [Algolia's Autocomplete](https://github.com/algolia/autocomplete), then, that creates an input and provides the interactivity and accessibility attributes.

By configuring the two required parameters (`container` and `key`), and configuring the CORS header in your OpenCage dashboard you can have an interactive geosearch experience for places (countries, states/provinces, cities/towns/villages, suburbs/neighbourhoods, major POIS) around the world.

## Example

![header](/resources/screenshot-results-berlin.png)

See a live demo [on the OpenCage site](https://opencagedata.com/geosearch).

## Usage

For convenience, this repository is published as multiple [packages](#Packages). For a simple usage, we bundle it with the [Algolia's Autocomplete](https://github.com/algolia/autocomplete).
To get started, with a simple HTML page, you need a container to anchor the geosearch into:

```html
<div id="place"></div>
```

Then, insert your search experience into it by calling the `algoliaAutocomplete` function, providing :

- The container (a CSS selector),
- The OpenCage Geosearch API key.

Make sure to provide a container (e.g., a div), not an input. The Geosearch generates a fully accessible search box.

```html
<script type="text/javascript">
  opencage.algoliaAutocomplete({
    container: '#place',
    plugins: [
      opencage.OpenCageGeoSearchPlugin({
        key: 'YOUR-GEOSEARCH-KEY',
      }),
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

TODO: define list of optional params

### Tweaking the look and feel

TODO: explain how to skin the look and feel

## Packages

- core
- bundle

## Issues

Find a bug or want to request a new feature? Please let us know by submitting [an issue](https://github.com/OpenCageData/geosearch/issues).

## Please Note

Geosearch is an entirely different service than geocoding. OpenCage also operates a [forward and reverse geocoding API](https://opencagedata.com/api), please don't confuse the geosearch service with the geocoding API. 

Learn more about [the difference between geosearch and geocoding](https://opencagedata.com/guides/the-difference-between-geocoding-and-geosearch). 

## License

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.

### Who is OpenCage GmbH?

<a href="https://opencagedata.com"><img src="opencage_logo_300_150.png"></a>

We run the [OpenCage Geocoding API](https://opencagedata.com/api). Learn more [about us](https://opencagedata.com/about). 

We also run [Geomob](https://thegeomob.com), a series of regular meetups for location based service creators, where we do our best to highlight geoinnovation. If you like geo stuff, you will probably enjoy [the Geomob podcast](https://thegeomob.com/podcast/).
