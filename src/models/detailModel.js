export default{
  namespace: 'detail',
  state:{
    name:'2222'
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(/detail/.test(location.pathname)){
          dispatch({
            type:'ywj/updateState',
            payload:{
              footerVisible:true,
              headerVisible:false,
            }
          })
        }
      })
    }
  },
  effects:{

  },
  reducers:{
    updateState(state,{payload}){
      return {...state,...payload}
    }
  }
}