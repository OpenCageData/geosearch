const { expect } = require('chai');
// fetch polyfill
require('isomorphic-unfetch');

const OpenCageGeoSearchPlugin = require('../src/OpenCageGeoSearchPlugin');

describe('geosearch-core:OpenCageGeoSearchPlugin', () => {
  it(`should return the plugin`, () => {
    expect(OpenCageGeoSearchPlugin).to.be.an('object');
    expect(OpenCageGeoSearchPlugin.OpenCageGeoSearchPlugin).to.be.a('function');
    expect(OpenCageGeoSearchPlugin.OpenCageGeoSearchPlugin()).to.be.an(
      'object'
    );
    const plugin = OpenCageGeoSearchPlugin.OpenCageGeoSearchPlugin();
    expect(plugin.getSources).to.be.a('function');
    expect(plugin.onSubmit).to.be.a('function');
    expect(plugin.onReset).to.be.a('function');
    expect(plugin.onReset()).not.to.throw;
    expect(plugin.onSubmit()).not.to.throw;
  });
  it(`should return an empty result with an empty query`, async () => {
    const plugin = OpenCageGeoSearchPlugin.OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: '' });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });
  it(`should return an empty result with a query to short`, async () => {
    const plugin = OpenCageGeoSearchPlugin.OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: 'aa' });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });
  it(`should return an empty result with a non string query`, async () => {
    const plugin = OpenCageGeoSearchPlugin.OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: 123 });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });
  it('should return an empty result with a fakekey', async () => {
    const plugin = OpenCageGeoSearchPlugin.OpenCageGeoSearchPlugin({
      key: 'fakekey',
    });
    const result = await plugin.getSources({ query: 'lyon' });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });
});
