/**
 * 公用接口服务
 */
import request from '../utils/anotherRequest'

export function stsAuth() {
  return request('http://auth.timeface.cn/web/sts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    isAddToken: true,
    body: JSON.stringify({url: 'static.timeface.cn', dir: 'times'}),
  });
}

export function preRequestImage(filename) {
  return request( 'http://static.timeface.cn/times' + filename+'@infoexif?headdate='+new Date().getTime(), {
    method: 'HEAD',
    cache: false
  });
}

export function getImageInfo(filename) {
  return request( 'http://static.timeface.cn/times' + filename +'@infoexif?date='+new Date().getTime(), {
    method: 'GET',
    isAddToken: true
  });
}

export function upload(params) {
  return request( 'http://static.timeface.cn', {
    method: 'POST',
    isAddToken: true,
    body: params,
  });
}


