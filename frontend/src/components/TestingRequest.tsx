import React from "react";
import fetchBackendApi from "../middlewares/fetchBackendApi";

export default function App(): JSX.Element {
  // useEffect(() => {
  //   console.log("ik env: ", process.env.NODE_ENV);

  //   fetch("http://localhost:4000/")
  //     .then((x) => {
  //       // console.log(x.json());
  //       return x.json();
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }, []);

  const requestButton = () => {
    // fetch(`${process.env.BACKEND_URL_DEV}/api/ticket/list`)
    //   .then((x) => {
    //     return x.json();
    //   })
    //   .then((y) => console.log(y));

    fetchBackendApi()
      .get("/api/ticket/list")
      .then((x) => console.log(x.data));
  };

  return <button onClick={requestButton}>click request testing</button>;
}
