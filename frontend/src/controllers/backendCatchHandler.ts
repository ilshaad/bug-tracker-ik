// catch handler response for axios fetch to backend api
// iK for convience & DRY
function catchHandler(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    throw error.response.data;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    throw error.response.data;
  }
  console.log(error.config);
}

export default catchHandler;
