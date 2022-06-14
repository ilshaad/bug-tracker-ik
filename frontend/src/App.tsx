import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ! these are dummy routes & remove when you done
import TestingRequest from "./components/TestingRequest";
import ReduxTest from "./views/ReduxTest";

/**page routes */
import Dashboard from "./views/Dashboard"; // * shares the / rul with login screen route
import CreateTicket from "./views/CreateTicket";
import TicketList from "./views/TicketList";
import ViewTicket from "./views/ViewTicket";
import NotFound from "./views/NotFound";

// HOC function for Auth0 protected routes
// * It is also the login screen route which share the / url with dashboard
import AuthenticateRoute_HOC from "./components/AuthenticateRoute_HOC";

// Layout component for non authenticated routes (eg error page) because AuthentcateRoute sets Layout component to all protected routes
import Layout from "./components/Layout";

import { useAppDispatch } from "./models/hooks";
import { get_ticketList_actions } from "./models/reducers/tickets_slice";
import LoadingScreen_foldingPage from "./components/LoadingScreen_foldingPage";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // when page first loads fetch all tickets list for redux ticket reducer store to collect
    // still fetches in login screen so not ideal, but decide to leave it for now, you can optimize this later if you wish
    dispatch(get_ticketList_actions());
  }, []);

  // ! /fetch & /reduxtest routes are dummy routes, remove afterwards
  // authenticate routes when user can view when they login/signup
  const Dashboard_Auth = AuthenticateRoute_HOC(() => <Dashboard />);
  const CreateTicket_Auth = AuthenticateRoute_HOC(() => <CreateTicket />);
  const TicketList_Auth = AuthenticateRoute_HOC(() => <TicketList />);
  const ViewTicket_Auth = AuthenticateRoute_HOC(() => <ViewTicket />);

  // routes only for development mode to testing your fetch request crud
  const devRoutes = () => {
    if (process.env.NODE_ENV !== "production") {
      return [
        <Route
          path="/fetch"
          element={
            <Layout>
              <TestingRequest />
            </Layout>
          }
        />,
        <Route
          path="/reduxtest"
          element={
            <Layout>
              <ReduxTest />
            </Layout>
          }
        />,
      ];
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard_Auth />} />
        <Route path="/createticket" element={<CreateTicket_Auth />} />
        <Route path="/ticketlist" element={<TicketList_Auth />} />
        <Route path="/viewticket/:ticketid" element={<ViewTicket_Auth />} />

        {/** !! UNCOMMENT FOR DEVMODE TO DISPLAY OTHER ROUTES FOR TESTING
         * also uncomment the devModeLinks() callback in components/RouteList_anchorLinks.tsx to get the links to work
         */}
        {/* {devRoutes()} */}

        {/* <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        /> */}

        {/* ! TEST THE FOLD PAGE WITH THE LOADING SCREEN */}
        {/* <Route path="/foldpage" element={<LoadingScreen_foldingPage />} /> */}

        <Route path="*" element={<Dashboard_Auth />} />
      </Routes>
    </BrowserRouter>
  ); /*END return */
}; /*END App component*/

export default App;
