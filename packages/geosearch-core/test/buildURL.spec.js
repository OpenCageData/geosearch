import { expect } from 'chai';
import { buildURL } from '../src/URLBuilder';

describe('geosearch-core:buildURL', () => {
  const DEFAULT_URL = 'https://api.opencagedata.com/geosearch?query=weimar';
  it(`should return url when the options is null or undefined`, () => {
    const url = DEFAULT_URL;
    expect(buildURL(url)).to.equal(DEFAULT_URL);
    expect(buildURL(url, null)).to.equal(DEFAULT_URL);
  });
  it(`should return url when the options is emtpy, tue, false`, () => {
    const url = DEFAULT_URL;
    expect(buildURL(url, false)).to.equal(DEFAULT_URL);
    expect(buildURL(url, true)).to.equal(DEFAULT_URL);
    expect(buildURL(url, {})).to.equal(DEFAULT_URL);
  });
  it(`should return url when the options has random attribute, tue, false`, () => {
    const url = DEFAULT_URL;
    expect(buildURL(url, { john: 'doe' })).to.equal(DEFAULT_URL);
  });
  it(`should return url with limit when the options has limit`, () => {
    const url = DEFAULT_URL;
    const expected = `${DEFAULT_URL}&limit=4`;
    expect(buildURL(url, { limit: 4 })).to.equal(expected);
    expect(buildURL(url, { limit: '4' })).to.equal(expected);
  });
  it(`should return url without key when the options has a key`, () => {
    const url = DEFAULT_URL;
    const key = `MY-API-KY`;
    // const expected = `${DEFAULT_URL}&key=${key}`;
    expect(buildURL(url, { key })).to.equal(DEFAULT_URL);
  });
  it(`should return url with countrycode when the options has a countrycode`, () => {
    const url = DEFAULT_URL;
    const countrycode = 'fr';
    const expected = `${DEFAULT_URL}&countrycode=${countrycode}`;
    expect(buildURL(url, { countrycode })).to.equal(expected);
  });
  it(`should return url with language when the options has a language`, () => {
    const url = DEFAULT_URL;
    const language = 'fr';
    const expected = `${DEFAULT_URL}&language=${language}`;
    expect(buildURL(url, { language })).to.equal(expected);
  });
  it(`should return url with bounds when the options has a bounds`, () => {
    const url = DEFAULT_URL;
    const bounds = `-11.47934,35.70526,3.68042,59.17839`;
    const expected = `${DEFAULT_URL}&bounds=${bounds}`;
    expect(buildURL(url, { bounds })).to.equal(expected);
  });
  it(`should return url with parameters in the order`, () => {
    const url = DEFAULT_URL;
    const key = `MY-API-KY`;
    const limit = 4;
    const countrycode = 'de';
    const language = 'fr';
    const bounds = `-11.47934,35.70526,3.68042,59.17839`;
    // const expected = `${DEFAULT_URL}&key=${key}&limit=${limit}&countrycode=${countrycode}&language=${language}&bounds=${bounds}`;
    const expected = `${DEFAULT_URL}&limit=${limit}&countrycode=${countrycode}&language=${language}&bounds=${bounds}`;
    expect(
      buildURL(url, { key, limit, countrycode, language, bounds })
    ).to.equal(expected);
  });
});
