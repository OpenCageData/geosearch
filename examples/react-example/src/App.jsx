import React, { useState } from 'react';
import { OpenCageGeoSearchPlugin } from '@opencage/geosearch-core';
import { GeoSearch } from './components/GeoSearch';
import './App.css';
import logo from './logo.svg';

const { VITE_OPENCAGE_SEARCH_TOKEN: OPENCAGE_SEARCH_TOKEN } = import.meta.env;

// console.log(`OPENCAGE_SEARCH_TOKEN=${OPENCAGE_SEARCH_TOKEN}`);

const options = {
  key: OPENCAGE_SEARCH_TOKEN,
  // limit: 3,
  // bounds: ''
  // language: 'fr'
  // countrycode: 'de'
};

function App() {
  const [error, setError] = useState(null);

  const events = {
    onSubmit: (params) => {
      console.log('--plugin.OnSubmit()');
      console.log(`params: ${JSON.stringify(params)}`);
      // console.log(`event: ${JSON.stringify(params.event)}`);
    },
    onError: (err) => {
      console.error('GeoSearch error', err);
      if (err.status === 401 || err.status === 403) {
        setError('Invalid API key. Please check the key you entered.');
      } else {
        setError('GeoSearch request failed. Please try again.');
      }
    },
  };

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
        {error && <div className="error-banner">{error}</div>}
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
