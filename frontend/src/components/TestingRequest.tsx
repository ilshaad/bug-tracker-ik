import React, { useEffect } from "react";

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
    fetch("https://bug-tracker-backend-ik-202203.herokuapp.com/api/ticket/list")
      .then((x) => {
        return x.json();
      })
      .then((y) => console.log(y));
  };

  return <button onClick={requestButton}>click request testing</button>;
}
