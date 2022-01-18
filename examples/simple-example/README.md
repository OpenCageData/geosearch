# Simple HTML and Vanilla JS integration

A very basic example for implementing [OpenCage Geosearch](https://opencagedata.com/geosearch) autocomplete widget using basic HTML and javascript

1. include the CSS in the page

```html
<header>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle/dist/css/autocomplete-theme-classic.min.css"
  />
</header>
```

2. Add the search container, and the SDK adjusting the path

```html
<body>
  <div id="autocomplete"></div>
  <script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle"></script>
</body>
```

Then set your OpenCage Geosearch Key (available to customers in their account dashboard), and any of the [various optional geosearch parameters](https://github.com/OpenCageData/geosearch#optional-configuration) with the autocomplete:

```html
<script>
  const options = {
    key: 'YOUR-API-KEY',
    // language: 'fr',
    // noResults: 'Pas de résultat.'
  };

  opencage.algoliaAutocomplete({
    container: '#autocomplete',
    plugins: [opencage.OpenCageGeoSearchPlugin(options)],
  });
</script>
```

3. Finally, you will need to serve the page on the domain that matches the CORS header domain you specified for geosearch in [the geosearch tab of your OpenCage account dashboard](https://opencagedata.com/dashboard#geosearch). For testing you can serve the page from localhost.

Have questions? Please [get in touch](https://opencagedata.com/contact).
