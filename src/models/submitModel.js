import * as submitService from '../services/submitServices'
import {getItemList} from '../services/homeServices'
import {routerRedux} from 'dva/router'
import kits from '../utils/kits'

export default{
  namespace:'submit',
  state:{
    items:[],
    tags:[],
    selectItem:'',
    selectTag:'',
    imgUrlArr : [
      'http://static.timeface.cn/times/de24c331a95cf54eeb1682f463ee2e67.jpg',
      'http://static.timeface.cn/times/2d3248f3b4380e922db426ef78cdfca1.jpg',
      'http://static.timeface.cn/times/ccb6beb72d98eaf416c2c00f78b234de.jpg',
      'http://static.timeface.cn/times/1a663ceeb4859f37bb81c2b0bd2fbc3e.jpg',
      'http://static.timeface.cn/times/a782180756c0005cf38ed40136c43baa.jpg',
    ],
    selectImg: parseInt(Math.random() * 4 )
  },
  subscriptions:{
    setup({dispatch,history}) {
      history.listen(location=>{
        if(location.pathname == '/submit'){
          dispatch({
            type:'ywj/updateState',
            payload:{
              headerVisible:true,
              footerVisible:false,
              showLoginModal: false,
            }
          })
          dispatch({
            type:'getItemList'
          })
        }
      })
    }
  },
  effects:{
    *submitArtcle({payload},{call,put}){
      const result = yield call(submitService.submit,{...payload})
      if(result.code == '000'){
        yield put(routerRedux.replace({pathname:'/submitSuccess'}))
      }
    },
    *getItemList({payload},{call,put}){
      const result = yield call(getItemList,{
        userId: kits.getCookies('ywj-uid')
      })
      if(result.code == '000'){
        yield put({
          type:'updateState',
          payload:{
            userId: kits.getCookies('ywj-uid'),
            items: result.data,
            selectItem: result.data[0]&&result.data[0].id,
            tags: result.data[0]&&result.data[0].tagList, 
            selectTag: result.data[0]&&result.data[0].tagList[0]&&result.data[0].tagList[0].id
          }
        })
      }
    },
  },
  reducers:{
    updateState(state,{payload}){
      return {...state,...payload}
    }
  }
}