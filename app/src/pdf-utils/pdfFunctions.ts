import { fetchUtil } from "./fetchUtil";

export const getAuthToken = async (publicKey: string) => {
  const res = await fetchUtil("https://api.ilovepdf.com/v1/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_key: publicKey }),
  });
  return res.token;
};

export const start = async (tool: string, bearerToken: string) => {
  const res = await fetchUtil(`https://api.ilovepdf.com/v1/start/${tool}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return res;
};

export const uploadFiles = async (
  serverUrl: string,
  taskId: string,
  formData: FormData,
  bearerToken: string,

) => {
  formData.append("task", taskId);


  const response = await fetch(`https://${serverUrl}/v1/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to upload file to iLovePDF: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
};
