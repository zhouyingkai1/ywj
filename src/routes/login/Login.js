import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button,Message} from 'antd';
import styles from './styles/login.less';

const Login = (props) => {
   
  return (
    <div >
      <div className='login'>
          div.banner
      </div>
    </div>
  )
}; 
function mapStateToProps(login) {
  return login;
}

export default connect(mapStateToProps)(Login);
