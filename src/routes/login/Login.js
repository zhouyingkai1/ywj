import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router'
import {Form, Icon, Input, Button,Message} from 'antd';
import style from './styles/login.less';
const FormItem = Form.Item;
const Login = (props) => {
  const {getFieldDecorator} = props.form
  const handleSubmit = (e)=> {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
       if(!props.login.status){
          props.dispatch({
            type: 'login/login',
            payload:{...values}
          })
       }else{
          props.dispatch({
            type: 'login/register',
            payload:{...values}
          })
       }
      }
    });
  } 
  const goRegister = (status)=>{
    props.dispatch({
      type: 'login/updateState',
      payload: {
        status: status
      }
    })
  }
  let classNames ='' ;
  if(props.login.status){
    // classNames += 'bg'+ ' '+'scale'
    classNames += 'bg'
  }else{
    classNames ='bg'
  }
  return (
    <div >
      <div className='login'>
          <div className='main'>
            <div className='logo'>
                
            </div>
            <div className='form'>
              <div className={classNames} ></div>
              <div className='mainbg'>
                <h3>{props.login.status==0?'用户登录':'用户注册'}</h3>
                {props.login.status==0?
                  <div>
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
                          <Input type='password' addonBefore={<Icon type="lock" />} placeholder="请输入密码" />
                        )}
                      </FormItem>
                      <a href="javascript:" onClick={()=>{Message.info('请联系管理员')}}>忘记密码</a>
                      <Button type="primary" htmlType="submit"  className="login-form-button">
                        登 录
                      </Button>
                    </Form>
                    <p className='go-register'>还未注册?<span onClick={()=>goRegister(1)}>点击注册</span></p>
                  </div>
                : 
                  <div>
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
                          <Input type='password' addonBefore={<Icon type="lock" />} placeholder="请输入密码" />
                        )}
                      </FormItem>
                      <Button type="primary" htmlType="submit"  className="login-form-button">
                        注 册
                      </Button>
                    </Form>
                    <p className='go-register'>已有账号?<span onClick={()=>goRegister(0)}>点击登录</span></p>
                  </div>
                }
              </div> 
            </div>
          </div>
          <div className='footer'>
               <Link to={{ pathname: '/login'}}>
              无界协议</Link>
              <Link to={{ pathname: '/login' }}>
              无界帮助</Link>
              <Link to={{ pathname: '/login' }}>
              联系我们</Link>
              <Link to={{ pathname: '/login' }}>
              关于我们</Link>
            </div>
      </div>
    </div>
  )
}; 
function mapStateToProps(login) {
  return login;
}

export default connect(mapStateToProps)(Form.create()(Login));
