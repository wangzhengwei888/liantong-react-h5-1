import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router'
import {Button, Toast, Flex, WingBlank, WhiteSpace, Modal} from 'antd-mobile';
import {common} from 'common';
import * as loginApi from '../api/index';
import {Img} from 'commonComponent';
import './home.less';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userInfo: {},
            data: []
        };
    }

    componentWillMount() {
        Toast.loading();
    }

    componentDidMount() {
        // 当前url参数
        let token = this.props.location.query.token || sessionStorage.getItem("token");
        sessionStorage.setItem("token", token)
        //登录状态
        if (!token) {
            Modal.alert("提示", "未登录", [{
                text: "返回", onPress: function () {
                    // alert("返回上一页")
                }
            }])

        } else {
            //获取用户信息
            loginApi.getLoginStatus({token: token}).then(result => {
                console.log(result)
                if (result.code == 0) {
                    sessionStorage.setItem("userInfo", JSON.stringify(result.data.user))
                    sessionStorage.setItem("token", result.data.token)
                    this.setState({
                        userInfo: result.data.user
                    })
                    //获取专线信息
                    loginApi.getLineList({user_id: 1}).then(result => {
                        console.log(result)
                        if (result.code == 0) {
                            this.setState({
                                data: result.data
                            })
                            let hlwLineNoArr = [];
                            result.data.map((list, index) => {
                                hlwLineNoArr.push(list.hlwLineNo)
                            })
                            sessionStorage.setItem("hlwLineNoArr", JSON.stringify(hlwLineNoArr))
                            sessionStorage.setItem("lineArr", JSON.stringify(result.data))
                        } else {
                            Toast.info(result.msg)
                        }
                    })
                } else {
                    Toast.info(result.msg,3,()=>{
                        Modal.alert("提示", "未登录", [{
                            text: "返回", onPress: function () {
                                // alert("返回上一页")
                            }
                        }])
                    })
                }
            })

        }

    }


    //去帮助中心
    goHelp = () => {
        console.log("aaaaaaaaaa")
    }
    //去预约
    goReservation = (list) => {
        sessionStorage.setItem("line_id",list.line_id)
        sessionStorage.setItem("curr_speed",list.curr_speed)
        sessionStorage.setItem("enterId",list.enterId)
        sessionStorage.setItem("hlwLineNo",list.hlwLineNo)
        window.location.href = "reservationPlan.html"
    }

    render() {
        const data = this.state.data;
        return (
            <div>
                <div className='wx-my'>
                    <Flex className="reservationPlanTitle" style={{justify: 'end'}}>
                        <Flex.Item></Flex.Item>
                        <Flex.Item style={{fontSize: '0.34rem'}}>我的专线</Flex.Item>
                        <Flex.Item onClick={this.goHelp}><img style={{
                            width: '0.4rem',
                            height: '0.4rem',
                        }} src={"./assets/img/ico/help.png"}>
                        </img></Flex.Item>
                    </Flex>
                    <WingBlank className="userInfo">
                        <Flex style={{justify: 'start', height: '1rem'}}>
                            <Flex.Item style={{textAlign: 'left'}}>
                                <img style={{
                                    width: '0.8rem',
                                    height: '0.8rem',
                                    verticalAlign: "middle"
                                }} src={"./assets/img/userimg.png"}>
                                </img>
                                <span style={{
                                    verticalAlign: "middle",
                                    marginLeft: '20px'
                                }}>欢迎您:{this.state.userInfo && this.state.userInfo.name}</span>
                            </Flex.Item>
                        </Flex>
                        <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                            <Flex.Item className="leftLine" style={{textAlign: 'left'}}>客户基础信息</Flex.Item>
                        </Flex>
                        <Flex style={{justify: 'bettwen', lineHeight: '0.6rem', paddingLeft: '30px'}}>
                            <Flex.Item
                                style={{textAlign: 'left'}}>客户联系人:{this.state.userInfo && this.state.userInfo.contact}</Flex.Item>
                        </Flex>
                    </WingBlank>
                </div>
                <WhiteSpace/>
                <WingBlank className="leftLine" style={{lineHeight: '0.9rem', height: '0.9rem'}}>专线列表</WingBlank>
                {data.length > 0 ?
                    data.map((list, index) => {
                        return <div className="rowBox" key={index} style={{padding: '0 15px'}}>
                            <WingBlank>
                                <Flex style={{justify: "between", lineHeight: '0.8rem'}}>
                                    <Flex.Item>专线号码:{list.hlwLineNo}</Flex.Item>
                                    <Flex.Item>当前速率:{list.curr_speed}</Flex.Item>
                                </Flex>
                                <Flex style={{justify: "between", lineHeight: '0.8rem'}}>
                                    <Flex.Item>A端地址:{list.a_addr_desc}</Flex.Item>
                                    <Flex.Item>Z端地址:{list.z_addr_desc}</Flex.Item>
                                </Flex>
                                <Flex style={{justify: 'bettwen', lineHeight: '0.8rem'}}>
                                    <Flex.Item>企业名称:{list.enterName}</Flex.Item>
                                </Flex>
                                <Flex style={{justify: "between", lineHeight: '0.8rem'}}>
                                    <Flex.Item>当前状态: {list.curr_status == "1" ? "未提速" : "已提速"}</Flex.Item>
                                    <Flex.Item><Button size="small"
                                                       onClick={() => this.goReservation(list)}
                                                       style={{
                                                           width: '2rem',
                                                           float: "right",
                                                           backgroundColor: "#fb9334",
                                                           color: "#fff"
                                                       }}>预约提速</Button></Flex.Item>
                                </Flex>
                            </WingBlank>
                        </div>
                    }) : null
                }
            </div>

        )
    }
}

export default withRouter(Home);
