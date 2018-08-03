import {fetch, common} from 'common';
export function getLoginStatus(obj) {
    return fetch.get('/user/login',obj);
}
///line/list 获取企业专线列表接口  enter_id
export function getLineList(obj) {
    return fetch.get('/line/list',obj);
}