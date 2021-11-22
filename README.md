# OpenCage - geosearch

<div align="center">

[![header](/resources/OpenCage-geosearch-header.png)](https://opencagedata.com/geosearch)

<p>A JavaScript library that lets you quickly add a search box and help your users find locations</p>

[![Build Status](https://app.travis-ci.com/OpenCageData/geosearch.svg?token=8YN5QSo2Lnt3LymLoxZZ&branch=develop)](https://app.travis-ci.com/OpenCageData/geosearch)
[![Version](https://img.shields.io/npm/v/@opencage/geosearch-core.svg?style=flat-square)](https://www.npmjs.com/package/@opencage/geosearch-core)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

</div>

All you need to get started is:

- A container to inject the geosearch into
- An [OpenCage geosearch](https://opencagedata.com/geosearch) API Key

By configuring just those two required parameters (`container` and `key`) you can have an interactive geosearach experience for places all around the world]. The library, based on [Algolia's Autocomplete](https://github.com/algolia/autocomplete), creates an input and provides the interactivity and accessibility attributes.

![header](/resources/screenshot-results-berlin.png)

## Usage

To get started, with a simple HTML page, you need a container to anchor the geosearch into:

```html
<div id="place"></div>
```

Then, insert your search experience into it by calling the `algoliaAutocomplete` function, providing :

- the container, it can be a CSS selector.
- and the key.

Make sure to provide a container (e.g., a div), not an input. Autocomplete generates a fully accessible search box for you.

```html
<script type="text/javascript">
  opencage.algoliaAutocomplete({
    container: '#place',
    plugins: [
      opencage.OpenCageGeoSearchPlugin({
        key: 'YOUR-API-KEY',
      }),
    ],
  });
</script>
```

and to run it, just add the following resources to the header of the page:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle/dist/css/autocomplete-theme-classic.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle"></script>
```

## Issues

Find a bug or want to request a new feature? Please let me know by submitting [an issue](https://github.com/OpenCageData/geosearch/issues).

## License

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.
