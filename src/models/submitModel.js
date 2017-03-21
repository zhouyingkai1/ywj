export default{
  namespace:'submit',
  state:{
    tags:[
      {
        id:1,
        title:'前端'
      },
      {
        id:2,
        title:'后台'
      },
      {
        id:3,
        title:'设计'
      },
      {
        id:4,
        title:'产品'
      },
    ],
    selectTag:3
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