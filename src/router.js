import React from 'react';
import {Router, routerRedux, browserHistory} from 'dva/router';
import kits from './utils/kits'
import {unKnownMenu} from './utils/'
export default function ({history, app}) {
  const routes = [
    {
      name: 'ywj',  
      path: '/',
      // indexRoute: {
      //   onEnter: (nextState, replace) => replace('/zw/rules')
      // },
      getComponent({}, cb) {
        require.ensure([], require => {
          app.model(require('./models/indexModel'))
          cb(null, require('./routes/index'))
        });
      },
      childRoutes: [
        {
          name: 'home',
          path: 'home/:id',
          getComponent({}, cb) {
            require.ensure([], require => {
              app.model(require('./models/homeModel'))
              cb(null, require('./routes/home/home'))
            });
          }
        },{
          name: 'home',
          path: 'home',
          getComponent({}, cb) {
            require.ensure([], require => {
              app.model(require('./models/homeModel'))
              cb(null, require('./routes/home/home'))
            });
          }
        },
        {
          name: 'login',
          path: 'login',
          getComponent({}, cb) {
            require.ensure([], require => {
              app.model(require('./models/loginModel'))
              cb(null, require('./routes/login/login'))
            });
          }
        },
        {
          name: 'select',
          path: 'select',
          getComponent({}, cb) {
            require.ensure([], require => {
              app.model(require('./models/selectModel'))
              cb(null, require('./routes/select/Select'))
            });
          }
        },
        {
          name: 'artcleDetail',
          path: 'detail',
          getComponent({}, cb) {
            require.ensure([], require => {
              app.model(require('./models/detailModel'))
              cb(null, require('./routes/artcleDetail/ArtcleDetail'))
            });
          }
        },
        {
          name: 'user',
          path: 'user/:id',
          getComponent({}, cb) {
            require.ensure([], require => {
              app.model(require('./models/userModel'))
              cb(null, require('./routes/user/User'))
            });
          }
        },
        {
          name: 'tags',
          path: 'tags',
          getComponent({}, cb) {
            require.ensure([], require => {
              app.model(require('./models/tagsModel'))
              cb(null, require('./routes/tags/Tags'))
            });
          }
        },
        {
          name: 'submit',
          path: 'submit',
          getComponent({}, cb) {
            require.ensure([], require => {
              app.model(require('./models/submitModel'))
              cb(null, require('./routes/submit/Submit'))
            });
          }
        },
        {
          name: 'submitsuccess',
          path: 'submitsuccess',
          getComponent({}, cb) {
            require.ensure([], require => {
              app.model(require('./models/submitSuccessModel'))
              cb(null, require('./routes/submitSuccess/SubmitSuccess'))
            });
          }
        },
        
      ]
    }
  ];

  //监听路由变化
  browserHistory.listen(location => {
    console.log('监听路由变化')
    // if(/zw/.test(location.hash)){
    //   const token = kits.getCookies('tf-token')
    //   const uid = kits.getCookies('tf-uid')
    //   if (uid && token) {
    //     // app._store.dispatch(routerRedux.replace({pathname: '/zw/rules', query: location.query.id}))
    //   }else{
    //     //TODO 弹出登录弹窗
    //   }
    // }else{
    //   // if(/\//.test(location.hash)){
    //   //   app._store.dispatch(routerRedux.replace({pathname: '/zw/error'}))
    //   //   return
    //   // }
    //   app._store.dispatch({
    //     type: 'main/updateState',
    //     payload: {
    //       breadAppend: null
    //     }
    //   })

    //   const token = kits.getCookies('zw-token')
    //   const uid = kits.getCookies('zw-uid')
    //   if (new RegExp('login').test(location.hash)) {
    //     if (uid && token) {
    //       app._store.dispatch(routerRedux.replace('/main'))
    //     }
    //   } else {
    //     if (!uid || !token) {
    //       app._store.dispatch(routerRedux.replace('/login'))
    //     }
    //   }
    //   const pathArray = location.hash.split('/')

    //   app._store.dispatch({
    //     type: 'main/updateState',
    //     payload: {
    //       breadAppend: pathArray[3] && pathArray[3].split('?')[0] && unKnownMenu[pathArray[3].split('?')[0]]
    //     }
    //   })
    // }
  })

  return <Router history={history} routes={ routes }/>;
}

