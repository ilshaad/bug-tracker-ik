import axios from "axios";

export default () => {
  let baseUrl: string = `${process.env.BACKEND_URL}`;

  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 60000,
  });

  return instance;
};

/**
 * eg of useful export function setup for each fetch request on a different file along with its catch handler mostly setup
 */
//  export const post_getUserProfile = (email: string) => {
//   return backendApi_fetchInstance()
//     .post("/api/user/profile", { email: email })
//     .then((res) => {
//       console.log(res.data);
//       return res.data;
//     })
//     .catch((error) => {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//         return error.response.data;
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in node.js
//         console.log(error.request);
//         return error.response.data;
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//         return error.response.data;
//       }
//       console.log(error.config);
//     });
// };
