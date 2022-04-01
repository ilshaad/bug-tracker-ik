const userRoute = require("express").Router();

// importing user controllers
const {
  getUserProfile,
  signUpUser,
  deleteUserAccount,
} = require("../controllers/userController.js");

/**
 * POST /api/user/profile
 * user have logged on
 * get user profile from psql tickets_table
 * return only email / name / role / created_on data of the user profile
 * * client must send user email json data
 */
userRoute.post("/profile", getUserProfile);

/**
 * POST /api/user/signup
 * user signs up
 * * client must send user details in json
 * create new user within psql users_table
 * No need to send back profile because client will save it within redux, but SS must send back confirmation
 */
userRoute.post("/signup", signUpUser);

// 		- DELETE /api/user/profile = user deletes their account
/**
 * DELETE /api/user/profile
 * delete user account profile from the psql users_table
 * * client must send user email addreass in json
 * confirm user account profile has been deleted
 */
userRoute.delete("/profile", deleteUserAccount);

module.exports = userRoute;
