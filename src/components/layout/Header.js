import React, {PropTypes} from 'react'
import {Link} from 'dva/router'
import kits from '../../utils/kits'
import styles from './style/header.less'
import {Input, Form, Icon, Button,Message} from 'antd'
const Search =Input.Search
import isEmpty from 'lodash.isempty'
import router from '../../router'
const Header = (props) => {
  const userInfo = JSON.parse(kits.getCookies('__ywjUserInfo__') || '{}');
  const FormItem = Form.Item;
  const {getFieldDecorator} = props.form
  const handleSubmit = (e)=> {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.dispatch({
          type: 'login/login',
          payload:{...values}
        })
      }
    });
  } 
 const openDialog = (type)=>{
   let showLoginModal = false
   if(type){
     showLoginModal = true
   }else{
     showLoginModal = false
   }
   props.dispatch({
     type:'ywj/updateState',
     payload:{
       showLoginModal:showLoginModal
     }
  })
 }
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <div className={styles.logo}>
            <a href='/'><img src={require('../../assets/logo-m.png')} alt=""/></a>
          </div>
          <div className={styles.search}>
            <Search placeholder="搜索真的可以用 我不骗你"/>
          </div>
          <div className={styles.txt}>
            <span>上传内容</span>
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
      <div className={props.ywj.showLoginModal?'act loginModal':'loginModal'}>
      {/*<div className={'loginModal' + ' ' + 'act'}>*/}
        <div className="close" onClick={() =>openDialog(0)}><Icon type="close-circle-o" /></div>
        <div className='form'>
          <div>
            <div className='modalLogo'></div>
            <h3>用户登录</h3>
            <Form onSubmit={(e)=>handleSubmit(e)} className="login-form">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '登录名不得为空' }],
                })(
                  <Input addonBefore={<Icon type="user" />} placeholder="请输入登录名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('passWord', {
                  rules: [{ required: true, message: '请输入正确的密码' }],
                })(
                  <Input addonBefore={<Icon type="lock" />} placeholder="请输入密码" />
                )}
              </FormItem>
              <Button type="primary" htmlType="submit"  className="login-form-button">
                登 录
              </Button>
            </Form>
            <p className='go-register'>还未注册?<span> <Link to={'/login?from=other'}>点击注册 </Link></span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Form.create()(Header)


