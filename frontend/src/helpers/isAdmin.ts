// only admin has full access to the app & can change anything within the app
// ***31@mail.*** is your admin email address

export default (auth0UserEmail: string) => {
  return auth0UserEmail === process.env.ADMIN_EMAIL ? true : false;
};
