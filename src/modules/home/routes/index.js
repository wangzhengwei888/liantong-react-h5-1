import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from 'container/appView';

import home from './home';


const routesConfig = (
    <Route path="/" component={App}>
        <IndexRoute component={home} showBottomBar={true} showTitle={false} selectedTab='home'/>
    </Route>)

function Routes({history}) {
    return (
        <Router history={history}>
            {routesConfig}
        </Router>
    );
}

export default Routes;
