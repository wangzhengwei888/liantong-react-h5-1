import React, {
    Component
} from 'react'
import {withRouter} from 'react-router'
import {ActionSheet, Flex, WingBlank, Button, Icon, WhiteSpace, Slider, DatePicker, List,Toast} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import * as reservationPlanApi from '../api/index';
import './reservationPlan.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

const zhNow = moment().locale('zh-cn').utcOffset(8 + 4);
const maxZhNow = moment().add(30, 'days').locale('zh-cn').utcOffset(8 + 4);
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}


class ReservationPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideTips: false,
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
        // 当前url参数 专线ID 当前速率 专线号码
        const line_id = sessionStorage.getItem("line_id");
        const min_curr_speed = Number(sessionStorage.getItem("curr_speed")) + 10;
        const curr_speed = Number(sessionStorage.getItem("curr_speed")) + 10;
        const hlwLineNo = sessionStorage.getItem("hlwLineNo");
        if(line_id && min_curr_speed && curr_speed && hlwLineNo){
            this.setState({
                line_id,
                min_curr_speed,
                curr_speed,
                hlwLineNo
            })
        }

        reservationPlanApi.getOrderRule().then(result=>{
            this.setState({
                UnitPrice:result.data.price
            })
            sessionStorage.setItem("UnitPrice",result.data.price)
        })

    }

    showActionSheet = () => {
        const BUTTONS =  JSON.parse(sessionStorage.getItem("hlwLineNoArr"))

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                message: '请选择提速专线',
                maskClosable: true,
                'data-seed': 'logId',
                wrapProps,
            },
            (buttonIndex) => {
                console.log(buttonIndex)
                if (buttonIndex >= 0) {
                    let lineArr = JSON.parse(sessionStorage.getItem("lineArr"))
                    let checkedLine = lineArr.filter((list,index)=>{
                        return list.hlwLineNo == BUTTONS[buttonIndex]
                    })
                    console.log(checkedLine)
                    this.setState({
                        hlwLineNo: checkedLine[0].hlwLineNo,
                        line_id: checkedLine[0].line_id,
                        min_curr_speed: Number(checkedLine[0].curr_speed) + 10,
                        curr_speed: Number(checkedLine[0].curr_speed) + 10,
                    });
                }

            });
    }
    hideTips = () => {
        this.setState({
            hideTips: !this.state.hideTips
        })
    }
    changeSulv = (value) => {
        this.setState({
            curr_speed: value
        })
    }
    onSubmit = () => {
        let obj = {
            select_speed: this.state.curr_speed,
            increase_time: moment(this.state.startDate).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(this.state.endDate).format('YYYY-MM-DD HH:mm:ss'),
            curr_time: Date.parse(new Date()),
            line_id: this.state.line_id,
            user_id:JSON.parse(sessionStorage.getItem("userInfo")).user_id,
            day:this.state.timeRing,
            price:this.state.UnitPrice,
        }
        console.log(obj)
        if(obj.line_id == ""){
            Toast.info("请选择提速专线")
            return
        }
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
        reservationPlanApi.setOrderEstimate(obj, 'ContentTypeForm').then(result => {
            console.log(result)
            if(result.code == 0){
               this.props.router.push("/reservationDetail?orderId=" + result.data.order_id)
            }else{
                Toast.fail(result.msg)
            }

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
    //去帮助中心
    goHelp = () => {
        console.log("aaaaaaaaaa")
    }


    render() {
        let endMinDate = moment.max(this.state.endDate, this.state.startDate);
        console.log(this.state.min_curr_speed)
        return (
            <div className='reservationPlanBox'>
                <Flex className="reservationPlanTitle" style={{justify: 'end'}}>
                    <Flex.Item></Flex.Item>
                    <Flex.Item style={{fontSize: '0.34rem'}}>预约计划</Flex.Item>
                    <Flex.Item onClick={this.goHelp}><img style={{
                        width: '0.4rem',
                        height: '0.4rem',
                    }} src={"./assets/img/ico/help.png"}>
                    </img></Flex.Item>
                </Flex>
                <div className="fix-scroll hastitle hasbottom">
                    <div style={{height: '100%', overflow: 'auto', backgroundColor: "#fff"}}>
                        <WingBlank>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item className="leftLine" style={{textAlign: 'left'}}>专线基础信息:</Flex.Item>
                            </Flex>
                            <Flex>
                                <Flex.Item style={{textAlign: 'left'}}>专线号码</Flex.Item>
                                <Flex.Item style={{textAlign: 'right'}}>
                                    <span onClick={this.showActionSheet}>{this.state.hlwLineNo}</span>
                                    <Icon type="down" style={{verticalAlign: 'middle', marginLeft: "0.2rem"}}></Icon>
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace/>
                            <div>
                                <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                    <Flex.Item className="leftLine" style={{textAlign: 'left'}}>提速规则说明:</Flex.Item>
                                    <Flex.Item style={{textAlign: 'right'}} onClick={this.hideTips}>
                                        <Icon type={this.state.hideTips ? "down" : "up"}
                                              style={{verticalAlign: 'middle', marginLeft: "0.2rem"}}></Icon>
                                    </Flex.Item>
                                </Flex>
                                <div className="addTips" style={{display: this.state.hideTips ? "none" : "block"}}>
                                    <p>1 按天批价，升速计划不能重叠;</p>
                                    <p>2 提前4小时预约当天，不足一个自然天按自然天计费;</p>
                                    <p>3 一次计划选择不能超过30天（含)</p>
                                    <p>4 预约升速计划在30（含)自然天内</p>
                                    <p>5 前后预约计划必须间隔4小时</p>
                                </div>
                            </div>
                            <WhiteSpace/>
                            <div>
                                <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                    <Flex.Item className="leftLine" style={{textAlign: 'left'}}>选择提速速率:</Flex.Item>
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
                            </div>
                            <WhiteSpace/>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item className="leftLine" style={{textAlign: 'left'}}>预约时间</Flex.Item>
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
                                <Flex.Item><Button onClick={this.onSubmit} style={{
                                    backgroundColor: "#fb9233",
                                    borderRadius: "50px",
                                    color: "#fff"
                                }}>立即提速</Button></Flex.Item>
                            </Flex>
                        </WingBlank>
                    </div>

                </div>


            </div>
        )

    }
}


export default withRouter(ReservationPlan);