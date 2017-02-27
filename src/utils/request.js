import fetch from 'dva/fetch';
import pathInterceptor from './pathInterceptor';
import tokenInterceptor from './tokenInterceptor';
import $ from 'jquery'
function parseJSON(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {status: 200}
  })
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log(22)
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handleError(error) {
  if (error.response && error.response.status) {
    return{
      code: error.response && error.response.status,
      msg: error.response && error.response.body || '网络发生异常'
    };
  } else {
    return{code: 504, data: {code: 'timeout', msg: '请求超时'}};
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  url  = /http:\\/.test(url) ? url : pathInterceptor.request(url)
//  return fetch(url)
  //  .then(checkStatus)
  //   .then(!~'headHEAD'.indexOf(options)&&parseJSON)
  //   .then((data) => data)
  //   .catch((err) => handleError(err));
  // // console.log(options,'ss')
  $.ajax({
    url: url,
    method: 'POST',
    data: options.body,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    dataType: 'json',
    success (data) {
      console.log(data)
      return data 
    },
    error(err){
      return err 
    }
  })
}