import * as selectServices from '../services/selectServices'
import kits from '../utils/kits'
import {routerRedux} from 'dva/router'
import {message} from 'antd'
export default {
  namespace: 'select',
  state:{
    tags:[
      // {
      //   id:1,
      //   // img:'http://img1.timeface.cn/times/2ad93fae357a6f746f5e134b57289cfd.png',
      //   img:'http://static.timeface.cn/times/9634a8d5ef80b8d79eb85f29df26b9b2.jpg', 
      //   name:'时光流影',
      //   isLike:false
      // },
    ],
    liked:[],   //用户选择的标签
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
          dispatch({
            type:'getItems',
          })
        }
      })
    }
  },
  effects:{
    *getItems({payload}, {put, call}){
      const result = yield call(selectServices.getItems,{})
      if(result.code == '000'){
        console.log(result.data),'data'
        yield put({
          type:'update',
          payload:{
            tags: result.data
          }
        })
      }
    },
    *addUserItems({payload}, {put, call}){
      const result = yield call(selectServices.addUserItems,{
        itemArr: String(payload.itemArr),
        userId: kits.getCookies('ywj-uid')
      })
      if(result.code == '000'){
        message.success('添加成功')
        yield put(routerRedux.push('/home'))
      }
    },
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
      return {...state,...payload}
    }
  }
}