# Simple HTML and Vanilla JS integration

Just include the CSS

```html
<header>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle/dist/css/autocomplete-theme-classic.min.css"
  />
</header>
```

Add the search container, and the SDK adjusting the path

```html
<body>
  <div id="autocomplete"></div>
  <script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle"></script>
</body>
```

Then use you OpenCage Geosearch Key with the autocomplete:

```html
<script>
  const options = {
    key: 'YOUR-API-KEY',
  };

  opencage.algoliaAutocomplete({
    container: '#autocomplete',
    plugins: [opencage.OpenCageGeoSearchPlugin(options)],
  });
</script>
```
