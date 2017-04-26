export default{
  namespace:'submitSuccess',
  state:{},
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(location.pathname == '/submitsuccess'){
          dispatch({
            type:'ywj/updateState',
            payload:{
              headerVisible:true,
              footerVisible:false,
              showLoginModal: false,
            }
          })
        }
      })
    }
  },
  effets:{

  },
  reducers:{
    updateState({state},{payload}){
      return {...state,...payload}
    }
  }
}