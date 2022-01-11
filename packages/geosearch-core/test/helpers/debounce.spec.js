const { expect } = require('chai');
const sinon = require('sinon');

const { debouncePromise } = require('../../src/helpers/debounce');

describe('geosearch-core:debounce', () => {
  it('debounce', (done) => {
    const fn = sinon.spy();
    const debounced = debouncePromise(fn, 500);
    debounced();
    expect(fn.calledOnce).to.be.false;
    setTimeout(() => {
      expect(fn.calledOnce).to.be.true;
      done();
    }, 600);
  });
});
