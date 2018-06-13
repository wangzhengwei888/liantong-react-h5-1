import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from 'container/appView';

import changePlan from './changePlan';
import changeDetail from './changeDetail';

const routesConfig = (<Route path="/" component={App}>
        <IndexRoute component={changePlan}
                    showBottomBar={true}
                    showTitle={false}
                    selectedTab='changePlan'/>
        <Router path="/changeDetail"
                showTitle={true}
                showBottomBar={true}
                title={"变更计划"}
                component={changeDetail}></Router>
    </Route>
)

function Routes({history}) {
    return (
        <Router history={history}>
            {routesConfig}
        </Router>
    );
}

export default Routes;
