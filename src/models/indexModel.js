import {message} from 'antd'
import {routerRedux} from 'dva/router'
import kits from '../utils/kits'
import * as loginServices from '../services/loginServices'

/*登录成功之后相关cookie 存储*/
function loginSuccess(data) {
  message.success('登录成功')
  kits.setCookies('ywj-uid', data.id)
  kits.setCookies('ywjUser', JSON.stringify(data))
}

export default {
  namespace: 'ywj',
  state: {
    loading: false,
    headerVisible: true,
    footerVisible: true,
    modalVisible: false,
    registerVisible: false,
    showLoginModal: false,
  },
  subscriptions:{
    setup({history,dispatch}){
      history.listen((location)=>{
        if(location.pathname == '/'){
         dispatch(routerRedux.push('/home'))
        }
      })
    }
  },
  effects: {
    *login({payload}, {put, call}){
      const result = yield call(loginServices.login, {
        loginName: payload.userName,
        password: payload.passWord
      }, 1000)
      if(result.code == '000'){
        loginSuccess(result.data)
        yield put({
          type:'updateState',
          payload:{
            showLoginModal: false
          }
        })
        window.location.reload()
      }else{
        message.error("用户名或密码错误")
      }
    },
  },
  reducers: {
    //更新处理 state 值,由传进来的参数决定
    updateState(state, {payload}){
      return {...state, ...payload}
    },
  }
}
