import React, {Component} from 'react'
import {TabBar, Icon,Badge} from 'antd-mobile';
import {fetch,common} from 'common';

import "./BottomBar.less"

const IconClass = ({url}) => {
    return <div style={{
        width: '0.50rem',
        height: '0.50rem',
        background: `url(${url}) center center /  0.44rem 0.44rem no-repeat`
    }}
    />
}


class BottomBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '',
        }
    }

    changeTab = (type) => {
        this.setState({
            selectedTab: type
        });
        if (type == 'home') {
            window.location.href = 'home.html';
        } else if (type == 'myOrder') {
            window.location.href = 'myOrder.html';
        }else if (type == 'reservationPlan') {
            window.location.href = 'reservationPlan.html';
        }else if (type == 'changePlan') {
            window.location.href = 'changePlan.html';
        }
    }


    componentDidMount(){

    }

    render() {
        return (
            <TabBar
                tintColor='#fa9432'
                className="wx-tab-bar"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    title="我的专线"
                    key="我的专线"
                    selected={window.location.pathname.includes("/home.html")&&window.location.hash=="#/"}
                    icon={
                        <IconClass url={'./assets/img/ico/home1.png'}></IconClass>
                    }
                    selectedIcon={
                        <IconClass url={'./assets/img/ico/home.png'}></IconClass>
                    }
                    onPress={() => this.changeTab('home')}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="预约计划"
                    key="预约计划"
                    selected={window.location.pathname.includes("/reservationPlan.html")&&window.location.hash=="#/"}
                    icon={
                        <IconClass url={'./assets/img/ico/yuyue1.png'}></IconClass>
                    }
                    selectedIcon={
                        <IconClass url={'./assets/img/ico/yuyue.png'}></IconClass>
                    }
                    onPress={() => this.changeTab('reservationPlan')}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="变更计划"
                    key="变更计划"
                    selected={window.location.pathname.includes("/changePlan.html")&&window.location.hash=="#/"}
                    icon={
                        <IconClass url={'./assets/img/ico/change1.png'}></IconClass>
                    }
                    selectedIcon={
                        <IconClass url={'./assets/img/ico/change.png'}></IconClass>
                    }
                    onPress={() => this.changeTab('changePlan')}
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <IconClass url={'./assets/img/ico/order1.png'}></IconClass>
                    }
                    selectedIcon={
                        <IconClass url={'./assets/img/ico/order.png'}></IconClass>
                    }
                    selected={window.location.pathname.includes("/myOrder.html")&&window.location.hash=="#/"}
                    title="我的订单"
                    key="我的订单"
                    onPress={() => this.changeTab('myOrder')}
                >
                </TabBar.Item>
            </TabBar>
        );
    }
}

export default BottomBar;
