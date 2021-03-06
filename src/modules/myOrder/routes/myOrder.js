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

const oldData = [];


class MyOrder extends Component {
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

    refreshList = ({pageNo, selectedIndex}) => {
        let status = null;
        switch (selectedIndex) {
            case 0:
                status = '';
                break;
            case 1:
                status = 1;
                break;
            case 2:
                status = 2;
                break;
            case 3:
                status = 3;
                break;
        }


        orderApi.orderlist({pageNo, status,enter_id:'1'}).then(result => {
            this.setState({
                isLoading: true
            });
            console.log(result)
            if (result.code == 0) {
                const data = result.data || [];
                const pageSize = 20;
                const dataLength = data.length;
                let hasMore = true;
                if (dataLength < pageSize) {
                    hasMore = false;
                }
                if (this.state.isInit) {
                    this.orderList = data;
                } else {
                    this.orderList = [...this.dataSource, ...data];
                }
                this.setState({
                    hasMore,
                    pageNo,
                    dataSource: this.ds.cloneWithRows(this.orderList),
                    dataLength: data.length,
                    isLoading:false
                })
            }else{
                Toast.fail(result.msg)
                this.setState({
                    isLoading:false
                })
            }
        })
    }

    // 改变tab
    onChange = (index) => {
        this.props.router.replace('/orderList/' + index);
    }

    componentDidUpdate(prevProps, prevState) {
        // 当前url参数
        const type = parseInt(this.props.params.type) || 0;
        // 如果变化参数
        if (type != this.state.selectedIndex) {
            this.setState({
                pageNo: 1,
                selectedIndex: type,
                isInit: true,
                isLoading:true
            })

            this.refreshList({
                pageNo: 1,
                selectedIndex: type
            });
        }
    }

    componentDidMount() {
        this.refreshList({
            pageNo: 1,
            selectedIndex: this.state.selectedIndex
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
            pageNo,
            selectedIndex: this.state.selectedIndex,
        });
    }

    //去帮助中心
    goHelp = () =>{
        console.log("aaaaaaaaaa")
    }
    goOrderDetail = (line_id) => {
        console.log(line_id)
        this.props.router.push(`/myOrderList/${line_id}`)
    }

  render() {
      const {selectedIndex, dataSource} = this.state;
      const row = (rowData, rowID) => {
          return (
              <div className="rowBox" key={rowID} style={{padding: '0 15px'}}>
                  <WingBlank>
                      <List>
                          <Item onClick={() => this.goOrderDetail(rowData.line_id)} arrow="horizontal" extra={'订单详情'}>专线号码:{rowData.product_num}</Item>
                      </List>
                  </WingBlank>
              </div>
          );
      };


    return(
        <div className='myOrder'>
            <Flex className="reservationPlanTitle" style={{justify: 'end'}}>
                <Flex.Item></Flex.Item>
                <Flex.Item style={{fontSize: '0.34rem'}}>我的订单</Flex.Item>
                <Flex.Item onClick={this.goHelp}><img style={{
                    width: '0.4rem',
                    height: '0.4rem',
                }} src={"./assets/img/ico/help.png"}>
                </img></Flex.Item>
            </Flex>
            <div style={{paddingTop: '2px'}}>
                <SegmentedControl
                    tintColor={'#333'}
                    onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)}
                    selectedIndex={selectedIndex}
                    values={['全部订单', '执行中', '待执行', '已结束']}
                    style={{height: '0.8rem',margin:'0'}} />

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

export default withRouter(MyOrder);