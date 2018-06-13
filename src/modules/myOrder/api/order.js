import {fetch, common} from 'common';

// 订单列表
export function orderlist({status, pageNo}) {
    return fetch.get('/orderApi/orderlist', {
        status,
        pageNo
    });
}

export function orderdetail({orderid}) {
    return fetch.get('/orderApp/orderDetail', {
        orderid
    });
}