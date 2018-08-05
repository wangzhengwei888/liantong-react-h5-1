import React, {
    Component
} from 'react'
import {withRouter} from 'react-router'
import {Button, Flex, Toast, SegmentedControl, WingBlank, ListView, WhiteSpace, Icon, Tabs, List} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import './myOrder.less';
import * as orderApi from '../api/order';

const TabPane = Tabs.TabPane;
const Item = List.Item;


class MyOrderList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.orderList = []
        this.state = {
            isLoading: true,
            data:{}
        }
    }

    componentWillMount() {
        Toast.loading();
    }


    componentDidMount() {
        let line_id = this.props.router.params.line_id
        orderApi.orderEnterList({line_id: line_id}).then(result => {
            if (result.code == 0) {
                this.setState({
                    data: result.data
                })
            } else {
                Toast.fail(result.msg)
            }
        })
    }


    render() {
        const data = this.state.data;

        return (
            <div className='myOrder'>
                <WingBlank>
                    <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                        <Flex.Item className="leftLine" style={{textAlign: 'left'}}>订单列表</Flex.Item>
                    </Flex>
                </WingBlank>
                <div style={{paddingTop: '2px'}}>
                    <div className="fix-scroll hastitle hasbottom" style={{marginTop: '1.7rem', padding: 0}}>
                        {data.length > 0 ? data.map((list,index)=>{
                            let unixTimestamp = new Date( list.buy_date ) ;
                            let commonTime = unixTimestamp.toLocaleString();
                            let status = list.order_status;
                            let statusStr = status == 1 ? "未处理" : status == 2 ? "预约中"  : status == 3 ? "提速中" : status == 4 ? "完成" : "取消"
                            return (
                                <div className="rowBox" key={index} style={{padding: '0 15px',borderBottom: '1px solid #ccc'}}>
                                    <WingBlank>
                                        <Flex style={{lineHeight: '1rem'}}>
                                            <Flex.Item style={{textAlign: 'left'}}>订单编号:{list.order_id}</Flex.Item>
                                            <Flex.Item style={{textAlign: 'right'}}>{statusStr}</Flex.Item>
                                        </Flex>
                                        <Flex style={{lineHeight: '0.6rem', color: "#666"}}>
                                            <Flex.Item style={{textAlign: 'left'}}>产品名称</Flex.Item>
                                            <Flex.Item style={{textAlign: 'right'}}>{list.product_name}</Flex.Item>
                                        </Flex>
                                        <Flex style={{lineHeight: '0.6rem', color: "#666"}}>
                                            <Flex.Item style={{textAlign: 'left'}}>订购日期</Flex.Item>
                                            <Flex.Item style={{textAlign: 'right'}}>{commonTime}</Flex.Item>
                                        </Flex>
                                        <Flex style={{lineHeight: '0.6rem', color: "#666"}}>
                                            <Flex.Item style={{textAlign: 'left'}}>计划总价</Flex.Item>
                                            <Flex.Item style={{textAlign: 'right'}}>{list.total_price}元</Flex.Item>
                                        </Flex>
                                    </WingBlank>
                                </div>
                                )

                        }) : ""}
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(MyOrderList);