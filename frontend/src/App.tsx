import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestingRequest from "./components/TestingRequest";
import Home from "./pages/Home";
import ReduxTest from "./pages/ReduxTest";

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

const App = () => {
  return (
    <BrowserRouter>
      <h1>app component header</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fetch" element={<TestingRequest />} />
        <Route path="/reduxtest" element={<ReduxTest />} />
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
