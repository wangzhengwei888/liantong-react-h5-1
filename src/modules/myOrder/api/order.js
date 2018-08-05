import {fetch, common} from 'common';

// 获取提速专线列表接口 enter_id  status
export function orderlist(obj) {
    return fetch.get('/order/list', obj);
}
//获取专线订单列表接口（我的订单订单列表） /order/enter/list
export function orderEnterList(obj) {
    return fetch.get('/order/enter/list', obj);
}