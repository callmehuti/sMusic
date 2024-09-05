import api from "./config.api";

interface IParam {
  id?: string;
}

export const get = async (endpoint: string, params: IParam = {}) => {
  try {
    let url = endpoint;
    if (Object.keys(params).length > 0) {
      url += "?";
      Object.keys(params).forEach((key: string, index: number) => {
        if (index === 0) {
          url += `${key}=${params[key as keyof typeof params]}`;
        } else {
          url += `&${key}=${params[key as keyof typeof params]}`;
        }
      });
    }
    const res = await api.get(url);
    // const data = await JSON.parse(res.data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// localhost:3300/login
export const post = async (endpoint: string, body = {}) => {
  try {
    const bodyParser = JSON.stringify(body);
    const res = await api.post(endpoint, bodyParser);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
    // const err = error as AxiosError;
    // console.log(error);
    // if (err.response?.data) {
    //   throw err.response.data;
    // }?
  }
};

/*
 */

// http://localhost:3300/ root
// product?params=params
// endpoint = product
// params = after ?
