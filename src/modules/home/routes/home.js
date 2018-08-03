import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router'
import {Button, Toast, Flex, WingBlank, ListView, WhiteSpace} from 'antd-mobile';
import {common} from 'common';
import * as loginApi from '../api/index';
import {Img} from 'commonComponent';
import './home.less';

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];

function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}


class Home extends Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            isLoading: true
        };
    }

    componentWillMount() {
        Toast.loading();
    }

    componentDidMount() {
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false
            });
        }, 600);
        //登录状态
        if(!common.TOKEN){
            loginApi.getLoginStatus({token: common.TOKEN}).then(result => {
                console.log(result)
                if (result.result == 1) {
                    //手机号可用
                    if (result.data == 'success') {
                        return 'success';
                    } else {
                        Toast.info(result.msg)
                        this.setState({isTaggle: false})
                    }
                }
            })
        }else{
            loginApi.getLineList({enter_id: 'ea21def232da'}).then(result => {
                console.log(result)
                if (result.result == 1) {
                    //手机号可用
                    if (result.data == 'success') {
                        return 'success';
                    } else {
                        Toast.info(result.msg)
                        this.setState({isTaggle: false})
                    }
                }
            })
        }

    }

    onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(() => {
            genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    //去帮助中心
    goHelp = () => {
        console.log("aaaaaaaaaa")
    }
    //去预约
    goReservation = () => {
        window.location.href = "reservationPlan.html"
        // this.props.router.replace("reservationPlan.html")
    }

    render() {

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div className="rowBox" key={rowID} style={{padding: '0 15px'}}>
                    <WingBlank>
                        <Flex style={{justify: "between", lineHeight: '0.8rem'}}>
                            <Flex.Item>专线号码:11111</Flex.Item>
                            <Flex.Item>当前速率:222222</Flex.Item>
                        </Flex>
                        <Flex style={{justify: "between", lineHeight: '0.8rem'}}>
                            <Flex.Item>A端地址:22222</Flex.Item>
                            <Flex.Item>Z端地址:2222222</Flex.Item>
                        </Flex>
                        <Flex style={{justify: 'bettwen', lineHeight: '0.8rem'}}>
                            <Flex.Item >企业名称:ssssss</Flex.Item>
                        </Flex>
                        <Flex style={{justify: "between", lineHeight: '0.8rem'}}>
                            <Flex.Item>{`当前状态: ${obj.title}`}</Flex.Item>
                            <Flex.Item><Button size="small"
                                               onClick={this.goReservation}
                                               style={{
                                                   width: '2rem',
                                                   float: "right",
                                                   backgroundColor: "#fb9334",
                                                   color: "#fff"
                                               }}>预约提速</Button></Flex.Item>
                        </Flex>
                    </WingBlank>
                </div>
            );
        };


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
                                <span style={{verticalAlign: "middle", marginLeft: '20px'}}>欢迎您:wwwww</span>
                            </Flex.Item>
                        </Flex>
                        <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                            <Flex.Item className="leftLine" style={{textAlign: 'left'}}>客户基础信息</Flex.Item>
                        </Flex>
                        <Flex style={{justify: 'bettwen', lineHeight: '0.6rem',paddingLeft:'30px'}}>
                            <Flex.Item style={{textAlign: 'left'}}>客户联系人:22222222</Flex.Item>
                        </Flex>
                    </WingBlank>
                </div>
                <WhiteSpace/>
                <WingBlank className="leftLine" style={{lineHeight: '0.9rem', height: '0.9rem'}}>专线列表</WingBlank>
                <div className="fix-scroll hastitle hasbottom" style={{marginTop: '4.6rem', padding: 0}}>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>)}
                        renderRow={row}
                        renderSeparator={separator}
                        style={{
                            height: '100%',
                            overflow: 'auto',
                            padding: "0,0.3rem"
                        }}
                        pageSize={4}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />
                </div>


            </div>

        )
    }
}

export default withRouter(Home);
