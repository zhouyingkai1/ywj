import React, {PropTypes} from 'react'
import {Link} from 'dva/router'
import {Input, Form, Icon, Button,Message} from 'antd'
const Login = (props) => {
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
 const closeDialog = ()=>{
   props.dispatch({
     type:'ywj/updateState',
     payload:{
       showLoginModal:false
     }
  })
 }
  return (
    <div>
      {/*登陆 注册弹窗*/}
      <div className={props.ywj.showLoginModal?'act loginModal':'loginModal'}>
      {/*<div className={'loginModal' + ' ' + 'act'}>*/}
        <div className="close" onClick={() =>closeDialog()}><Icon type="close-circle-o" /></div>
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
export default Form.create()(Login)


