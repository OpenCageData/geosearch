export const checkResponseStatus = (res) => {
  if (res.ok) {
    return res;
  }
  const err = new Error(
    `The HTTP status of the reponse: ${res.status} (${res.statusText})`
  );
  err.status = res.status;
  err.statusText = res.statusText;

  throw err;
};

export default { checkResponseStatus };
