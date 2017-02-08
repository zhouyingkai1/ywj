import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Message} from 'antd';

const Login = (props) => {
  return (
    <div >
      <div className='login'>
          home
      </div>
    </div>
  )
}; 
function mapStateToProps(login) {
  return login;
}

export default connect(mapStateToProps)(Login);
