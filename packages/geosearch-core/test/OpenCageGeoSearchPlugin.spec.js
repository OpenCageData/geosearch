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
  it(`should return an empty result`, async () => {
    const plugin = OpenCageGeoSearchPlugin.OpenCageGeoSearchPlugin();
    const result = await plugin.getSources({ query: '' });
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });
});
