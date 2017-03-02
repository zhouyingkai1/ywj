
export default {
  namespace: 'select',
  state:{
    tags:[
      {
        id:1,
        // img:'http://img1.timeface.cn/times/2ad93fae357a6f746f5e134b57289cfd.png',
        img:'http://static.timeface.cn/times/9634a8d5ef80b8d79eb85f29df26b9b2.jpg', 
        name:'时光流影',
        isLike:false
      },
      {
        id:2,
        // img:'http://img1.timeface.cn/times/2ad93fae357a6f746f5e134b57289cfd.png',
        img:'http://static.timeface.cn/times/9634a8d5ef80b8d79eb85f29df26b9b2.jpg',
        name:'时光流影',
        isLike:false
      },
      {
        id:3,
        img:'http://static.timeface.cn/times/9634a8d5ef80b8d79eb85f29df26b9b2.jpg',
        name:'时光流影',
        isLike:false
      },
      {
        id:4,
        img:'http://static.timeface.cn/times/9634a8d5ef80b8d79eb85f29df26b9b2.jpg',
        name:'时光流影',
        isLike:false
      },
      {
        id:5,
        img:'http://static.timeface.cn/times/9634a8d5ef80b8d79eb85f29df26b9b2.jpg',
        name:'时光流影',
        isLike:false
      },
      {
        id:6,
        img:'http://static.timeface.cn/times/9634a8d5ef80b8d79eb85f29df26b9b2.jpg',
        name:'时光流影',
        isLike:false
      },
    ],
    liked:[]
  },
  subscriptions:{
    setup({dispatch,history}) {
      history.listen(location=>{
        if(location.pathname == '/select'){
          dispatch({
            type:'ywj/updateState',
            payload:{
              headerVisible:false,
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
      const tags = state.tags.map(item=>{
        if(item.id == payload){
          item.isLike = !item.isLike
          return item
        }else{
          return item
        }
      })
      return {...state,tags}
    },
    update(state,{payload}){
      console.log(payload,'ddddd')
      return {...state,...payload}
    }
  }
}