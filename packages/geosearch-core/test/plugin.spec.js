import { expect } from 'chai';
import TheModule from '../src/index';

describe('geosearch-core:index', () => {
  it(`returns the module`, () => {
    expect(TheModule).to.be.an('object');
    expect(TheModule.OpenCageGeoSearchPlugin).to.be.a('function');
  });
});
