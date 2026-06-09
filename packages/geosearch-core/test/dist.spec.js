import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import fetchMock from 'fetch-mock';

// fetch polyfill
import 'isomorphic-unfetch';

// The Build Step should have generated this file, so we can test the actual dist output
// But the first time the linter runs, it won't exist yet, so we ignore the error

import { OpenCageGeoSearchPlugin } from '../dist/js/opencage-geosearch-core.esm.js';
import { payload } from './fixtures/greno-payload';

const SOURCE_ID = 'opencage';
const AWAIT_LABEL = '. . .';

describe('geosearch-core:dist', () => {
  it('should export OpenCageGeoSearchPlugin as a function', () => {
    expect(OpenCageGeoSearchPlugin).to.be.a('function');
  });

  it('should create a plugin with the expected shape', () => {
    const plugin = OpenCageGeoSearchPlugin();
    expect(plugin).to.be.an('object');
    expect(plugin.getSources).to.be.a('function');
    expect(plugin.onSubmit).to.be.a('function');
    expect(plugin.onReset).to.be.a('function');
  });

  it('should return empty results for an empty query', async () => {
    const plugin = OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: '' });
    expect(result).to.be.an('array').that.is.empty;
  });

  it('should return empty results for a non-string query', async () => {
    const plugin = OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: 123 });
    expect(result).to.be.an('array').that.is.empty;
  });

  it('should return the await label for a short query', async () => {
    const plugin = OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: 'aa' });
    expect(result).to.have.lengthOf(1);
    const items = result[0].getItems();
    expect(items[0].formatted).to.equal(AWAIT_LABEL);
  });

  describe('with stubbed fetch', () => {
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

    it('should return results for a valid query', async () => {
      const plugin = OpenCageGeoSearchPlugin({ key: 'a-real-key' });
      const result = await plugin.getSources({ query });
      expect(result).to.have.lengthOf(1);
      expect(result[0].sourceId).to.equal(SOURCE_ID);
      expect(result[0].getItems).to.be.a('function');
      expect(result[0].getItemInputValue).to.be.a('function');
      expect(result[0].getItems()).to.be.an('array').that.is.not.empty;
    });
  });
});
