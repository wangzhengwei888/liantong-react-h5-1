import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from 'container/appView';

import my from './myOrder';
import MyOrderList from './myOrderList';

const routesConfig = (<Route path="/" component={App}>
        <IndexRoute component={my}
                    showBottomBar={true}
                    showTitle={false}
                    selectedTab='myOrder'/>
        <Route path='/orderList/(:type)' component={my} showTitle={false} showBottomBar={true}/>
        <Route path='/myOrderList/(:orderId)' component={MyOrderList} showTitle={true} title="订单列表" showBottomBar={false}/>
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
