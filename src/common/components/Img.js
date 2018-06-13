import React, {Component, PropTypes} from 'react';
import {common} from 'common';

export default function Img({...props}) {
    let src = props.src
    if (src && src !== undefined) {
        if (src.indexOf('http://wx') === 0) {
            return <img {...props} src={`${props.src}`}/>
        }
    }
    return <img {...props} src={`${common.IMAGE_DOMAIN}${props.src}`}/>
}
