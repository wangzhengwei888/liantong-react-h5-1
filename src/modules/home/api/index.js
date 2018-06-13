import {fetch, common} from 'common';

export function getFloorList(obj) {
    return fetch.get('/indexApp/getFloorList',obj);
}