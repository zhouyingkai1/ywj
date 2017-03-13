export default{
  namespace: 'detail',
  state:{
    artcleDetail:{
      id:14,
      isLike:false,
      title:'风吹画廊人如玉',
      url:'http://baidu.com',
      like:10,
      shortImg:'https://dn-mhke0kuv.qbox.me/13f969888162372b4034.png?imageView/2/w/800/h/400/q/100/format/png',  
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(/detail/.test(location.pathname)){
          dispatch({
            type:'ywj/updateState',
            payload:{
              footerVisible:true,
              headerVisible:true,
            }
          })
        }
      })
    }
  },
  effects:{
    *handleLike({payload},{call,select,put}){
      yield put({
        type:'likeReducer',
        payload:payload
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
  }
}