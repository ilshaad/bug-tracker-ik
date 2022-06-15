// only admin has full access to the app & can change anything within the app
// returns true if admin user logged on otherwise false for everyone else
// Using Auth0 to verify the user email & comparing the email to the admin
// ***31@mail.*** is your admin email address
import { useAuth0, User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function isAdmin_hook() {
  const [isAdminBoolean, setIsAdminBoolean] = useState(false);
  const { user } = useAuth0<User>();

  useEffect(() => {
    if (user?.email === process.env.ADMIN_EMAIL) {
      setIsAdminBoolean(true);
    }

    return () => setIsAdminBoolean(false);
  }, [useAuth0]);

  if (!isAdminBoolean) {
    return false;
  }

  return true;
}
