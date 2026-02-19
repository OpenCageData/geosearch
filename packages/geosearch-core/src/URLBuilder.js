export const buildURL = (url, options) => {
  let result = url;
  if (!options) return result;
  if (options.limit) {
    result = `${result}&limit=${encodeURIComponent(options.limit)}`;
  }
  if (options.countrycode) {
    result = `${result}&countrycode=${encodeURIComponent(options.countrycode)}`;
  }
  if (options.language) {
    result = `${result}&language=${encodeURIComponent(options.language)}`;
  }
  if (options.bounds) {
    result = `${result}&bounds=${encodeURIComponent(options.bounds)}`;
  }
  if (options.proximity) {
    result = `${result}&proximity=${encodeURIComponent(options.proximity)}`;
  }

  return result;
};

export default { buildURL };
