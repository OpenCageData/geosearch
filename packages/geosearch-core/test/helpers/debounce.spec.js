import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';

import { debouncePromise } from '../../src/helpers/debounce';

describe('geosearch-core:debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call the function after 500ms', () => {
    const fn = vi.fn();
    const debounced = debouncePromise(fn, 500);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(600);
    expect(fn).toHaveBeenCalledOnce();
  });

  it('should clear the timeout before running the function', () => {
    const fn = vi.fn();
    const debounced = debouncePromise(fn, 200);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    debounced();
    expect(fn).not.toHaveBeenCalled();
  });
});
