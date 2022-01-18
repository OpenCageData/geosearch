# @opencage/geosearch-bundle

The `geosearch-bundle` bundles the Algolia [autocomplete](https://github.com/algolia/autocomplete) and [OpenCage](https://opencagedata.com/) GeoSearch plugin to search for places around the world. This bundle is for browser usage.

## Usage

Links to the css and the script:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle/dist/css/autocomplete-theme-classic.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle"></script>
```

Container and code

```html
<div id="place"></div>

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

## Documentation

See [Documentation](https://github.com/opencagedata/geosearch).

## Demo

See [Demo](https://opencagedata.com/geosearch).
