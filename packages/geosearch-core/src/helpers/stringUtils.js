export const isString = (value) => {
  const type = typeof value;
  return type === 'string';
};

export default { isString };
