import {fetch, common} from 'common';

// 获取提速专线列表接口 enter_id  status
export function orderlist(obj) {
    return fetch.get('/order/list', obj);
}
//获取订单详情接口 order_id
export function orderInfo(obj) {
    return fetch.get('/order/info', obj);
}