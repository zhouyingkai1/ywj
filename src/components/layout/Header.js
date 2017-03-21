import React, {PropTypes} from 'react'
import {Link} from 'dva/router'
import kits from '../../utils/kits'
import styles from './style/header.less'
import {Input,  Icon, Button,Message} from 'antd'
const Search =Input.Search
import isEmpty from 'lodash.isempty'
import Login from './Login'
import {routerRedux} from 'dva/router'
const Header = (props) => {
  const userInfo = JSON.parse(kits.getCookies('__ywjUserInfo__') || '{}');
  const openDialog = (type)=>{
   props.dispatch({
     type:'ywj/updateState',
     payload:{
       showLoginModal:true
     }
  })
 }
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <div className={styles.logo}>
            <a href='/'><img src={require('../../assets/logo-m2.png')} alt=""/></a>
          </div>
          <div className={styles.search}>
            <Search placeholder="搜索真的可以用 我不骗你"/>
          </div>
          <div className={styles.txt}>
            <span><a href="/#/submit" target='_blank'>上传内容</a></span>
            <span onClick={()=>props.dispatch(routerRedux.push('/home'))}>首页</span>
          </div>
          <div className={styles.user}>
            {!isEmpty(userInfo) && kits.getCookies('ywj-uid') && kits.getCookies('ywj-token') ?
              <div className='login-btn'>
                <span>{'欢迎您，' + userInfo.nickname}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span onClick={() => props.onLoginOut()}>退出</span>
              </div> 
            : 
              <div className={styles.loginBtn}>
                <span onClick={() =>openDialog(1)}>登录</span>
                <span ><Link to={'/login?from=other'}>注册</Link></span>
              </div>}
          </div>
        </div>
      </div>
      {/*登陆 注册弹窗*/}
      <Login {...props}/>
    </div>
  )
}
export default Header


