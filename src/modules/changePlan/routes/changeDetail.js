import React, {
  Component
} from 'react'
import {withRouter} from 'react-router'
import {Button,Flex,WingBlank,WhiteSpace,Icon,List,Slider,DatePicker} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
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
        sulv:10,
        startDate: zhNow,
        maxDate: maxZhNow,
        endDate: zhNow,
        timeRing:0
    }
  }


  componentWillMount() {}



  componentDidMount() {}
    changeSulv = (value) => {
        this.setState({
            sulv: value
        })
    }
    onStartChange = (startDate) => {
        let timeRing = this.state.timeRing;
        if(this.state.endDate){
            timeRing  = Math.ceil(this.state.endDate.diff(startDate, 'days',true))
        }
        console.log(timeRing)
        this.setState({
            startDate,
            maxDate: moment(startDate).add(30, 'days'),
            timeRing
        });
    }
    onEndChange = (endDate) => {
        let timeRing = Math.ceil(endDate.diff(this.state.startDate, 'days',true))
        this.setState({
            endDate,
            timeRing
        });
        console.log(timeRing)
    }

  render() {
      let endMinDate = moment.max(this.state.endDate, this.state.startDate);
    return(
        <div className='changeDetailBox'>
            <WingBlank>
                <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                    <Flex.Item className="leftLine" style={{textAlign: 'left'}}>计划详情</Flex.Item>
                </Flex>
                <List className="my-list">
                    <Item extra={'203383886'}>计划编号</Item>
                    <Item extra={'203383886'}>专线号码</Item>
                    <Item extra={'203383886'}>创建时间</Item>
                    <Item extra={'203383886'}>生效时间</Item>
                    <Item extra={'203383886'}>失效时间</Item>
                    <Item extra={'203383886'}>签约速率</Item>
                    <Item extra={'203383886'}>预约速率</Item>
                    <Item extra={'203383886'}>当前状态</Item>
                    <Item extra={'203383886'}>计划总价</Item>
                    <Item extra={'203383886'}>购买人员</Item>
                </List>
                <WhiteSpace/>
                <Flex style={{justify: 'bettwen', lineHeight: '1rem'}}>
                    <Flex.Item className="leftLine" style={{textAlign: 'left'}}>修改速率</Flex.Item>
                    <Flex.Item style={{textAlign: 'right'}}>{`${this.state.sulv}M`}</Flex.Item>
                </Flex>
                <div className="sliderBox">
                    <Slider
                        style={{height: '0.8rem'}}
                        defaultValue={this.state.sulv}
                        min={10}
                        max={100}
                        step={10}
                        onChange={this.changeSulv}
                        onAfterChange={this.changeSulv}
                    />
                    <Flex className="sliderNum">
                        <Flex.Item style={{textAlign: "left"}}>10M</Flex.Item>
                        <Flex.Item>50M</Flex.Item>
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
                        <Flex.Item style={{textAlign: 'right'}}>价格合计:{this.state.timeRing * 500}</Flex.Item>
                    </Flex>
                </WingBlank>
                <Flex style={{justify: 'bettwen', lineHeight: '1rem',margin:'0.3rem 0'}}>
                    <Flex.Item><Button onClick={this.onSubmit} style={{backgroundColor:"#fb9233",borderRadius:"50px",color:"#fff"}}>立即修改</Button></Flex.Item>
                    <Flex.Item><Button onClick={this.onSubmit} style={{backgroundColor:"#fb9233",borderRadius:"50px",color:"#fff"}}>取消计划</Button></Flex.Item>
                </Flex>
            </WingBlank>


        </div>
        )

  }
}

export default withRouter(changeDetail);