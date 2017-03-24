import {message} from 'antd'
import kits from '../utils/kits'
import * as homeServices from '../services/homeServices'
function loginSuccess(data) {
  kits.setCookies('tf-token', data.token)
  kits.setCookies('tf-uid', data.userInfo.uid)
  kits.setCookies('__zwUserInfo__', JSON.stringify(data.userInfo))
}

export default {
  namespace: 'home',
  state: {
   haveBanner:true,
   categroy:[
      {
         id:10,
         title:'二级',   
       },{
         id:11,
         title:'第二级',   
       },{
         id:12,
         title:'三二级',   
     }],
     categroyId:'10',
     allCate: [
        {
         id:1,
         title:'一级',   
       },{
         id:2,
         title:'大一级',   
       },{
         id:3,
         title:'大二级',   
     }],
     allCateId: '1',
     bigCate: '1',
     sort: 0,
     artcleList:[],
     cateFiexd: false,
     current:Number(kits.getCookies('currPage')) || 1,
     pagination:{
      total:12,
      size:10
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (/home/.test(location.pathname)) {
          dispatch({
            type: 'ywj/updateState',
            payload: {
              headerVisible: true , 
              footerVisible: true ,
            },
          })
          dispatch({
            type: 'query',
            payload:location
          })
        }
      })
    },
  },
  effects: { 
    *query({payload},{call,put,select}){
      const result = yield call(homeServices.artcleList,{
        userId : kits.getCookies('ywj-uid') || '',
        page: kits.getCookies('currPage') || 1,
        sort: kits.getCookies('ywj-') || 1
      })
      yield put({
        type:'updateState',
        payload:{
          artcleList: result.data
        }
      })
      
    },
    *changePage({payload},{call,put}){
      yield put({
        type:'updateState',
        payload:{
          current: payload.current
        }
      })
      const result = yield call(homeServices.artcleList,{
        userId : kits.getCookies('ywj-uid') || '',
        page: payload.current
      })

      yield put({
        type:'updateState',
        payload:{
          artcleList: result.data
        }
      })
    },
    *handleLike({payload},{call,put}){
      yield put({
        type: 'updateLike',
        payload:payload
      })
      const result = yield call(homeServices.likeArtcle,{
        userId: kits.getCookies('ywj-uid'),
        artcleId: payload
      })
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
  },
  reducers: {
    //更新处理 state 值,由传进来的参数决定
    updateState(state, {payload}){
      return {...state, ...payload}
    },
    //处理用户点赞实时反馈
    updateLike(state,{payload}){
      const artcleList = state.artcleList.map(item=>{
        if(item.id == payload){
          if(item.isLike){
            item.like -=1 
          }else{
            item.like +=1 
          }
          item.isLike = !item.isLike
          return item
        }else{
          return item
        }
      })
      return {...state,artcleList}
    }
  }
}
