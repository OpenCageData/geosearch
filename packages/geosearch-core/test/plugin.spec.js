const { expect } = require('chai');
const TheModule = require('../src/index');
const ThePlugin = require('../src/OpenCageGeoSearchPlugin');

describe('geosearch-core:index', () => {
  it(`returns the module`, () => {
    expect(TheModule).to.be.an('object');
    expect(TheModule.OpenCageGeoSearchPlugin).to.be.a('function');
  });
});
describe('geosearch-core:OpenCageGeoSearchPlugin', () => {
  it(`returns the plugin`, () => {
    expect(ThePlugin).to.be.an('object');
    expect(ThePlugin.OpenCageGeoSearchPlugin).to.be.a('function');
  });
});
