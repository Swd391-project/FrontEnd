import axios from "axios";

import { config } from "../../config";

export const getRequest = async (path: string, token?: string) => {
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await axios.get(`${config.BACKEND_API}/api${path}`);
  const paginationHeader = response.headers["x-pagination"];
  let paginationData = null;

  if (paginationHeader) {
    try {
      paginationData = JSON.parse(paginationHeader);
    } catch (error) {
      console.error("Error parsing pagination header:", error);
    }
  }

  return {
    data: response.data,
    headers: paginationData,
  };
};

export const getRequestImage = async (path: string): Promise<string> => {
  const response = await axios.get(path, {
    responseType: "blob",
  });

  const blob = response.data;
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert blob to base64 string"));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(blob);
  });
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

export const postImageRequest = async (path: string, requestBody: FormData) => {
  const response = await axios.post(
    `${config.BACKEND_API}/api${path}`,
    requestBody,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const putRequest = async (
  path: string,
  token: string,
  requestBody: Record<string, unknown>,
) => {
  const { data } = await axios.put(
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

export const deleteRequest = async (path: string, token: string) => {
  const { data } = await axios.delete(`${config.BACKEND_API}/api${path}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};
