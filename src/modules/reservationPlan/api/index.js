import {fetch, common} from 'common';

//计算当前配置费用接口  /order/estimate
export function setOrderEstimate(obj,ContentTypeForm) {
    return fetch.post('/order/estimate',obj,ContentTypeForm);
}

///line/speeded  获取已提速企业专线列表接口  enter_id
export function getLineSpeeded(obj) {
    return fetch.post('/line/speeded',obj);
}