import {message} from 'antd'
// import kits from '../../utils/kits'

function loginSuccess(data) {
  kits.setCookies('tf-token', data.token)
  kits.setCookies('tf-uid', data.userInfo.uid)
  kits.setCookies('__zwUserInfo__', JSON.stringify(data.userInfo))
}

export default {
  namespace: 'home',
  state: {
   
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/home') {
          dispatch({
            type: 'ywj/updateState',
            payload: {
              headerVisible: true , 
              footerVisible: true ,
            },
          })
        }
      })
    },
  },
  effects: {
    *login({
      payload
    }, {call, put}) {
      yield put({type: 'showHideLoading'})
      const result = yield call(login, payload)
      if (result.code == '000') {
        loginSuccess(result.data)
        yield put({
          type: 'loginSuccess'
        })
      } else {
        if (result.code == 'A001003') {
          message.error('密码错误')
        } else if (result.code == 'A001002') {
          message.error('账户不存在')
        } else {
          message.error('网络错误，请稍后重试')
        }
        yield put({type: 'loginFail'})
      }
    },
    *register({
      payload
    }, {call, put}) {
      yield put({type: 'showHideLoading'})
      const result = yield call(register, payload)
      if (result.code == '000') {
        loginSuccess(result.data)
        yield put({
          type: 'loginSuccess'
        })
        window.location.reload()
      } else {
        if (result.code == 'valcode_is_error') {
          message.error('注册码错误')
        } else if (result.code == 'A001004') {
          message.error('账户已存在')
        } else {
          message.error('网络错误，请稍后重试')
        }
        yield put({type: 'loginFail'})
      }
    },
    *loginOut({}, {put}){
      kits.setCookies('tf-token', '')
      kits.setCookies('tf-uid', '')
      kits.setCookies('__zwUserInfo__', JSON.stringify({}))
      yield put({
        type: 'updateState'
      })
      window.location.reload()
    },
    *captcha({
      payload
    }, {call}) {
      const result = yield call(captcha, payload)
      if (result.code != '000') {
        message.error('网络错误，请稍后重试')
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
