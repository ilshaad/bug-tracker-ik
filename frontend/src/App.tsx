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

// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <h1>Hello, React Router!</h1>
//         <Routes>
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }
// const App = props => {

//     /*iK add more <Route> for path pages if needed */
//     return (
//         <BrowserRouter>
//             <Switch>
//                 <Route path="/" component={KhomePage} />
//                 <Route component={KerrorPage1} />
//             </Switch>
//         </BrowserRouter>
//     ); /*END return */
// }; /*END App component*/

// /*iK simple App setup */

// ! /fetch & /reduxtest routes are dummy routes, remove afterwards
const App = () => {
  return (
    <BrowserRouter>
      <h1>app component header v5</h1>
      <Routes>
        <Route path="/" element={<HomeLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createticket" element={<CreateTicket />} />
        <Route path="/ticketlist" element={<TicketList />} />
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
