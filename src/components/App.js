/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router';

import Bundle from '../core/Bundle';

/* eslint-disable */
import loadLayout from 'bundle-loader?lazy!../components/Layout/Layout';
import loadLogin from 'bundle-loader?lazy!../pages/login/Login';
import loadRegister from 'bundle-loader?lazy!../pages/register/Register';
import loadNotFound from 'bundle-loader?lazy!../pages/notFound/NotFound';
/* eslint-enable */

import LayoutComponent from '../components/Layout/Layout';

const LoginBundle = Bundle.generateBundle(loadLogin);
const RegisterBundle = Bundle.generateBundle(loadRegister);
const NotFoundBundle = Bundle.generateBundle(loadNotFound);


const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType),
  };

  static defaultProps = {
    context: null,
  };


  static contextTypes = {
    router: PropTypes.any,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    // fixme. Temporary solution until redux is integrated
    return this.props.context || this.context.router.staticContext;
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/layout" />} />
        <Route path="/layout" component={LayoutComponent} />
        <Route path="/login" exact component={LoginBundle} />
        <Route path="/register" exact component={RegisterBundle} />
        <Route component={NotFoundBundle} />
      </Switch>
    );
  }

}

export default withRouter(App);
