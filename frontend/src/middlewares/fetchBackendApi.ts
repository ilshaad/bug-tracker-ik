import axios from "axios";

export default () => {
  let baseUrl: string = `${process.env.BACKEND_URL}`;

  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 4000,
  });

  return instance;
};
