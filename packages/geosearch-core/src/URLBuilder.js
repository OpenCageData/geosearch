const buildURL = (url, options) => {
  let result = url;
  if (!options) return result;
  // if (options.key) {
  //   result = `${result}&key=${options.key}`;
  // }
  if (options.limit) {
    result = `${result}&limit=${options.limit}`;
  }
  if (options.countrycode) {
    result = `${result}&countrycode=${options.countrycode}`;
  }
  if (options.language) {
    result = `${result}&language=${options.language}`;
  }
  if (options.bounds) {
    result = `${result}&bounds=${options.bounds}`;
  }

  return result;
};

module.exports = { buildURL };
