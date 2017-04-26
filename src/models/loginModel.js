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
  kits.setCookies('ywj-uid', data.id)
  kits.setCookies('ywjUser', JSON.stringify(data))
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
              headerVisible: false ,
              footerVisible: false ,
            },
          })
          if(/from/.test(location.search)){
            dispatch({
              type:'updateState',
              payload:{
                status: 1
              }
            })
          }
        }
      })
    },
  },
  effects: {
    *login({payload}, {put, call}){
      const result = yield call(loginServices.login, {
        loginName: payload.userName,
        password: payload.passWord
      }, 1000)
      if(result.code == '000'){
        loginSuccess(result.data)
        if(result.haveLike){
           yield put(routerRedux.replace({pathname: '/home'}))
        }else{
           yield put(routerRedux.replace({pathname: '/select'}))
        }
       
      }else{
        message.error("用户名或密码错误")
      }
    },
    *register({payload},{put,call}){
      const result = yield call(loginServices.register,{
        loginName: payload.userName,
        password: payload.passWord,
      })
      if(result.code == '000'){
        message.success('注册成功,立即登录',3.5)
        yield put({
          type:'updateState',
          payload:{
            status: 0
          }
        })
      }else{
        message.error('用户已存在')  
      }
    }
  },
  reducers: {
    updateState(state, action) {
      return {...state, ...action.payload }
    },
  }
}
