import {message} from 'antd'
import kits from '../utils/kits'
import * as homeServices from '../services/homeServices'
export default {
  namespace: 'home',
  state: {
    haveBanner:true,
    categroyId:'',
    allCate: [],
    bigCate: '',
    sort: kits.getCookies('ywj-sort') || 0,
    artcleList:[],
    cateFiexd: false,
    current:Number(kits.getCookies('currPage')) || 1,
    total:0,
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
              showLoginModal: false
            },
          })
          dispatch({
            type: 'getItemList',
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
      let bigCate = yield select(state=>state.home.bigCate)
      let categroyId = yield select(state=>state.home.categroyId)
      const result = yield call(homeServices.artcleList,{
        userId : kits.getCookies('ywj-uid') || '',
        page: kits.getCookies('currPage') || 1,
        sort: kits.getCookies('ywj-sort') || 0,
        bigCate: bigCate,
        categroyId: categroyId
      })
      yield put({
        type:'updateState',
        payload:{
          artcleList: result.data,
          total: result.total
        }
      })
    },
    *getItemList({payload},{call,put}){
      const result = yield call(homeServices.getItemList,{
        userId: kits.getCookies('ywj-uid'),
      })
      if(result.code == '000'){
        yield put({
          type:'updateState',
          payload:{
            allCate: result.data,
            bigCate: result.data[0]&&result.data[0].id,
          }
        })
      }
    },
    *changeDataBySort({payload},{call,put}){
      document.cookie = 'currPage=' + 1
      yield put({
        type:'updateState',
        payload:{
          sort : payload.sort,
          current: 1
        }
      })  
      yield put({
        type:'query'
      })
    },
    *changePage({payload},{call,put}){
      yield put({
        type:'updateState',
        payload:{
          current: Number(kits.getCookies('currPage'))
        }
      })
      yield put({
        type:'query'
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
