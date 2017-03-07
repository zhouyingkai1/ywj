import {message} from 'antd'
// import kits from '../../utils/kits'

function loginSuccess(data) {
  kits.setCookies('tf-token', data.token)
  kits.setCookies('tf-uid', data.userInfo.uid)
  kits.setCookies('__zwUserInfo__', JSON.stringify(data.userInfo))
}

export default {
  namespace: 'home',
  state: {
   haveBanner:true,
   categroy:[
      {
         id:10,
         title:'二级',   
       },{
         id:11,
         title:'第二级',   
       },{
         id:12,
         title:'三二级',   
     }],
     categroyId:'10',
     allCate: [
        {
         id:1,
         title:'一级',   
       },{
         id:2,
         title:'大一级',   
       },{
         id:3,
         title:'大二级',   
     }],
     allCateId: '1',
     bigCate: '1',
     sort: 'hot',
     artcleList:[
       {
         id:14,
         title:'测试名称这个很长的名称',
         createTime:'1488782302',
         url:'http://baidu.com',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/40f695879c4acce775aba0046bde0bc7?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'前端',
             url:'frontend'
           },{
             id:12,
             title:'后台',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:10,
         isLike: false,
         message:0,
         shortImg:'https://dn-mhke0kuv.qbox.me/2f2f8e9b7958146f3578.png?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       },{
         id:15,
         title:'测试名称',
         url:'http://baidu.com',
         createTime:'1488556800',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/de622597dfcff4da2bcd5dc84fb57cc5?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'git',
             url:'frontend'
           },{
             id:12,
             title:'js',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:0,
         isLike: false,
         message:10,
         shortImg:'https://dn-mhke0kuv.qbox.me/50a1f2476c5699928c8d.jpg?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       },{
         id:17,
         title:'测试名称',
         url:'http://baidu.com',
         createTime:'1486137600',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/40f695879c4acce775aba0046bde0bc7?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'前端',
             url:'frontend'
           },{
             id:12,
             title:'后台',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:1,
         isLike: true,
         message:10,
         shortImg:'https://dn-mhke0kuv.qbox.me/50a1f2476c5699928c8d.jpg?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       },{
         id:37,
         title:'测试名称',
         url:'http://baidu.com',
         createTime:'1486137600',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/40f695879c4acce775aba0046bde0bc7?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'前端',
             url:'frontend'
           },{
             id:12,
             title:'后台',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:1,
         isLike: true,
         message:10,
         shortImg:'https://dn-mhke0kuv.qbox.me/50a1f2476c5699928c8d.jpg?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       },{
         id:167,
         title:'测试名称',
         createTime:'1486137600',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/40f695879c4acce775aba0046bde0bc7?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'前端',
             url:'frontend'
           },{
             id:12,
             title:'后台',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:1,
         isLike: true,
         message:10,
         shortImg:'https://dn-mhke0kuv.qbox.me/50a1f2476c5699928c8d.jpg?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       },{
         id:7,
         title:'测试名称',
         createTime:'1486137600',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/40f695879c4acce775aba0046bde0bc7?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'前端',
             url:'frontend'
           },{
             id:12,
             title:'后台',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:1,
         isLike: true,
         message:10,
         shortImg:'https://dn-mhke0kuv.qbox.me/50a1f2476c5699928c8d.jpg?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       },{
         id:27,
         title:'测试名称',
         createTime:'1486137600',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/40f695879c4acce775aba0046bde0bc7?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'前端',
             url:'frontend'
           },{
             id:12,
             title:'后台',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:1,
         isLike: true,
         message:10,
         shortImg:'https://dn-mhke0kuv.qbox.me/50a1f2476c5699928c8d.jpg?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       },{
         id:117,
         title:'测试名称',
         createTime:'1486137600',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/40f695879c4acce775aba0046bde0bc7?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'前端',
             url:'frontend'
           },{
             id:12,
             title:'后台',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:1,
         isLike: true,
         message:10,
         shortImg:'https://dn-mhke0kuv.qbox.me/50a1f2476c5699928c8d.jpg?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       },{
         id:172,
         title:'测试名称',
         createTime:'1486137600',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/40f695879c4acce775aba0046bde0bc7?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'前端',
             url:'frontend'
           },{
             id:12,
             title:'后台',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:1,
         isLike: true,
         message:10,
         shortImg:'https://dn-mhke0kuv.qbox.me/50a1f2476c5699928c8d.jpg?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       },{
         id:107,
         title:'测试名称',
         createTime:'1486137600',
         user:{
           name:'周英凯',
           avotar:'https://user-gold-cdn.xitu.io/2016/11/29/40f695879c4acce775aba0046bde0bc7?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1',
         },
         tags:[
           {
             id:10,
             title:'前端',
             url:'frontend'
           },{
             id:12,
             title:'后台',
             url:'backend'
           },{
             id:13,
             title:'设计',
             url:'design'
           }
         ],
         like:1,
         isLike: true,
         message:10,
         shortImg:'https://dn-mhke0kuv.qbox.me/50a1f2476c5699928c8d.jpg?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1'
       }
     ],
     cateFiexd: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (/home/.test(location.pathname)) {
          dispatch({
            type: 'ywj/updateState',
            payload: {
              headerVisible: true , 
              footerVisible: true ,
            },
          })
          dispatch({
            type: 'query',
            payload:location
          })
        }
      })
    },
  },
  effects: { 
    *query({payload},{call,put,select}){
      // const haveBanner = yield select(state=>state.home.haveBanner)
      // let cateFiexd= true
      // window.onscroll = ()=>{
      //   let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      //   console.log(scrollTop)
      //   if(haveBanner && scrollTop==160){
      //      cateFiexd= true
      //   }else{
      //      cateFiexd= true
      //   }   
      // }
      // yield put({
      //   type: 'updateState',
      //   payload:{
      //     cateFiexd: cateFiexd
      //   }
      // })
    },
    *handleLike({payload},{call,put}){
      yield put({
        type: 'updateLike',
        payload:payload
     })
    },
    *login({
      payload
    }, {call, put}) {
      yield put({type: 'showHideLoading'})
      const result = yield call(login, payload)
      if (result.code == '000') {
        loginSuccess(result.data)
        yield put({
          type: 'loginSuccess'
        })
      } else {
        if (result.code == 'A001003') {
          message.error('密码错误')
        } else if (result.code == 'A001002') {
          message.error('账户不存在')
        } else {
          message.error('网络错误，请稍后重试')
        }
        yield put({type: 'loginFail'})
      }
    },
    *register({
      payload
    }, {call, put}) {
      yield put({type: 'showHideLoading'})
      const result = yield call(register, payload)
      if (result.code == '000') {
        loginSuccess(result.data)
        yield put({
          type: 'loginSuccess'
        })
        window.location.reload()
      } else {
        if (result.code == 'valcode_is_error') {
          message.error('注册码错误')
        } else if (result.code == 'A001004') {
          message.error('账户已存在')
        } else {
          message.error('网络错误，请稍后重试')
        }
        yield put({type: 'loginFail'})
      }
    },
    *loginOut({}, {put}){
      kits.setCookies('tf-token', '')
      kits.setCookies('tf-uid', '')
      kits.setCookies('__zwUserInfo__', JSON.stringify({}))
      yield put({
        type: 'updateState'
      })
      window.location.reload()
    },
    *captcha({
      payload
    }, {call}) {
      const result = yield call(captcha, payload)
      if (result.code != '000') {
        message.error('网络错误，请稍后重试')
      }
    },

  },
  reducers: {
    //更新处理 state 值,由传进来的参数决定
    updateState(state, {payload}){
      return {...state, ...payload}
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
