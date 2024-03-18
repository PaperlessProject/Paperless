import { fetchUtil } from "./fetchUtil";

export const start = async (tool: string) => {
    try {
        const res = await fetchUtil(`https://api.ilovepdf.com/v1/start/${tool}`)
        console.log(res);
        return res
  } catch (err) {
    console.error(err)
  }
};
