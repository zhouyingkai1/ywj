/*
文章详情页                        你今天觉得多此一举的注释，很久以后，你会感谢今天的自己
*/
import React,{Component,PropTypes} from 'react'
import {connect} from 'dva';
import styles from './style/artcleDetail.less'
import {Login} from '../../components'
import {routerRedux} from 'dva/router'
import {Icon, Button, Message, notification} from 'antd'
const ArtcleDetail = (props)=>{
  const {artcleDetail} = props.detail
  //打开登陆框
    const openDialog = (type)=>{
      props.dispatch({
        type:'ywj/updateState',
        payload:{
          showLoginModal:true
        }
      })
    }
    //点赞 
    const clickHeart = (id)=>{
      props.dispatch({
        type:'detail/handleLike',
        payload:{
          artcleDetail:{
            isLike: !artcleDetail.isLike
          }
        }
      })
    }
    const clickReport = (id)=>{
      props.dispatch({
        type:'detail/handleReport',
        payload:id
      })
    }
    // 举报提醒文案
    const openNotificationWithIcon = (type) => {
      notification[type]({
        message: '举报成功',
        description: '我们会尽快处理，谢谢',
        duration:3
      });
    }
    // 退出详情页
    const closeDetail = ()=>{
      props.dispatch(routerRedux.push('/home'))
    }
    return(
      <div>
        <div className={styles.detail}>
          <div className={styles.close} onClick={()=>closeDetail()}>
            <Icon type="close-circle-o" />
          </div>
          <div className={styles.top}>
            <div className={styles.topBg} style={{backgroundImage:'url('+ artcleDetail.shortImg +')'}}></div>
            <div className={styles.topMain}>
              <h2><a href={artcleDetail.rul} target='_blank'>{artcleDetail.title}</a></h2>
              <div className={styles.info}>
                <a href={artcleDetail.url} target='_blank'>阅读全文</a>
                <div className={artcleDetail.isLike?styles.like+' '+styles.act:styles.like} onClick={()=>clickHeart(1)}>
                  <Icon type="heart" />
                  <span>{artcleDetail.like}</span>
                </div>
                <div className={styles.report} onClick={()=>openNotificationWithIcon('info')}>
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