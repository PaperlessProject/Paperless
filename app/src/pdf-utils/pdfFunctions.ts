import { fetchUtil } from './fetchUtil';

export const getAuthToken = async (publicKey: string) => {
  const res = await fetchUtil('https://api.ilovepdf.com/v1/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ public_key: publicKey }),
  });
  return res.token;
};

export const start = async (tool: string, bearerToken: string) => {
  const res = await fetchUtil(`https://api.ilovepdf.com/v1/start/${tool}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applications/json',
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return res;
};

export const upload = async (
  server: string,
  task: string,
  file: File,
  bearerToken: string
) => {
  const res = await fetch(`https://${server}/v1/upload/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({ task, file }),
  });
  return res;
};

export const process = async (
  server: string,
  task: string,
  tool: string,
  files: File,
  bearerToken: string
) => {
  const res = await fetchUtil(`https://${server}/v1/process`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({ task, tool, files }),
  });
  return res;
};

export const download = async (
  server: string,
  task: string,
  bearerToken: string
) => {
  const res = await fetchUtil(`https://${server}/v1/download/${task}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return res;
};
