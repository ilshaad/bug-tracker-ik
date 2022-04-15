import "./App.css";
import React from "react";
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
import AuthenticateRoute from "./components/AuthenticateRoute";

// Layout component for non authenticated routes (eg error page) because AuthentcateRoute sets Layout component to all protected routes
import Layout from "./components/Layout";

// ! /fetch & /reduxtest routes are dummy routes, remove afterwards
const App = () => {
  const Dashboard_Auth = AuthenticateRoute(() => <Dashboard />);
  const CreateTicket_Auth = AuthenticateRoute(() => <CreateTicket />);
  const TicketList_Auth = AuthenticateRoute(() => <TicketList />);
  const ViewTicket_Auth = AuthenticateRoute(() => <ViewTicket />);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard_Auth />} />
        <Route path="/createticket" element={<CreateTicket_Auth />} />
        <Route path="/ticketlist" element={<TicketList_Auth />} />
        <Route path="/viewticket/:ticketid" element={<ViewTicket_Auth />} />
        <Route
          path="/fetch"
          element={
            <Layout>
              <TestingRequest />
            </Layout>
          }
        />
        <Route
          path="/reduxtest"
          element={
            <Layout>
              <ReduxTest />
            </Layout>
          }
        />

        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  ); /*END return */
}; /*END App component*/

// const mapStateToProps = (iKstateP, iKownPropsP) => {
// return {};
// }; /*END mapStateToProps */

// const mapDispatchToProps = (iKdispatchP, iKownPropsP) => {
// return {
//     iKactionCreatorDispatch1: () => iKdispatchP( iKactionCreator1() )
// };
// }; /*END mapDispatchToProps */

// export default connect(mapStateToProps, mapDispatchToProps) (App);

// App.propTypes = {
// kProps1: PropTypes.number,
// kProps2: PropTypes.arrayOf( PropTypes.string )
// }; /*END App.propTypes */

// App.defaultProps = {
// kProps1: 23,
// kProps2: ["iKdefaultValue2"]
// }; /*END App.defaultProps */

export default App;
