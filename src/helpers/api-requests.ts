import axios from "axios";

import { config } from "../../config";

export const getRequest = async (
  path: string,
  token: string,
  query?: Record<string, unknown>,
) => {
  const { data } = await axios.get(`${config.BACKEND_API}/api${path}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    params: query,
  });

  return data;
};

export const postRequest = async (
  path: string,
  token: string,
  requestBody: Record<string, unknown>,
) => {
  const { data } = await axios.post(
    `${config.BACKEND_API}/api${path}`,
    requestBody,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const patchRequest = async (
  path: string,
  token: string,
  requestBody: Record<string, unknown>,
) => {
  const { data } = await axios.patch(
    `${config.BACKEND_API}/api${path}`,
    requestBody,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};
