import React, {
    Component
} from 'react'
import {withRouter} from 'react-router'
import {Button, Flex, WingBlank, WhiteSpace, Icon, List, Slider, DatePicker,Toast} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import * as changePlanApi from '../api/index';
import './changePlan.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

const Item = List.Item;

const zhNow = moment().locale('zh-cn').utcOffset(8 + 4);
const maxZhNow = moment().add(30, 'days').locale('zh-cn').utcOffset(8 + 4);
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}


class changeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            startDate: zhNow,
            maxDate: maxZhNow,
            endDate: zhNow,
            timeRing: 0,
            line_id: '',
            curr_speed:10,
            min_curr_speed:10,
            hlwLineNo:"请选择",
            UnitPrice:0
        }
    }


    componentWillMount() {
    }


    componentDidMount() {
        let orderId = this.props.location.query.orderId;
        let curr_speed = this.props.location.query.curr_speed;
        let line_id = this.props.location.query.line_id;
        console.log(orderId)
        this.setState({
            min_curr_speed: Number(curr_speed) + 10,
            curr_speed: Number(curr_speed) + 10,
            line_id
        });
        changePlanApi.getOrderInfo({order_id: orderId}).then(result => {
            console.log(result)
            if (result.code == 0) {
                this.setState({
                    data: result.data
                })
            } else {
                Toast.fail(result.msg)
            }
        })
        changePlanApi.getOrderRule().then(result=>{
            this.setState({
                UnitPrice:result.data.price
            })
            sessionStorage.setItem("UnitPrice",result.data.price)
        })
    }

    onSubmit = () => {
        let obj = {
            order_id:this.props.location.query.orderId,
            select_speed: this.state.curr_speed,
            increase_time: moment(this.state.startDate).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(this.state.endDate).format('YYYY-MM-DD HH:mm:ss'),
            curr_time: Date.parse(new Date()),
            line_id: this.state.line_id,
            user_id:sessionStorage.getItem("userInfo") && JSON.parse(sessionStorage.getItem("userInfo")).user_id || 1,
            day:this.state.timeRing,
            price:this.state.UnitPrice,
        }
        console.log(obj)

        if(obj.select_speed == ""){
            Toast.info("请选择提速专线速率")
            return
        }
        if(obj.increase_time == ""){
            Toast.info("请选择开始时间")
            return
        }
        if(obj.end_time == ""){
            Toast.info("请选择结束时间")
            return
        }
        if(this.state.timeRing <= 0){
            Toast.info("请选择时长")
            return
        }
        changePlanApi.setOrderEstimate(obj, 'ContentTypeForm').then(result => {
            console.log(result)
            if(result.code == 0){
                window.location.href = "/reservationPlan.html#/reservationDetail?orderId="+ result.data.order_id
            }else{
                Toast.fail(result.msg)
            }

        })

    }

    goBack = () => {
        this.props.router.goBack()
    }

    changeSulv = (value) => {
        this.setState({
            curr_speed: value
        })
    }
    onStartChange = (startDate) => {
        let timeRing = this.state.timeRing;
        if (this.state.endDate) {
            timeRing = Math.ceil(this.state.endDate.diff(startDate, 'days', true))
        }
        console.log(timeRing)
        this.setState({
            startDate,
            maxDate: moment(startDate).add(30, 'days'),
            timeRing
        });
    }
    onEndChange = (endDate) => {
        let timeRing = Math.ceil(endDate.diff(this.state.startDate, 'days', true))
        this.setState({
            endDate,
            timeRing
        });
        console.log(timeRing)
    }

    render() {
        let endMinDate = moment.max(this.state.endDate, this.state.startDate);
        const data = this.state.data
        let status = this.state.data && this.state.data.status;
        let statusStr = status == 1 ? "未处理" : status == 2 ? "预约中"  : status == 3 ? "提速中" : status == 4 ? "完成" : "取消"
        let unixTimestamp = new Date( data.create_at ) ;
        let create_at = unixTimestamp.toLocaleString();
        let unixTimestamp1 = new Date( data.stime ) ;
        let stime = unixTimestamp1.toLocaleString();
        let unixTimestamp2 = new Date( data.etime ) ;
        let etime = unixTimestamp2.toLocaleString();
        return (
            <div className='changeDetailBox'>
                <WingBlank>
                    <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                        <Flex.Item className="leftLine" style={{textAlign: 'left'}}>计划详情</Flex.Item>
                    </Flex>
                    <List className="my-list">
                        <Item extra={data.plan_num}>计划编号</Item>
                        <Item extra={data.product_num}>专线号码</Item>
                        <Item extra={create_at}>创建时间</Item>
                        <Item extra={stime}>生效时间</Item>
                        <Item extra={etime}>失效时间</Item>
                        <Item extra={data.select_speed}>签约速率</Item>
                        <Item extra={data.sub_speed}>预约速率</Item>
                        <Item extra={statusStr}>当前状态</Item>
                        <Item extra={data.total_price}>计划总价</Item>
                        <Item extra={data.plan_num}>购买人员</Item>
                    </List>
                    <WhiteSpace/>
                    <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                        <Flex.Item className="leftLine" style={{textAlign: 'left'}}>修改速率</Flex.Item>
                        <Flex.Item style={{textAlign: 'right'}}>{`${this.state.curr_speed}M`}</Flex.Item>
                    </Flex>
                    <div className="sliderBox">
                        <Slider
                            style={{height: '0.8rem'}}
                            defaultValue={this.state.min_curr_speed}
                            min={this.state.min_curr_speed}
                            max={100}
                            step={10}
                            onChange={this.changeSulv}
                            onAfterChange={this.changeSulv}
                        />
                        <Flex className="sliderNum">
                            <Flex.Item style={{textAlign: "left"}}>{this.state.min_curr_speed}M</Flex.Item>
                            {/*<Flex.Item>50M</Flex.Item>*/}
                            <Flex.Item style={{textAlign: 'right'}}>100M</Flex.Item>
                        </Flex>
                    </div>
                    <WhiteSpace/>
                    <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                        <Flex.Item className="leftLine" style={{textAlign: 'left'}}>修改时间</Flex.Item>
                    </Flex>
                    <List>
                        <DatePicker className="forss"
                                    mode="datetime"
                                    onChange={this.onStartChange}
                                    value={this.state.startDate}
                                    minDate={zhNow}
                        >
                            <List.Item arrow="down">选择开始日期</List.Item>
                        </DatePicker>
                    </List>
                    <List>
                        <DatePicker className="forss"
                                    mode="datetime"
                                    onChange={this.onEndChange}
                                    value={endMinDate}
                                    minDate={this.state.startDate}
                                    maxDate={this.state.maxDate}
                        >
                            <List.Item arrow="down">选择结束日期</List.Item>
                        </DatePicker>
                    </List>
                    <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                        <Flex.Item className="leftLine" style={{textAlign: 'left'}}>计划配置</Flex.Item>
                    </Flex>
                    <WingBlank>
                        <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                            <Flex.Item style={{textAlign: 'left'}}>预约时长:{this.state.timeRing}</Flex.Item>
                            <Flex.Item style={{textAlign: 'right'}}>价格合计:{this.state.timeRing * this.state.curr_speed * this.state.UnitPrice}</Flex.Item>
                        </Flex>
                    </WingBlank>
                    <Flex style={{justify: 'bettwen', lineHeight: '1rem', margin: '0.3rem 0'}}>
                        <Flex.Item><Button onClick={this.onSubmit}
                                           style={{backgroundColor: "#fb9233", borderRadius: "50px", color: "#fff"}}>立即修改</Button></Flex.Item>
                        <Flex.Item><Button onClick={this.goBack}
                                           style={{backgroundColor: "#fb9233", borderRadius: "50px", color: "#fff"}}>取消计划</Button></Flex.Item>
                    </Flex>
                </WingBlank>


            </div>
        )

    }
}

export default withRouter(changeDetail);