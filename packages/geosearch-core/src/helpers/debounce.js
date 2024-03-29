export const debouncePromise = (fn, time) => {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    return new Promise((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time);
    });
  };
};

export default { debouncePromise };
