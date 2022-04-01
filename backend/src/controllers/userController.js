const psqlDb = require("../database/db");

/**
 * POST /api/user/profile
 * user have logged on
 * get user profile from psql tickets_table
 * return only email / name / role / created_on data of the user profile
 * * client must send user email json data
 */
exports.getUserProfile = (req, res) => {
  // collect client json email address of user who logged on
  const { email } = req.body;

  const sqlQuery = `SELECT email, name, role, created_on FROM users_table WHERE email = '${email}';`;

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error when fetching user profile from database",
        err,
      });
    }

    // if result.rowcount is 0 than it means psql ticket did not find user, & inform client
    if (result.rowCount === 0) {
      res.status(400).json({
        success: false,
        msg: "error occured when finding user within database, perhaps user does not exist",
        err,
      });
      return;
    }

    res.json({ success: true, data: result.rows });
  });
}; //END getUserProfile controller

/**
 * POST /api/user/signup
 * user signs up
 * * client must send user details in json
 * create new user within psql users_table
 * No need to send back profile because client will save it within redux, but SS must send back confirmation
 */
exports.signUpUser = (req, res) => {
  // collect client send req json of user details
  // ! you might not need to save password depending out Auth0 works
  const { user_id, email, password, name, role, created_on } = req.body;

  const sqlQuery = `INSERT INTO users_table (user_id, email, password, name, role, created_on) VALUES ('${user_id}', '${email}', '${password}', '${name}', '${role}', '${created_on}');`;

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when creating new user within the database. Perhaps user already exist, check user email / user_id keys",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql ticket did not create new user, & inform client
    if (result.rowCount === 0) {
      res.status(400).json({
        success: false,
        msg: "error occured when creating new user within database, perhaps user already exist",
        err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: "successful update to the database",
    });
  });
}; //END signUpUser controller

// TODO include comments about this controller & test if the route is working according before doing the logic
exports.deleteUserAccount = (req, res) => {
  // const sqlQuery = `UPDATE tickets_table SET title = '${title}', description = '${description}', priority = '${priority}', assigned_user = '${assigned_user}', status = '${status}', app_name = '${app_name}', app_version = '${app_version}' WHERE ticket_id = '69';`;

  const sqlQuery = "SELECT * FROM users_table;";

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when deleting user within database",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql user did not delete, & inform client
    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        msg: "error occured when deleting user within database",
        err,
      });
      return;
    }

    // res.status(200).json({
    //   success: true,
    //   msg: "successful update to the database",
    // });

    res.json({ success: true, data: result });
  });
}; //END deleteUserAccount controller
