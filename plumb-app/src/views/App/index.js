// /**
//  *
//  * App.js
//  *
//  * This component is the skeleton around the actual pages, and should only
//  * contain code that should be seen on all pages. (e.g. navigation bar)
//  *
//  */

// import React from 'react';
// import { Switch, Route } from 'react-router-dom';

// import HomePage from 'containers/HomePage/Loadable';
// import Login from 'containers/Login/Loadable';
// import ForgotPassword from 'containers/ForgotPassword/Loadable';
// import ResetPassword from 'containers/ResetPassword/Loadable';
// import Landing from 'containers/Landing/Loadable';
// import Dashboard from 'containers/Dashboard/Loadable';
// import SignUp from 'containers/Signup/Loadable';

// import NotFoundPage from 'containers/NotFoundPage/Loadable';

// import GlobalStyle from '../../global-styles';
// import DocumentDetails from '../DocDetails';
// import Settings from 'containers/Settings/Loadable';
// import QueueDetails from '../QueueDetails';

// export default function App() {

//   return (
//     <>
//       <Switch>
//         <Route exact path="/" component={Landing} />
//         <Route exact path="/Login" component={Login} />
//         <Route exact path="/Forgot_Password" component={ForgotPassword} />
//         <Route exact path="/reset/:token" component={ResetPassword} />
//         <Route exact path="/document_details/:doc_id" component={DocumentDetails} />
//         <Route exact path="/sign_up" component={SignUp} />
//         <Route exact path="/dashboard" component={Dashboard} />
//         <Route exact path="/settings" component={Settings} />
//         <Route exact path="/queue_details" component={QueueDetails} />
//         {/* <Route exact path="/" component={HomePage} /> */}
//         <Route component={NotFoundPage} />
//       </Switch>
//       <GlobalStyle />
//     </>
//   );
// }

/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage/Loadable';
import Login from '../Login/Loadable';
import ForgotPassword from '../ForgotPassword/Loadable';
import ResetPassword from '../ResetPassword/Loadable';
import Landing from '../Landing/Loadable';
import Dashboard from '../Dashboard/Loadable';
import Account from '../Account/Loadable';
import SignUp from '../Signup/Loadable';

import NotFoundPage from '../NotFoundPage/Loadable';

// import GlobalStyle from '../../global-styles';
import DocumentDetails from '../DocDetails';
import Settings from '../Settings/Loadable';
import QueueDetails from '../QueueDetails';

const Routes = () => {

  console.log("STATUS>>>>",window.navigator.onLine)
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Forgot_Password" component={ForgotPassword} />
        <Route exact path="/reset/:token" component={ResetPassword} />
        <Route exact path="/document_details/:doc_id" component={DocumentDetails} />
        <Route exact path="/sign_up" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/queue_details" component={QueueDetails} />
        <Route exact path="/account" component={Account} />
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route component={NotFoundPage} />
      </Switch>
      {/* <GlobalStyle /> */}
    </>
  );   
}

export default Routes;
