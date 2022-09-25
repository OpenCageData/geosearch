export const uniqByKeepFirst = (a, key) => {
  const seen = new Set();
  return a.filter((item) => {
    const k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
};

export default { uniqByKeepFirst };
