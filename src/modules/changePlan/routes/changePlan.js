import React, {
    Component
} from 'react'
import {withRouter} from 'react-router'
import {Button, Flex, WingBlank, WhiteSpace, Icon} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import * as changePlanApi from '../api/index';
import './changePlan.less';


class ChangePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }


    componentWillMount() {
    }


    componentDidMount() {
        let user_id = sessionStorage.getItem("userInfo") && JSON.parse(sessionStorage.getItem("userInfo")).user_id || "1"
        changePlanApi.getLineSpeeded({user_id: user_id}).then(result => {
            console.log(result)
            this.setState({
                data: result.data
            })
        })
    }


    //去帮助中心
    goHelp = () => {
        console.log("aaaaaaaaaa")
    }
    goChangeDetail = (list) => {
        this.props.router.push("/changeDetail?orderId=" + list.order_id + "&curr_speed=" + list.curr_speed+"&line_id="+ list.line_id+"" )
    }

    render() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        const data = this.state.data
        console.log(data)
        return (
            <div className='changePlanBox'>

                <div className='wx-my'>
                    <Flex className="reservationPlanTitle" style={{justify: 'end'}}>
                        <Flex.Item></Flex.Item>
                        <Flex.Item style={{fontSize: '0.34rem'}}>变更计划</Flex.Item>
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
                                <span style={{verticalAlign: "middle", marginLeft: '20px'}}>欢迎您:{userInfo && userInfo.name}</span>
                            </Flex.Item>
                        </Flex>
                        <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                            <Flex.Item className="leftLine" style={{textAlign: 'left'}}>客户基础信息</Flex.Item>
                        </Flex>
                        {/*<Flex style={{justify: 'bettwen', lineHeight: '0.6rem',paddingLeft:'30px'}}>*/}
                        {/*<Flex.Item style={{textAlign: 'left'}}>企业名称:ssssss</Flex.Item>*/}
                        {/*</Flex>*/}
                        <Flex style={{justify: 'bettwen', lineHeight: '0.6rem', paddingLeft: '30px'}}>
                            <Flex.Item style={{textAlign: 'left'}}>客户联系人:{userInfo && userInfo.contact}</Flex.Item>
                        </Flex>
                    </WingBlank>
                </div>
                <WhiteSpace/>
                <div className="fix-scroll hastitle hasbottom" style={{marginTop: '4.2rem', padding: 0}}>
                    <div style={{height: '100%', overflow: 'auto', backgroundColor: "#fff"}}>
                        <WingBlank>
                            <div>
                                <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                    <Flex.Item className="leftLine" style={{textAlign: 'left'}}>已提速专线</Flex.Item>
                                </Flex>
                                {data.length > 0 ? data.map((list, index) => {
                                    let status = list.order_status;
                                    let statusStr = status == 1 ? "未处理" : status == 2 ? "预约中"  : status == 3 ? "提速中" : status == 4 ? "完成" : "取消"
                                    return <Flex style={{justify: 'bettwen', lineHeight: '1rem'}} key={index}>
                                        <Flex.Item style={{textAlign: 'left', flex: "5"}}>专线号:{list.line_name}</Flex.Item>
                                        <Flex.Item style={{textAlign: 'right', flex: '3'}}>状态:{statusStr}</Flex.Item>
                                        <Flex.Item style={{textAlign: 'right', flex: "2"}}>
                                            <Button size="small"
                                                    onClick={() =>this.goChangeDetail(list)}
                                                    style={{
                                                        float: "right",
                                                        backgroundColor: "#fb9334",
                                                        color: "#fff"
                                                    }}>详情</Button>
                                        </Flex.Item>
                                    </Flex>
                                }) : ""}


                            </div>
                        </WingBlank>
                    </div>

                </div>
            </div>
        )

    }
}

export default withRouter(ChangePlan);