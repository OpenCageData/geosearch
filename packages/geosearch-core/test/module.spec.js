const { expect } = require('chai');
const ThisModule = require('../src/index');

describe('geosearch-core:index', () => {
  it(`returns an object`, () => {
    expect(ThisModule).to.exist;
  });
});
