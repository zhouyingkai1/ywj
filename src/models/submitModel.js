import * as submitService from '../services/submitServices'
export default{
  namespace:'submit',
  state:{
    items:[
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
    tags:[
      {
        id:1,
        title:'搞笑'
      },
      {
        id:2,
        title:'教程'
      },
      {
        id:3,
        title:'论坛'
      },
      {
        id:4,
        title:'主播'
      },
    ],
    selectItem:'',
    selectTag:''
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
    *submitArtcle({payload},{call,put}){
      const result = yield call(submitService.submit,{...payload})
      if(result.code == '000'){
        
      }
    },
  },
  reducers:{
    updateState(state,{payload}){
      return {...state,...payload}
    }
  }
}