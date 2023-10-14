const baseURL = process.env.REACT_APP_apibaseURL;
export const postCall = async (enpoint, object) => {
  try {
    const resp = await fetch(`${baseURL}${enpoint}`, {
      method: "POST",
      body: object,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return resp;
  } catch (err) {
    
    return { resultCode: 501 };
  }
};
