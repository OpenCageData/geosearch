import React from 'react';
import { OpenCageGeoSearchPlugin } from '@opencage/geosearch-core';

import logo from './logo.svg';
import { GeoSearch } from './components/GeoSearch';

import '@algolia/autocomplete-theme-classic';
import './App.css';

const options = {
  key: process.env.REACT_APP_OPENCAGE_SEARCH_TOKEN,
  // limit: 3,
  // bounds: ''
  // language: 'fr'
  // countrycode: 'de'
};

const events = {
  onSubmit: (params) => {
    console.log('--plugin.OnSubmit()');
    console.log(`params: ${JSON.stringify(params)}`);
    // console.log(`event: ${JSON.stringify(params.event)}`);
  },
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Opencage GeoSearch React Example</p>
        <a
          className="App-link"
          href="https://opencagedata.com/geosearch"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </header>
      <div>
        <br />
        <GeoSearch
          openOnFocus={true}
          plugins={[OpenCageGeoSearchPlugin(options, events)]}
          onSubmit={() => {
            console.log('--autocomplete.OnSubmit()');
          }}
        />
      </div>
    </div>
  );
}

export default App;
