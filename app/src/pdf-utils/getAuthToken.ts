import { fetchUtil } from "./fetchUtil";

export const getAuthToken = async (publicKey: string) => {
    const res = await fetchUtil("https://api.ilovepdf.com/v1/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({public_key: publicKey})
    });
    return res;
};
