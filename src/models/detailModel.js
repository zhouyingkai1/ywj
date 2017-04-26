import * as artcleDetailServices from '../services/artcleDetailServices'
import * as commonServices from '../services/commonServices'
import {likeArtcle,likeComment} from '../services/homeServices'
import kits from '../utils/kits'
import {routerRedux} from 'dva/router'
import {Message} from 'antd'
export default{
  namespace: 'detail',
  state:{
    artcleDetail:{
      id: ' ',
      isLike:false,
      title:' ',
      url:' ',
      like:0,
      tags:[
        {
          id:10,
          title:'前端',
          url:'frontend'
        }
      ],
      shortImg:' ',  
      createTime: 1488782302,
      desc:' ',
      user:{},
    },
    comment:{
      data:[]
    },
    currentPage: 1,
    about:[
      {
        title:' ',
        url:' ',
        like:0,
        userName:' '
      },
    ],
    likedUser:[
      {
        id: ' ',
        userName:' ',
        avator:' ',
      },
    ],
    commentPic: ''
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(/detail/.test(location.pathname)){
          dispatch({
            type:'ywj/updateState',
            payload:{
              footerVisible:false,
              headerVisible:true,
            }
          })
          dispatch({
            type:'query',
            payload:{
              id:location.query.id
            }
          })
        }
      })
    }
  },
  effects:{
    *query({payload},{call,put}){
      const result = yield call(artcleDetailServices.queryArtcleById,{
        userId: kits.getCookies('ywj-uid'),
        artcleId: payload.id
      })
      if(result.code == '000'){
        yield put({
          type: 'updateState',
          payload:{
            artcleDetail: result.data
          }
        })
        const aboutList = yield call(artcleDetailServices.queryAboutArtcle,{
          tags: result.data.tags[0].id
        })
        yield put({
          type: 'updateState',
          payload:{
            about: aboutList.data
          }
        })
      }
      yield put({
        type:'queryLikeList',
        payload:{
          id: payload.id
        }
      })
      yield put({
        type:'getComment',
        payload:{
          artcleId: payload.id,
          page: 1,
          userId: kits.getCookies('ywj-uid'),
        }
      })
      
    },
    *changePage({payload},{call,put}){
      yield put({
        type:'updateState',
        payload:{
          currentPage: payload.currentPage
        }
      })
      yield put({
        type:'getComment',
        payload:{
          artcleId: payload.id,
          page: payload.currentPage
        }
      })
    },
    *queryLikeList({payload},{call,put}){
      const likeList = yield call(artcleDetailServices.likeUserList,{
        artcleId: payload.id
      })
      yield put({
        type: 'updateState',
        payload:{
          likedUser: likeList.data
        }
      })
    },
    *submitComment({payload},{call,put}){
      const result = yield call(artcleDetailServices.submitComment,payload)
      if(result.code == '000'){
        Message.success('评论成功')
        yield put({
          type:'getComment',
          payload:{
            artcleId: payload.artcleId,
            page: 1,
            userId: kits.getCookies('ywj-uid'),
          }
        })
      }
    },
    *getComment({payload},{call,put}){
      const result = yield call(artcleDetailServices.getComment,payload)
      if(result.code == '000'){
        yield put({
          type: 'updateState',
          payload:{
            comment: result
          }
        })
      }
    },
    *handleLike({payload},{call,select,put}){
      yield put({
        type:'likeReducer',
        payload:payload
      })
      const result = yield call(likeArtcle,{
        userId: kits.getCookies('ywj-uid'),
        artcleId: payload.artcleId
      })
      if(result.code == '000'){
        yield put({
          type:'queryLikeList',
          payload:{
            id: payload.artcleId
          }
        })
      }
    },
    *handleLikeCom({payload},{call,select,put}){
      yield put({
        type:'commentReducer',
        payload:payload
      })
      const result = yield call(likeComment,{
        commentId: payload.commentId,
        artcleId: payload.artcleId,
        userId: kits.getCookies('ywj-uid'),
      })
    }
  },
  reducers:{
    updateState(state,{payload}){
      return {...state,...payload}
    },
    likeReducer(state,{payload}){
      const artcleDetail = state.artcleDetail
      artcleDetail.isLike = payload.artcleDetail.isLike
      if(payload.artcleDetail.isLike){
        artcleDetail.like += 1
      }else{
        artcleDetail.like -= 1
      }
      return {...state,...artcleDetail}
    },
    commentReducer(state,{payload}){
      const commentData = state.comment.data.map(item=>{
        if(item.id == payload.commentId){
          if(item.isLike){
            item.likeCommentNum -=1 
          }else{
            item.likeCommentNum +=1 
          }
          item.isLike = !item.isLike
          return item
        }else{
          return item
        }
      })
      let comment = state.comment
      comment.data = commentData
      return {...state,comment}
    },
  }
}