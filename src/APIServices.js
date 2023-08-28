const baseURL = process.env.REACT_APP_apibaseURL;
export const postCall = async (enpoint, object) => {
  const resp = await fetch(`${baseURL}${enpoint}`, {
    method: "POST",
    body: JSON.stringify(object),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return resp;
};
