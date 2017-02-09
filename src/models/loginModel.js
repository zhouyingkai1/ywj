/**
 * Created by timeface on 2017/1/10.
 * 登录
 */
import {routerRedux} from 'dva/router';
import {message} from 'antd'
import Base64 from 'base-64'
import kits from '../utils/kits'
// import * as loginService from '../../services/loginServices'

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
      const result = yield call(loginService.login, {
        mobile: payload.userName,
        password: payload.userPwd
      }, 1000)
      if (~'000'.indexOf(result.code)) {
        yield loginSuccess(result.data)
        yield put(routerRedux.replace({pathname: '/main'}))
      } else if (result.code == 'A001003') {
        message.error('用户名或密码错误', 3)
      } else if (result.code == 'A001002') {
        message.error('用户名不存在', 3);
      } else {
        message.error('网络错误，请稍后重试', 3);
      }
    }
  },
  reducers: {
    updateState(state, action) {
      return {...state, ...action.payload }
    },
  }
}
