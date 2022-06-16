# Bug Tracker app

###### Frontend & Backend build (PERN stack)

#### Indroduction:

Welcome to my Bug Tracker app.
A bug tracker (aka Issue Tracker) is a developer's social board for discovering bugs that may be plaguing application's.
Developers can:

- Report a new bug they may have found.
- Assign themselves (or assign another developer) to fix the bug.
- Ask for help.
- Commenting.
- and more...

#### Main technologies used:

- React
- Typescript / Javascript
- Node.js / Express
- PostgreSql
- Redux
- Webpack
- Auth0
- Sass / Bootstrap
- Docker
- Github Actions (CI/CD)
- Heroku
- etc...

#### Get Started:

You will need setup a couple of things setup before you can run the app within your local device:

**Prerequisite**

- Your data setup within your postreSql database (eg. Heroku PostreSql)
- Auth0 account
  - Setup an app url redirect to `localhost:9000`
- Installed Docker on your device (optional...)

**Step 1**

#### My Mission:

To create a fully functional bug tracker. Which will involved CRUD database operation both on the client and server side.

##### iK? crud operation / data exchange / responsive design / CI/CD pipeline /

- wanted to test these main technologies: webpack SSR / react-router / postresql (heroku version) / Auth0 / docker-compose / typescript / nodejs / expressjs

- test out a webpack SSR

  - **too tricky to do & not worth it**

- test a simple full stack app on heroku using docker-compose & ensure it is fetching data as it should

  - **success in createing to containers for heroku but not as one**

- test different routes for the api before it reach the \* route which should be for the client only

  - **pointless because webpack SSR was not a success**

  - this will let me know if webpack ssr requires react-router or not
    - **void as webpack SSR was a failure**

- test out postgresql (heroku version in particular)

  - **success & now I can use this from now on**

- test Auth0 library for authentication for both CS & SS
  - **success & failure: Auth0 works as separate for frontend & backend but I could not get webpack SSR to work so they cannot access each other using the same url origns**

---

- psql (heroku version)
  - pg (npm package)
- Auth0
  - @auth0/auth0-react (for frontend)
  - express-openid-connect (for backend)
- webpack react (frontend)
- nodejs / expressjs (backend)
- cors
- docker-compose
- deployed on heroku
- github actions

-SASS / Bootstrap
-webpack (for frontend)
-docker (docker-compose)
-redux (redux-react & redux toolkit)
-React-Router
-Auth0 (authentication)
-SQL
-Heroku
-REST API (axios)
-cors
-react-helmet
-Formik
-DOMPurity
-React-bootstrap
-Github Actions

- -PWA (workbox) = DID NOT USE
  -web app
  -works offline

#### version11: fullstack / Postresql (heroku version) / Auth0 / webpack react frontend / express backend / docker-compose

## Get Started

## To note

- you will need to set up .env for backend psql (heroku) database connection for `/db` route
- BIM Auth0 login will work as long as you have not dismiss their application on your account
- frontend has only home route
- backend has multiple routes: `/` , `/db`, `/dummyroute` , `/profile`, `/login`, `/logout`

## Status

- 20220315: _successul in some things but not all. Created a full working fullstack for frontend & backend. They are seen as separate containers within Heroku though_
  - frontend:
    - success:
      - _working request to SS `/db` route which collects psql database_
      - _Auth0 on the browser as SPA which is separate from the SS using the login & logout buttons_
    - failed:
      - _webpack SSR is too tricky to do & could not get it to work unless you are prepared to do a lot of tweaking & changes. So for now I will probably stick to next.js for SSR_
      - _could not get Auth0 to work by using SS `/login` route because of cors. You either have to use SSR or separately which I had to do for this repo_
      - _decided it was not worth using react-router since webpack SSR was not working_
      - _ditched typescript as planned_
  - backend:
    - success:
      - _psql (heroku) database working using `pg` package_
      - _Auth0 working on SS too separated from CS_
      - _set multiple routes access using cors_
    - failed:
      - _cannot give access to CS for SS Auth0 route login as Auth0 needs a orign url & CS will from a different route & deny access_

---

---

---

### [rechadsalma/bug-tracker-ik](https://github.com/RechadSalma/bug-tracker-ik)
