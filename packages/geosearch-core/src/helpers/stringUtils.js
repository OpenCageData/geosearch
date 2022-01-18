const isString = (value) => {
  const type = typeof value;
  return type === 'string';
};

module.exports = { isString };
