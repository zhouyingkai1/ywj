import React, {PropTypes} from 'react'
import {Link} from 'dva/router'
import kits from '../../utils/kits'

const Header = (props) => {
  const userInfo = JSON.parse(kits.getCookies('__zwUserInfo__') || '{}');
  return (
    <div className='header'>
     this is header
    </div>
  )
}
export default Header


