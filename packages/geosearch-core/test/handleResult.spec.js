import { expect } from 'chai';
import { handleResult } from '../src/handleResult';
import { SOURCE_ID } from '../src/constants';

describe('geosearch-core:handleResult', () => {
  it('expects `handleResult` to be a function', () => {
    expect(handleResult).to.be.a('function');
  });
  it('expects `handleResult` to return an array', () => {
    expect(handleResult({ results: [] })).to.be.an('array');
  });
  const aa = {
    results: [
      {
        formatted: 'Aachen, North Rhine-Westphalia, Germany',
        name: 'Aachen',
      },
      {
        formatted: 'Aarhus, Central Denmark Region, Denmark',
        name: 'Aarhus',
      },
      {
        formatted: 'Aargau, Switzerland',
        name: 'Aargau',
      },
      {
        formatted: 'Aalborg, North Denmark Region, Denmark',
        name: 'Aalborg',
      },
      {
        formatted: 'Aast, Pyr\u00e9n\u00e9es-Atlantiques, France',
        name: 'Aast',
      },
    ],
  };
  it('expects `handleResult(aa)` to match expectations', () => {
    const result = handleResult(aa);
    expect(result).to.have.lengthOf(1);
    const one = result[0];
    expect(one).to.be.an('object');
    expect(one.sourceId).to.equal(SOURCE_ID);
    expect(one.getItems).to.be.a('function');
    expect(one.getItems()).to.deep.equal(aa.results);
    expect(one.getItemInputValue).to.be.a('function');
    const aarhus = {
      formatted: 'Aarhus, Central Denmark Region, Denmark',
      name: 'Aarhus',
    };
    expect(one.getItemInputValue({ item: aarhus })).to.equal(aarhus.formatted);
  });
  const bb = {
    results: [
      {
        formatted: 'Aachen, North Rhine-Westphalia, Germany',
        name: 'Aachen',
      },
      // duplicated value for `formatted`
      {
        formatted: 'Aachen, North Rhine-Westphalia, Germany',
        name: 'Aachen 2',
      },
      {
        formatted: 'Aarhus, Central Denmark Region, Denmark',
        name: 'Aarhus',
      },
      {
        formatted: 'Aargau, Switzerland',
        name: 'Aargau',
      },
      {
        formatted: 'Aalborg, North Denmark Region, Denmark',
        name: 'Aalborg',
      },
      {
        formatted: 'Aast, Pyr\u00e9n\u00e9es-Atlantiques, France',
        name: 'Aast',
      },
    ],
  };
  it('expects `handleResult(bb)` to match expectations', () => {
    const result = handleResult(bb);
    expect(result).to.have.lengthOf(1);
    const one = result[0];
    expect(one).to.be.an('object');
    expect(one.sourceId).to.equal(SOURCE_ID);
    expect(one.getItems()).to.deep.equal(aa.results);
  });
  it('expects `handleResult(aa)` to match template expectations', () => {
    const noResultsFR = 'Pas de résultat.';
    const aarhus = {
      formatted: 'Aarhus, Central Denmark Region, Denmark',
      name: 'Aarhus',
    };

    const result = handleResult(aa, { noResults: noResultsFR });
    expect(result).to.have.lengthOf(1);
    const one = result[0];
    expect(one.templates).to.be.an('object');
    const { templates } = one;
    expect(templates.item).to.be.a('function');
    expect(templates.noResults).to.be.a('function');
    expect(templates.footer).to.be.a('function');
    expect(templates.item({ item: aarhus })).to.equal(aarhus.formatted);
    expect(templates.noResults()).to.equal(noResultsFR);
  });
});
