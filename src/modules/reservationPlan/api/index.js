import {fetch, common} from 'common';

//创建订单接口（立即创建）
export function setOrderEstimate(obj,ContentTypeForm) {
    return fetch.post('/order/create',obj,ContentTypeForm);
}

//获取单价 /order/rule
export function getOrderRule() {
    return fetch.get('/order/rule');
}

///order/info  获取订单详情接口（订单详情） order_id
export function getOrderInfo(obj) {
    return fetch.get('/order/info',obj);
}