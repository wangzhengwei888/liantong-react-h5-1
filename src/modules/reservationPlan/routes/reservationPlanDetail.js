import React, {
    Component
} from 'react'
import {withRouter} from 'react-router'
import {ActionSheet, Flex, WingBlank, Button, Icon, WhiteSpace, Slider, DatePicker, List,Toast} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import * as reservationPlanApi from '../api/index';
import './reservationPlan.less';

const Item = List.Item;

class ReservationPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : {}
        }
    }


    componentWillMount() {
    }


    componentDidMount() {
        let orderId = this.props.location.query.orderId;
        console.log(orderId)
        reservationPlanApi.getOrderInfo({order_id:orderId}).then(result => {
            console.log(result)
            if(result.code == 0){
                this.setState({
                    data:result.data
                })
            }else{
                Toast.fail(result.msg)
            }
        })
    }




    render() {
        const data =this.state.data;
        let status = this.state.data && this.state.data.status;
        let statusStr = status == 1 ? "未处理" : status == 2 ? "预约中"  : status == 3 ? "提速中" : status == 4 ? "完成" : "取消"
        return (
            <div className='reservationPlanBox'>
                <div className="fix-scroll hastitle hasbottom">
                    <div style={{height: '100%', overflow: 'auto',backgroundColor:"#fff"}}>
                        <WingBlank>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item className="leftLine" style={{textAlign: 'left'}}>计划详情</Flex.Item>
                            </Flex>
                            <List>
                                <Item extra={data.plan_num}>计划编号</Item>
                                <Item extra={data.product_num}>专线号码</Item>
                                <Item extra={data.create_at}>创建时间</Item>
                                <Item extra={data.stime}>生效时间</Item>
                                <Item extra={data.etime}>失效时间</Item>
                                <Item extra={data.select_speed}>签约速率</Item>
                                <Item extra={data.sub_speed}>预约速率</Item>
                                <Item extra={statusStr}>当前状态</Item>
                                <Item extra={data.total_price}>计划总价</Item>
                                <Item extra={data.plan_num}>购买人员</Item>
                            </List>


                        </WingBlank>
                    </div>

                </div>


            </div>
        )

    }
}


export default withRouter(ReservationPlanDetail);