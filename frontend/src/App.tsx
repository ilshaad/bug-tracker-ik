import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ! these are dummy routes & remove when you done
import TestingRequest from "./components/TestingRequest";
import ReduxTest from "./pages/ReduxTest";

/**page routes */
import HomeLogin from "./pages/HomeLogin";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketList from "./pages/TicketList";
import ViewTicket from "./pages/ViewTicket";
import NotFound from "./pages/NotFound";

// HOC function for Auth0 protected routes
import AuthenticateRoute from "./components/AuthenticateRoute";

// ! /fetch & /reduxtest routes are dummy routes, remove afterwards
const App = () => {
  const Dashboard_Auth = AuthenticateRoute(() => <Dashboard />);
  const CreateTicket_Auth = AuthenticateRoute(() => <CreateTicket />);
  const TicketList_Auth = AuthenticateRoute(() =>  <TicketList />;
  
  // TODO create the other protected routes
  const TicketList_Auth = AuthenticateRoute(() =>  <TicketList />;

  return (
    <BrowserRouter>
      <h1>app component header v13</h1>
      <Routes>
        <Route path="/" element={<HomeLogin />} />
        <Route path="/dashboard" element={<Dashboard_Auth />} />
        <Route path="/createticket" element={<CreateTicket_Auth />} />

        {/* <Route path="/ticketlist" element={<TicketList coolio={777} />} /> */}

        <Route path="/ticketlist" element={<TicketList_Auth />} />

        <Route path="/viewticket/:ticketid" element={<ViewTicket />} />
        <Route path="/fetch" element={<TestingRequest />} />
        <Route path="/reduxtest" element={<ReduxTest />} />
        <Route path="*" element={<NotFound />} />
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
