const { expect } = require('chai');
const { uniqByKeepFirst } = require('../../src/helpers/arrayUtils');

describe('geosearch-core:Array', () => {
  it('keeps only first value with `u`', () => {
    const data = [
      { a: 1, u: 1 },
      { a: 2, u: 2 },
      { a: 3, u: 3 },
      { a: 4, u: 1 },
      { a: 5, u: 2 },
      { a: 6, u: 3 },
    ];
    const expected = [
      { u: 1, a: 1 },
      { u: 2, a: 2 },
      { u: 3, a: 3 },
    ];
    const actual = uniqByKeepFirst(data, (item) => item.u);
    expect(actual).to.eql(expected);
  });
});
