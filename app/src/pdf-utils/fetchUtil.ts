export const fetchUtil = async (url: string, methods={}) => {
  try {
    console.log(url)
    const res = await fetch(url, methods);
    if (!res.ok) throw new Error(`error: ${res.statusText}`);
    else {
      const parsedRes = await res.json();
      console.log(parsedRes);
      return parsedRes;
    }
  } catch (err) {
    console.error(err);
  }
};
