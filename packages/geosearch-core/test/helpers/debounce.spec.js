import { expect, describe, it } from 'vitest';
import sinon from 'sinon';

import { debouncePromise } from '../../src/helpers/debounce';

describe('geosearch-core:debounce', () => {
  it('should call the function after 500ms', (done) => {
    const fn = sinon.spy();
    const debounced = debouncePromise(fn, 500);
    debounced();
    expect(fn.calledOnce).to.be.false;
    setTimeout(() => {
      expect(fn.calledOnce).to.be.true;
      done();
    }, 600);
  });

  it('should clear the timeout before running the function', (done) => {
    const fn = sinon.spy();
    const debounced = debouncePromise(fn, 200);
    debounced();
    expect(fn.calledOnce).to.be.false;
    setTimeout(() => {
      debounced();
      expect(fn.calledOnce).to.be.false;
      done();
    }, 100);
  });
});
