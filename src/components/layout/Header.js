import React, {PropTypes} from 'react'
import {Link} from 'dva/router'
import kits from '../../utils/kits'

const Header = (props) => {
  const userInfo = JSON.parse(kits.getCookies('__zwUserInfo__') || '{}');
  return (
    <div className='header'>
      <Link to={{ pathname: '/login', }} >
              我的作品</Link>
      <Link to={{ pathname: '/home', }} >
              home</Link>
    </div>
  )
}
export default Header


