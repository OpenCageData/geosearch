import { uniqByKeepFirst } from './helpers/arrayUtils';
import { SOURCE_ID } from './constants';

const fn = () => {};

export const handleResult = (
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
          const linkStyle = 'text-decoration:none;color:#009966;';
          return createElement(
            'div',
            {
              style: 'display:flex;flex-direction:column;align-items:flex-end;',
            },
            createElement(
              'div',
              {
                style:
                  'display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:0.7em;color:#009966;',
              },
              createElement(
                'span',
                null,
                createElement(
                  'a',
                  {
                    href: 'https://opencagedata.com/geosearch',
                    target: '_blank',
                    rel: 'noreferrer',
                  },
                  createElement('img', {
                    src: 'https://assets.opencagedata.com/opencage-20x21.png',
                    height: '21',
                    width: '20',
                    border: '0',
                    alt: 'OpenCage',
                    style: 'display:inline;',
                  })
                )
              ),
              createElement(
                'span',
                null,
                '\u00A0\u00A0Made by ',
                createElement(
                  'a',
                  {
                    href: 'https://opencagedata.com/geosearch',
                    target: '_blank',
                    rel: 'noreferrer',
                    style: linkStyle,
                  },
                  'OpenCage'
                ),
                '.'
              ),
              createElement(
                'span',
                null,
                '\u00A0\u00A9\u00A0',
                createElement(
                  'a',
                  {
                    href: 'https://www.openstreetmap.org/copyright',
                    target: '_blank',
                    rel: 'noreferrer',
                    style: linkStyle,
                  },
                  'OpenStreetMap'
                ),
                ','
              ),
              createElement(
                'span',
                null,
                '\u00A0',
                createElement(
                  'a',
                  {
                    href: 'https://opencagedata.com/credits',
                    target: '_blank',
                    rel: 'noreferrer',
                    style: linkStyle,
                  },
                  'others'
                ),
                '.'
              )
            )
          );
        },
      },
      // ...
    },
  ];
};

export default { handleResult };
