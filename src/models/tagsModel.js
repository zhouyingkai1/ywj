import {routerRedux} from 'dva/router'
import {Message} from 'antd'
import {artcleList,likeArtcle,getTagInfo,hanleLikeTag} from '../services/homeServices'
import kits from '../utils/kits'
export default{
  namespace:'tags',
  state:{
    artcleList:[],
    sort: 0,
    current: 1,
    total: 0,
    bigCate: '',
    categroyId: '',
    tagInfo: {}
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(/tags/.test(location.pathname)){
          dispatch({
            type:'ywj/updateState',
            payload:{
              headerVisible:true,
              footerVisible:true,
              showLoginModal: false,
            }
          })
          let itemTag = ''
          if(location.query.tag){
            itemTag = location.query.tag.split('-')
          }
          if(itemTag){
            dispatch({
              type:'updateState',
              payload:{
                bigCate: itemTag[0],
                categroyId: itemTag[1],
                sort: 0
              }
            })
            dispatch({
              type:"queryTagInfo"
            })
          }else{
            Message.error('链接错误，已跳转到首页')
            dispatch(routerRedux.push({pathname:'home'}))
          }
          dispatch({
            type:"query"
          })
        }
      })
    }
  },
  effects:{
    *query({payload},{call,put,select}){
      let bigCate = yield select(state=>state.tags.bigCate)
      let categroyId = yield select(state=>state.tags.categroyId)
      let page = yield select(state=>state.tags.current)
      let sort = yield select(state=>state.tags.sort)
      const result = yield call(artcleList,{
        page: page,
        sort: sort,
        bigCate: bigCate,
        categroyId: categroyId,
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
    *queryTagInfo({payload},{call,put,select}){
      let bigCate = yield select(state=>state.tags.bigCate)
      let categroyId = yield select(state=>state.tags.categroyId)
      const result = yield call(getTagInfo,{
        itemId: bigCate,
        tagId: categroyId,
        userId: kits.getCookies('ywj-uid'),
      })
      yield put({
        type:'updateState',
        payload:{
          tagInfo: result.data,
        }
      })
    },
    *pageChange({payload},{put}){
      yield put({
        type:"updateState",
        payload:{
          current: payload.current
        }
      })
      yield put({
        type:"query"
      })
    },
    *changeSort({payload},{put}){
      yield put({
        type:"updateState",
        payload:{
          sort: payload.sort,
          current: payload.current
        }
      })
      yield put({
        type:"query"
      })
    },
    *handleLike({payload},{put,call}){
      yield put({
        type: 'updateLike',
        payload:payload
      })
      const result = yield call(likeArtcle,{
        artcleId: payload,
        userId: kits.getCookies('ywj-uid'),
      })
    },
    *hanleLikeTag({payload},{select,call,put}){
      let bigCate = yield select(state=>state.tags.bigCate)
      const result = yield call(hanleLikeTag,{
        itemId: bigCate,
        userId: kits.getCookies('ywj-uid'),
      })
      if(result.code == '000'){
        yield put({
          type:'changeTagLike'
        })
      }else{
        Message.error('操作失败，请刷新重试')
      }
    }
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
    },
    //点关注之后的页面更改
    changeTagLike(state,{payload}){
      const tagInfo = state.tagInfo
      if(!tagInfo.isLike){
        tagInfo.likeNum = ++tagInfo.likeNum 
      }else{
        tagInfo.likeNum = --tagInfo.likeNum 
      }
      tagInfo.isLike = !tagInfo.isLike
       return {...state,tagInfo}
    }
  }
}