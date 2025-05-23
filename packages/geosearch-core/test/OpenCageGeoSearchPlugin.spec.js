/* eslint-disable import/no-named-as-default-member */
import { expect } from 'chai';
import fetchMock from 'fetch-mock';

// fetch polyfill
import 'isomorphic-unfetch';

import theModule from '../src/OpenCageGeoSearchPlugin';
import { SOURCE_ID, AWAIT_LABEL } from '../src/constants';

import { payload } from './fixtures/greno-payload';

describe('geosearch-core:OpenCageGeoSearchPlugin', () => {
  it(`should return the plugin`, () => {
    expect(theModule).to.be.an('object');
    expect(theModule.OpenCageGeoSearchPlugin).to.be.a('function');
    expect(theModule.OpenCageGeoSearchPlugin()).to.be.an('object');
    const plugin = theModule.OpenCageGeoSearchPlugin();
    expect(plugin.getSources).to.be.a('function');
    expect(plugin.onSubmit).to.be.a('function');
    expect(plugin.onReset).to.be.a('function');
    expect(plugin.onReset()).not.to.throw;
    expect(plugin.onSubmit()).not.to.throw;
  });
  it(`should return an empty result with an empty query`, async () => {
    const plugin = theModule.OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: '' });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });
  it(`should return an empty result with a query to really short`, async () => {
    const plugin = theModule.OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: 'a' });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    const items = result[0].getItems();
    expect(items[0].formatted).to.equal(AWAIT_LABEL);
  });
  it(`should return an empty result with a query to short`, async () => {
    const plugin = theModule.OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: 'aa' });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0].sourceId).to.equal(SOURCE_ID);
    expect(result[0].getItems).to.be.a('function');
    const items = result[0].getItems();
    expect(items).to.be.an('array');
    expect(items.length).to.equal(1);
    expect(items[0]).to.be.an('object');
    expect(items[0].formatted).to.be.a('string');
    expect(items[0].formatted).to.equal(AWAIT_LABEL);
  });
  it(`should return an empty result with a non string query`, async () => {
    const plugin = theModule.OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: 123 });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });
  it('should return an empty result with a fakekey', async () => {
    const plugin = theModule.OpenCageGeoSearchPlugin({
      key: 'fakekey',
    });
    const result = await plugin.getSources({ query: 'lyon' });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });

  describe('with stubs', () => {
    const query = 'greno';
    const url = `https://api.opencagedata.com/geosearch?q=${query}`;

    beforeEach(() => {
      fetchMock.mockGlobal();
      fetchMock.get(url, payload);
    });

    afterEach(() => {
      fetchMock.clearHistory();
      fetchMock.unmockGlobal();
    });

    it('should return results with greno', async () => {
      const plugin = theModule.OpenCageGeoSearchPlugin({
        key: 'a real key',
      });
      // const res = await fetch(url);
      // expect(res.ok).to.be.true;
      const result = await plugin.getSources({ query });
      console.log('the plugin output for autocomplete', result);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].sourceId).to.equal(SOURCE_ID);
      expect(result[0].getItems).to.be.a('function');
      expect(result[0].getItemInputValue).to.be.a('function');
      expect(result[0].onSelect).to.be.a('function');
      expect(result[0].onActive).to.be.a('function');
    });
  });
});
