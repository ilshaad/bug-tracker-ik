import "./App.css";
import React from "react";
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider, connect, ReactReduxContext } from 'react-redux';
// import ReduxThunk from 'redux-thunk';
// import axios from 'axios';
// import DOMPurify from 'dompurify';

// import KerrorPage1 from '../ziK-Tools/kError-pages/KerrorPage1.js';
// import KhomePage from '../kHomePage/KhomePage.js';

// const App = props => {
//      // console.log( props );

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
const App = (props: unknown) => {
  console.log(props);

  return (
    <div className="AppComponent">iK App working tsx:v01</div>
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
