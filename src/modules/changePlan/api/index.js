import {fetch, common} from 'common';


// /line/speeded  获取已提速企业专线列表接口(变更计划已定提速专线)
export function getLineSpeeded(obj) {
    return fetch.get('/line/speeded',obj);
}
///order/info  获取订单详情接口（订单详情） order_id
export function getOrderInfo(obj) {
    return fetch.get('/order/info',obj);
}

//获取单价 /order/rule
export function getOrderRule() {
    return fetch.get('/order/rule');
}

//修改订单接口（立即创建）
export function setOrderEstimate(obj,ContentTypeForm) {
    return fetch.post('/order/create',obj,ContentTypeForm);
}