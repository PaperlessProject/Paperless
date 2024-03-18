import { fetchUtil } from "./fetchUtil";

export const start = async (tool: string) => {
    const res = await fetchUtil(`https://api.ilovepdf.com/v1/start/${tool}`, {
            
        })
        
};
