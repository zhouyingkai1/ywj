/**
 * Created by timeface on 2017/1/10.
 * 登录
 */
import {routerRedux} from 'dva/router';
import {message} from 'antd'
import Base64 from 'base-64'
import kits from '../utils/kits'
import * as loginServices from '../services/loginServices'

/*登录成功之后相关cookie 存储*/
function loginSuccess(data) {
  message.success('登录成功')
  kits.setCookies('zw-token', data.token)
  kits.setCookies('zw-uid', data.userInfo.id)
  kits.setCookies('userType', data.userInfo.roleId)
}
export default {
  namespace: 'login',
  state: {
    status: 0,    //0登陆 1注册
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/login') {
          dispatch({
            type: 'ywj/updateState',
            payload: {
              headerVisble: false ,
              footerVisble: false ,
            },
          })
        }
      })
    },
  },
  effects: {
    *login({payload}, {put, call}){
      console.log(payload,'payload')
      const result = yield call(loginServices.login, {
        loginName: payload.userName,
        password: payload.passWord
      }, 1000)
      console.log(result,'result')
    }
  },
  reducers: {
    updateState(state, action) {
      return {...state, ...action.payload }
    },
  }
}
