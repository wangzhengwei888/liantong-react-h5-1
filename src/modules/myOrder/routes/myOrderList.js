import React, {
  Component
} from 'react'
import {withRouter} from 'react-router'
import {Button,Flex,Toast,SegmentedControl, WingBlank, ListView, WhiteSpace,Icon,Tabs,List} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import './myOrder.less';
import * as orderApi from '../api/order';
const TabPane = Tabs.TabPane;
const Item = List.Item;

const oldData = [
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


class MyOrderList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.orderList = []
        this.state = {
            selectedIndex: parseInt(props.params.type) || 0,
            pageNo: 1,
            dataSource: this.ds.cloneWithRows(this.orderList),
            hasMore: false,
            isLoading: true,
            isInit: true,
            dataLength: 0
        }
    }

    componentWillMount() {
        Toast.loading();
    }

    refreshList = ({pageNo}) => {

        // orderApi.orderInfo({pageNo, order_id:'123eda45eda76'}).then(result => {
            this.setState({
                isLoading: true
            });
            // if (result.result == 1) {
                const data = oldData || [];
                const pageSize = 10;
                const dataLength = data.length;
                let hasMore = true;
                if (dataLength < pageSize) {
                    hasMore = false;
                }
                if (this.state.isInit) {
                    this.orderList = data;
                } else {
                    this.orderList = [...this.orderList, ...data];
                }
                this.setState({
                    hasMore,
                    pageNo,
                    dataSource: this.ds.cloneWithRows(this.orderList),
                    dataLength: data.length,
                    isLoading:false
                })
        //     }
        // })
    }



    componentDidMount() {
        this.refreshList({
            pageNo: 1
        });
    }

    onEndReached = (event) => {
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        this.setState({
            isLoading: true,
            isInit: false
        });
        let pageNo = this.state.pageNo + 1;
        this.refreshList({
            pageNo
        });
    }


  render() {
      const {dataSource} = this.state;
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
      const row = (rowData, rowID) => {
          return (
              <div className="rowBox" key={rowID} style={{padding: '0 15px'}}>
                  <WingBlank>
                      <Flex style={{lineHeight:'1rem'}}>
                          <Flex.Item style={{textAlign: 'left'}}>订单编号:222222222</Flex.Item>
                          <Flex.Item style={{textAlign: 'right'}}>已结束</Flex.Item>
                      </Flex>
                      <Flex style={{lineHeight:'0.6rem',color:"#666"}}>
                          <Flex.Item style={{textAlign: 'left'}}>产品名称</Flex.Item>
                          <Flex.Item style={{textAlign: 'right'}}>3333333</Flex.Item>
                      </Flex>
                      <Flex style={{lineHeight:'0.6rem',color:"#666"}}>
                          <Flex.Item style={{textAlign: 'left'}}>订购日期</Flex.Item>
                          <Flex.Item style={{textAlign: 'right'}}>555555555</Flex.Item>
                      </Flex>
                      <Flex style={{lineHeight:'0.6rem',color:"#666"}}>
                          <Flex.Item style={{textAlign: 'left'}}>计划总价</Flex.Item>
                          <Flex.Item style={{textAlign: 'right'}}>44444</Flex.Item>
                      </Flex>
                  </WingBlank>
              </div>
          );
      };


    return(
        <div className='myOrder'>
            <WingBlank>
                <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                    <Flex.Item className="leftLine" style={{textAlign: 'left'}}>订单列表</Flex.Item>
                </Flex>
            </WingBlank>
            <div style={{paddingTop: '2px'}}>
                <div className="fix-scroll hastitle hasbottom" style={{marginTop: '1.7rem',padding:0}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>)}
                        renderRow={row}
                        style={{
                            height: '100%',
                            overflow: 'auto',
                            padding: "0,0.3rem"
                        }}
                        pageSize={10}
                        renderSeparator={separator}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />
                </div>
            </div>
        </div>
        )

  }
}

export default withRouter(MyOrderList);