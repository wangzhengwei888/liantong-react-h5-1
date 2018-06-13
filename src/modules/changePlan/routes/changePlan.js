import React, {
  Component
} from 'react'
import {withRouter} from 'react-router'
import {Button,Flex,WingBlank,WhiteSpace,Icon} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import './changePlan.less';





class ChangePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  componentWillMount() {}



  componentDidMount() {}


    //去帮助中心
    goHelp = () =>{
        console.log("aaaaaaaaaa")
    }
    goChangeDetail = () =>{
      this.props.router.push("/changeDetail")
    }
  render() {
    return(
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
                            <span style={{verticalAlign: "middle", marginLeft: '20px'}}>欢迎您:wwwww</span>
                        </Flex.Item>
                    </Flex>
                    <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                        <Flex.Item className="leftLine" style={{textAlign: 'left'}}>客户基础信息</Flex.Item>
                    </Flex>
                    <Flex style={{justify: 'bettwen', lineHeight: '0.6rem',paddingLeft:'30px'}}>
                        <Flex.Item style={{textAlign: 'left'}}>企业名称:ssssss</Flex.Item>
                    </Flex>
                    <Flex style={{justify: 'bettwen', lineHeight: '0.6rem',paddingLeft:'30px'}}>
                        <Flex.Item style={{textAlign: 'left'}}>客户联系人:22222222</Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
            <WhiteSpace/>
            <div className="fix-scroll hastitle hasbottom" style={{marginTop: '4.2rem',padding:0}}>
                <div style={{height: '100%', overflow: 'auto',backgroundColor:"#fff"}}>
                    <WingBlank>
                        <div>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item className="leftLine" style={{textAlign: 'left'}}>已提速专线</Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                            <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                                <Flex.Item style={{textAlign: 'left',flex:"2"}}>专线号:11111111111</Flex.Item>
                                <Flex.Item style={{textAlign: 'right', flex:'1'}}>状态:提速中</Flex.Item>
                                <Flex.Item style={{textAlign: 'right',flex:"1"}}>
                                    <Button size="small"
                                            onClick={this.goChangeDetail}
                                            style={{
                                                float: "right",
                                                backgroundColor: "#fb9334",
                                                color: "#fff"
                                            }}>详情</Button>
                                </Flex.Item>
                            </Flex>
                        </div>
                    </WingBlank>
                </div>

            </div>
        </div>
        )

  }
}

export default withRouter(ChangePlan);