import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

const Profile = () => {
  // const { user, isAuthenticated, isLoading }: any = useAuth0();
  const auth0: any = useAuth0();
  useEffect(() => {
    // console.log(auth0);
  }, []);

  if (auth0.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    auth0.isAuthenticated && (
      <div>
        <img src={auth0.user.picture} alt={auth0.user.name} />
        <h2>{auth0.user.name}</h2>
        <p>{auth0.user.email}</p>
      </div>
    )
  );
};

export default Profile;
