import backendApi_fetchInstance from "./backendApi_fetchInstance";
import { userSignup_type } from "../helpers/backendFetch_types";
import catchHandler from "./backendCatchHandler";

/**exported controllers on this file:
 * post_getUserProfile
 * post_userSignup
 * delete_deleteUser
 */

/**
 * * Get user profile data
 * returns promise object with user data
 *
 * Backend api:
 * POST /api/user/profile
 * user have logged on
 * get user profile from psql tickets_table
 * response with only email / name / role / created_on data of the user profile
 * * client must send user email json data
 */
export const post_getUserProfile = (email: string) => {
  return backendApi_fetchInstance()
    .post("/api/user/profile", { email: email })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      catchHandler(error);
    });
};
/**fetch example
const dummyEmail: string = "v1@mail.com";

// post user login email & recieve user profile
post_getUserProfile(dummyEmail)
  .then((data) => console.log(data))
  .catch((error) => {
    console.log(error);
  });
*/

/**
 * * Post user signup data to backend api
 * return promise object with confirmation
 *
 * Backend api:
 * POST /api/user/signup
 * user signs up
 * * client must send user details in json
 * create new user within psql users_table
 * No need to send back profile because client will save it within redux, but SS must send back confirmation
 */

// ! delete after Pieces
// type userSignup_type = {
//   user_id: string;
//   email: string;
//   name: string;
//   role: string;
//   created_on: string;
// };

export const post_userSignup = ({
  user_id,
  email,
  name,
  role,
  created_on,
}: userSignup_type) => {
  return backendApi_fetchInstance()
    .post("/api/user/signup", { user_id, email, name, role, created_on })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      catchHandler(error);
    });
};
/** fetch example
    const user = {
      user_id: "4444",
      email: "client@mail.com",
      name: "clientname",
      role: "Nonadmin",
      created_on: "2022-04-15",
    };

    post_userSignup(user)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
 */

/**
 * * User deletes the user account profile
 * return promis object with confirmation
 *
 * Backend api:
 * DELETE /api/user/profile
 * delete user account profile from the psql users_table
 * * client must send user email addreass in json
 * confirm user account profile has been deleted
 */
export const delete_deleteUser = (email: string) => {
  return backendApi_fetchInstance()
    .delete("/api/user/profile", { data: { email } })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      catchHandler(error);
    });
};
/** fetch example
    const email = "client@mail.com";

    delete_user(email)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
 */
