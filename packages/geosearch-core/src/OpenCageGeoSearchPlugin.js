const { isString } = require('./helpers/stringUtils');
const { checkResponseStatus } = require('./helpers/fetchUtils');
const { debouncePromise } = require('./helpers/debounce');
const { uniqByKeepFirst } = require('./helpers/arrayUtils');
const { buildURL } = require('./URLBuilder');

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

  const handleResult = ({ results: returnedResults }) => {
    // filter, to dedupe , results on the attribute `formatted`
    const results = uniqByKeepFirst(returnedResults, (it) => it.formatted);

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
            return options.noResults;
          },
          footer({ createElement }) {
            // type: (params: { state: AutocompleteState<TItem>, source: AutocompleteSource<TItem>, items: TItem[], createElement: Pragma, Fragment: PragmaFrag }) => VNode | string
            return createElement('div', {
              dangerouslySetInnerHTML: {
                __html: `
                <div style="display:flex;flex-direction:column;align-items:flex-end;">
                  <div
                    style="display:flex;align-items:center;justify-content:center;font-family: sans-serif;font-size:0.7em;color:#009966;">
                    <span><a href="https://opencagedata.com/geosearch" target="_blank" rel="noreferrer"><img
                          src="https://assets.opencagedata.com/opencage-20x21.png" height="21" width="20" border="0" alt="OpenCage"
                          style="display:inline;" /></a></span>
                    <span>&nbsp;&nbsp;Made by <a href="https://opencagedata.com/geosearch" target="_blank" rel="noreferrer"
                        style="text-decoration:none;color:#009966;">OpenCage</a>.</span>
                    <span>&nbsp;&copy;&nbsp;<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer"
                        style="text-decoration:none;color:#009966;">OpenStreetMap</a>,</span>
                    <span>&nbsp;<a href="https://opencagedata.com/credits" target="_blank" rel="noreferrer"
                        style="text-decoration:none;color:#009966;">others</a>.</span>
                  </div>
                </div>
              `,
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
      // TODO: API key missing
      // if (!window.fetch) return []; // TODO: polyfill?
      if (query === '') {
        selectedItem = null;
      }
      if (selectedItem) return handleResult({ results: [selectedItem] });
      if (!isString(query)) return [];
      if (!query || query.length < 2) return [];
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

module.exports = { OpenCageGeoSearchPlugin };
