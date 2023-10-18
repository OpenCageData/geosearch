import { AutocompletePlugin } from '@algolia/autocomplete-js';
import { OnSubmitParams } from '@algolia/autocomplete-shared/dist/esm/core/AutocompleteOptions';
import {
  OnActiveParams,
  OnSelectParams,
} from '@algolia/autocomplete-shared/dist/esm/core/AutocompleteSource';

declare module '@opencage/geosearch-core' {
  interface OpenCageGeoSearchPluginOptions {
    /**
     * The GEOSEARCH Key
     */
    key: string;
    /**
     * restricts the possible results to a defined bounding box.
     *
     * The value of the bounds parameter should be specified as two coordinate points forming the south-west and north-east corners of a bounding box (min longitude, min latitude, max longitude, max latitude).
     *
     * Example usage: bounds: '-0.563160,51.280430,0.278970,51.683979'
     *
     * Values that are not valid coordinates are ignored. We have built a small, map-based tool to easily see bounds values: https://opencagedata.com/tools/bounds-finder.
     */
    bounds?: string;

    /**
     * restricts results to the specified country/territory.
     *
     * The country code is a two letter code as defined by the ISO 3166-1 Alpha 2 standard. E.g. gb for the United Kingdom, fr for France, us for United States.
     *
     * Example usage: countrycode: 'de'
     *
     * Non-two letter country codes are ignored.
     */
    countrycode?: string;

    /**
     * language to display results in.
     *
     * A two letter language code (such as es for Spanish or de for German), or native in which case we will attempt to return the response in the local language. Currently supported languages are: de, en, es, fr.
     *
     * Example usage: language: 'de'
     *
     * If no language is explicitly specified, we default to English en.
     *
     * We hope to add more languages in the future. Please get in touch if lack of a certain language is preventing you from becoming a customer.
     */
    language?: string;

    /**
     * maximum number of results the autosuggest should display.
     *
     * Default is 5. Maximum allowable value is 10.
     *
     * Example usage: limit: 3
     */
    limit?: number;

    /**
     * sets the time (in ms) to pass without any typing before doing a request to the API.
     *
     * Default is 300.
     *
     * Example usage: debounce: 250
     */
    debounce?: number;

    /**
     * sets the label to display when the API returns no results (it is i18n).
     *
     * Default is No results.
     *
     * Example usage: noResults: 'Pas de résultat.'
     */
    noResults?: string;
  }
  interface OpenCageGeoSearchPluginEvents {
    /**
     * callback function called whenever a result is active.
     *
     * By default, this is an empty function.
     */
    onActive?(params: OnActiveParams<any>): void;
    /**
     * callback function called whenever a result is selected.
     *
     * By default, this is an empty function.
     */
    onSelect?(params: OnSelectParams<any>): void;
    /**
     * callback function called when submitting the form.
     *
     * By default, this is an empty function.
     */
    onSubmit?(params: OnSubmitParams<any>): void;
  }

  export function OpenCageGeoSearchPlugin(
    options: OpenCageGeoSearchPluginOptions,
    events?: OpenCageGeoSearchPluginEvents
  ): AutocompletePlugin<any, any>;
}
