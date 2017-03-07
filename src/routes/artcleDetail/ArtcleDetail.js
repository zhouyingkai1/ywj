import React,{Component,PropTypes} from 'react'
import {connect} from 'dva';
import styles from './style/artcleDetail.less'
import {Login} from '../../components'
import {Icon, Button, Message} from 'antd'
const ArtcleDetail = (props)=>{
    const openDialog = (type)=>{
      props.dispatch({
        type:'ywj/updateState',
        payload:{
          showLoginModal:true
        }
      })
    }
    const clickHeart = (id)=>{
      props.dispatch({
        type:'home/handleLike',
        payload:id
      })
    }
    const clickReport = (id)=>{
      props.dispatch({
        type:'home/handleLike',
        payload:id
      })
    }
    let item={
      isLike:true
    }
    return(
      <div>
        <div className={styles.detail}>
          <div className={styles.close}>
            <Icon type="close-circle-o" />
          </div>
          <div className={styles.top}>
            <div className={styles.topBg} style={{backgroundImage:'url(https://dn-mhke0kuv.qbox.me/a39eefc2ec6230c8a4b2.png?imageView/2/w/800/h/400/q/100/format/png)'}}></div>
            <div className={styles.topMain}>
              <h2><a href='' target='_blank'>这是一个标题</a></h2>
              <div className={styles.info}>
                <a href='' target='_blank'>阅读全文</a>
                <div className={item.isLike?styles.like+' '+styles.act:styles.like} onClick={()=>clickHeart(1)}>
                  <Icon type="heart" />
                  <span>12</span>
                </div>
                <div className={styles.report} onClick={()=>clickReport(1)}>
                    <Icon type="eye-o" />
                    <span>举报</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <Login {...props}/>
      </div>    
    )
}
const mapStateToProps=detail=>detail

export default connect(mapStateToProps)(ArtcleDetail)