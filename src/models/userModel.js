import * as userService from '../services/userServices'
import * as homeServices from '../services/homeServices'
import kits from '../utils/kits'
export default{
  namespace:'user',
  state:{
    artcleList:[],
    sort: 0,
    current: 1,
    total: 0,
    uId: '',
    userInfo:{},
  },
  subscriptions:{
    setup({dispatch,history}) {
      history.listen(location=>{
        if(/user/.test(location.pathname)){
          dispatch({
            type:'ywj/updateState',
            payload:{
              headerVisible:true,
              footerVisible:false,
              showLoginModal: false,
            }
          })
          dispatch({
            type: 'query',
            payload:{
              uId: location.pathname.replace(/\/user\//,'')
            }
          })
          dispatch({
            type:'updateState',
            payload:{
              uId: location.pathname.replace(/\/user\//,'')
            }
          })
          dispatch({
            type:'getUserInfo'
          })
        }
      })
    }
  },
  effects:{
    *query({payload},{call,put}){
      console.log('更新')
      const result = yield call(userService.getUserLikeArtcle,{
        sort: 0,
        page: 1,
        uId: payload.uId,
        userId: kits.getCookies('ywj-uid'),
      })
      yield put({
        type:'updateState',
        payload:{
          artcleList: result.data,
          total: result.total
        }
      })
    },
    *getUserInfo({payload},{call,put,select}){
      const uId =yield select(state=>state.user.uId)
      const result = yield call(userService.getUserInfo,{
        userId: uId
      })
      if(result.code == '000'){
        yield put({
          type:"updateState",
          payload:{
            userInfo: result.data
          }
        })
        console.log(result.data)
      }
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
    *changePage({payload},{call,put,select}){
      yield put({
        type:'updateState',
        payload:{
          current: Number(payload.current)
        }
      })
      const userId =yield select(state=>state.user.userId)
      const result = yield call(userService.getUserLikeArtcle,{
        sort: 0,
        page: payload.current,
        userId: userId
      })
      yield put({
        type:'updateState',
        payload:{
          artcleList: result.data,
          total: result.total
        }
      })
    },
  },
  reducers:{
    updateState(state,{payload}){
      return {...state,...payload}
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