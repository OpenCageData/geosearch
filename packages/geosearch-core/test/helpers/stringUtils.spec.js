import { expect } from 'chai';
import { isString } from '../../src/helpers/stringUtils';

describe('geosearch-core:Strings', () => {
  it(`should return true when the value is 'a'`, () => {
    expect(isString('a')).to.be.true;
  });

  it(`should return false when the value is an object`, () => {
    expect(isString({ a: 'a' })).to.be.false;
  });

  it(`should return false when the value is a number`, () => {
    expect(isString(1)).to.be.false;
  });

  it(`should return false when the value is null`, () => {
    expect(isString(null)).to.be.false;
  });

  it(`should return false when the value is undefined`, () => {
    expect(isString()).to.be.false;
    expect(isString(undefined)).to.be.false;
  });

  it(`should return false when the value is an Array`, () => {
    expect(isString([1, 2, 3])).to.be.false;
    expect(isString(['a', 'b', 'c'])).to.be.false;
  });
});
