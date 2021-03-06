const { isString } = require('./helpers/stringUtils');
const { checkResponseStatus } = require('./helpers/fetchUtils');
const { debouncePromise } = require('./helpers/debounce');
const { handleResult } = require('./handleResult');
const { buildURL } = require('./URLBuilder');
const { AWAIT_USER_INPUT } = require('./constants');

const OpenCageGeoSearchPlugin = (
  options = { debounce: 300, noResults: 'No results.' },
  events = {}
) => {
  const fn = () => {};

  let selectedItem = null;

  const onSelect = (params) => {
    selectedItem = params.item;
    if (events.onSelect) events.onSelect(params);
  };

  const onActive = events.onActive || fn;
  const onSubmit = events.onSubmit || fn;

  const debouncedFetch = debouncePromise(fetch, options.debounce);

  return {
    async getSources({ query }) {
      // TODO: API key missing?
      // if (!window.fetch) {
      //   console.warn('Please Contact the developer of this website!');
      // }
      if (query === '') {
        selectedItem = null;
        return [];
      }
      if (!isString(query)) {
        console.debug('Not a string');
        selectedItem = null;
        return [];
      }
      if (query.length < 3) {
        console.debug('Query is too short');
        selectedItem = null;
        return handleResult(AWAIT_USER_INPUT, {
          noResults: options.noResults,
          onActive,
          onSelect,
        });
      }
      if (selectedItem)
        return handleResult(
          { results: [selectedItem] },
          { noResults: options.noResults, onActive, onSelect }
        );
      const url = buildURL(
        `https://api.opencagedata.com/geosearch?q=${query}`,
        options
      );
      const headers = {
        'OpenCage-Geosearch-Key': options.key,
      };
      return debouncedFetch(url, { headers, mode: 'cors' })
        .then(checkResponseStatus)
        .then((response) => {
          if (response.ok) return response.json();
          console.log(response.statusText);
          throw response.statusText;
        })
        .then((apiResponse) =>
          handleResult(apiResponse, {
            noResults: options.noResults,
            onActive,
            onSelect,
          })
        )
        .catch((err) => {
          console.error(`[Opencage GeoSearch error]: ${err.message}`);
          console.error(`[error] status: ${err.status}`);
          console.error(`[error] statusText: ${err.statusText}`);
          return [];
        });
    },
    // ---- onSubmit
    // type: (params: { state: AutocompleteState, event: Event, ...setters }) => void
    onSubmit,
    // ---- onReset
    //  type: (params: { state: AutocompleteState, event: Event, ...setters: AutocompleteSetters }) => void
    onReset: () => {
      selectedItem = null;
    },
  };
};

module.exports = { OpenCageGeoSearchPlugin };
