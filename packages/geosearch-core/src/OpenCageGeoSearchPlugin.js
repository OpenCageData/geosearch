const { isString } = require('./helpers/stringUtils');
const { checkResponseStatus } = require('./helpers/fetchUtils');

const buildURL = (url, options) => {
  let result = url;
  if (!options) return result;
  // if (options.key) {
  //   result = `${result}&key=${options.key}`;
  // }
  if (options.limit) {
    result = `${result}&limit=${options.limit}`;
  }
  if (options.countrycode) {
    result = `${result}&countrycode=${options.countrycode}`;
  }
  if (options.language) {
    result = `${result}&language=${options.language}`;
  }
  if (options.bounds) {
    result = `${result}&bounds=${options.bounds}`;
  }

  return result;
};

const OpenCageGeoSearchPlugin = (options = {}, events = {}) => {
  const fn = () => {};
  let selectedItem = null;

  const onSelect = (params) => {
    selectedItem = params.item;
    if (events.onSelect) events.onSelect(params);
  };

  const onActive = events.onActive || fn;
  const onSubmit = events.onSubmit || fn;

  const handleResult = ({ results }) => {
    return [
      {
        sourceId: 'opencage',
        //
        // ---- getItems
        //  type: (params: { query: string, state: AutocompleteState, ...setters }) => Item[] | Promise<Item[]>
        getItems() {
          return results;
        },
        //
        // ---- getItemUrl
        //  type: (params: { item: Item, state: AutocompleteState }) => string | undefined
        // getItemUrl() {
        // TODO?
        // }
        //
        // ---- getItemInputValue
        //  type: (params: { item, state: AutocompleteState }) => string` | defaults to `({ state }) => state.query
        getItemInputValue({ item }) {
          return item.formatted;
        },
        //
        // ---- onSelect
        //  type: (params: { state: AutocompleteState, ...setters, event: Event, item: TItem, itemInputValue: string, itemUrl: string, source: AutocompleteSource }) => void` | defaults to `({ setIsOpen }) => setIsOpen(false)
        onSelect,
        //
        // ---- onActive
        //  type: (params: { state: AutocompleteState, ...setters, event: Event, item: TItem, itemInputValue: string, itemUrl: string, source: AutocompleteSource }) => void
        onActive,
        // ----
        templates: {
          item({ item }) {
            return `${item.formatted}`;
          },
          noResults() {
            // FIXME: will need to suppport other languages
            return 'No results.';
          },
          footer({ createElement }) {
            // type: (params: { state: AutocompleteState<TItem>, source: AutocompleteSource<TItem>, items: TItem[], createElement: Pragma, Fragment: PragmaFrag }) => VNode | string
            return createElement('div', {
              dangerouslySetInnerHTML: {
                __html: `<div style="display:flex;flex-direction:column;align-items:flex-end;"><div style="display:flex;align-items:center;justify-content:center;font-size:0.7em;text-decoration:none;color:#009966;"><span>&nbsp;<a href="https://opencagedata.com/geosearch" target="_blank" rel="noreferrer"><img src="https://assets.opencagedata.com/opencage-20x21.png" height="21" width="20" border="0" alt="OpenCage" style="display:inline;" /></a>&nbsp;&nbsp;Made by <a href="https://opencagedata.com/geosearch" target="_blank" rel="noreferrer">OpenCage</a>.&nbsp;&copy;&nbsp;<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>,&nbsp;<a href="https://opencagedata.com/credits" target="_blank" rel="noreferrer">others</a>.</span></div></div>`,
              },
            });
          },
        },
        // ...
      },
    ];
  };

  return {
    async getSources({ query }) {
      if (query === '') {
        selectedItem = null;
      }
      // if (query !== selectedItem?.formatted) {
      //   selectedItem = null;
      // }

      if (selectedItem) return handleResult({ results: [selectedItem] });
      // TODO: API key missing
      // if (!window.fetch) return []; // TODO: polyfill?
      if (!isString(query)) return [];
      if (!query || query.length < 2) return [];
      const url = buildURL(
        `https://api.opencagedata.com/geosearch?q=${query}`,
        options
      );
      const headers = {
        'OpenCage-Geosearch-Key': options.key,
      };
      return fetch(url, { headers, mode: 'cors' })
        .then(checkResponseStatus)
        .then((response) => {
          if (response.ok) return response.json();
          console.log(response.statusText);
          throw response.statusText;
        })
        .then(handleResult)
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

module.exports = { OpenCageGeoSearchPlugin, buildURL };
