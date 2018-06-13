import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from 'container/appView';

import reservationPlan from './reservationPlan';
import reservationDetail from './reservationPlanDetail';
function con (){
    console.log("aaaaaaaa")
}

const routesConfig = (<Route path="/" component={App}>
        <IndexRoute component={reservationPlan}
                    showBottomBar={true}
                    showTitle={false}
                    selectedTab='reservationPlan'/>
        <Route path='/reservationDetail' component={reservationDetail} title='预约提速详情' />
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
