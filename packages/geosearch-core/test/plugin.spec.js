import { expect } from 'chai';
import TheModule, { OpenCageGeoSearchPlugin } from '../src/index';

describe('geosearch-core:index', () => {
  it(`returns the module`, () => {
    expect(TheModule).to.be.an('object');
    expect(OpenCageGeoSearchPlugin).to.be.a('function');
  });
});
