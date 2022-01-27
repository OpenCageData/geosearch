const { uniqByKeepFirst } = require('./helpers/arrayUtils');
const { htmlFooter } = require('./Footer');
const { SOURCE_ID } = require('./constants');

const fn = () => {};

const handleResult = (
  { results: returnedResults },
  { onActive = fn, onSelect = fn, noResults = 'No results.' } = {}
) => {
  // filter, to dedupe , results on the attribute `formatted`
  const results = uniqByKeepFirst(returnedResults, (it) => it.formatted);

  return [
    {
      sourceId: SOURCE_ID,
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
          return noResults;
        },
        footer({ createElement }) {
          // type: (params: { state: AutocompleteState<TItem>, source: AutocompleteSource<TItem>, items: TItem[], createElement: Pragma, Fragment: PragmaFrag }) => VNode | string
          return createElement('div', {
            dangerouslySetInnerHTML: {
              __html: htmlFooter,
            },
          });
        },
      },
      // ...
    },
  ];
};

module.exports = { handleResult };
