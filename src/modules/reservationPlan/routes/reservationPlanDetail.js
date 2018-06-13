import React, {
    Component
} from 'react'
import {withRouter} from 'react-router'
import {ActionSheet, Flex, WingBlank, Button, Icon, WhiteSpace, Slider, DatePicker, List} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import './reservationPlan.less';

const Item = List.Item;

class ReservationPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentWillMount() {
    }


    componentDidMount() {
    }




    render() {
        return (
            <div className='reservationPlanBox'>
                <div className="fix-scroll hastitle hasbottom">
                    <div style={{height: '100%', overflow: 'auto',backgroundColor:"#fff"}}>
                        <WingBlank>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item className="leftLine" style={{textAlign: 'left'}}>计划详情</Flex.Item>
                            </Flex>
                            <List>
                                <Item extra={'extra content'}>计划编号</Item>
                                <Item extra={'extra content'}>专线号码</Item>
                                <Item extra={'extra content'}>创建时间</Item>
                                <Item extra={'extra content'}>生效时间</Item>
                                <Item extra={'extra content'}>失效时间</Item>
                                <Item extra={'extra content'}>签约速率</Item>
                                <Item extra={'extra content'}>预约速率</Item>
                                <Item extra={'extra content'}>当前状态</Item>
                                <Item extra={'extra content'}>计划总价</Item>
                                <Item extra={'extra content'}>购买人员</Item>
                            </List>


                        </WingBlank>
                    </div>

                </div>


            </div>
        )

    }
}


export default withRouter(ReservationPlanDetail);