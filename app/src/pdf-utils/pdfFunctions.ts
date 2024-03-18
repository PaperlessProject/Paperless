import { fetchUtil } from './fetchUtil';

export const getAuthToken = async (publicKey: string) => {
  const res = await fetchUtil('https://api.ilovepdf.com/v1/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ public_key: publicKey }),
  });
  return res;
};

export const startTask = async (authToken: string, task: string) => {
  const res = await fetchUtil(`https://api.ilovepdf.com/v1/start/${task}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });
  return res;
};

export const uploadFile = async (authToken: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetchUtil('https://api.ilovepdf.com/v1/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });
  return res;
};

export const processTask = async (authToken: string, task: string) => {
  const res = await fetchUtil(`https://api.ilovepdf.com/v1/process/${task}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });
  return res;
};

export const downloadFile = async (authToken: string, task: string) => {
  const res = await fetchUtil(`https://api.ilovepdf.com/v1/download/${task}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return res;
};
