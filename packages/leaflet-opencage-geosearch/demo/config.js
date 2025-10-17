function configureKey() {
  const LS_KEY = 'opencage.key.geosearch';
  if (!localStorage.getItem(LS_KEY)) {
    localStorage.setItem(
      LS_KEY,
      prompt('What is your OpenCage GeoSearch API key?')
    );
  }
  window.OPENCAGE_GEOSEARCH_KEY = localStorage.getItem(LS_KEY);
}

configureKey();
