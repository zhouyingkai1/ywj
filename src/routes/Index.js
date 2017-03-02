/**
 * 首页
 * Created by MFChen on 22/12/2016.
 */
import React, {PropTypes} from 'react'
import {connect} from 'dva'

import Header from '../components/layout/Header.js'
import Footer from '../components/layout/Footer.js'


const Index = (props) => {
  return (
    <div>
      {props.ywj.headerVisible?<Header {...props}/>:null}
      <div>
        {props.children}
      </div>
       {props.ywj.footerVisible?<Footer {...props}/>:null}
    </div>
  )
}

function mapStateToProps(ywj) {
  return ywj;
}

export default connect(mapStateToProps)(Index);

