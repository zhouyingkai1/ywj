/*
文章详情页                        你今天觉得多此一举的注释，很久以后，你会感谢今天的自己
*/
import React,{Component,PropTypes} from 'react'
import {connect} from 'dva';
import styles from './style/artcleDetail.less'
import {Login} from '../../components'
import {routerRedux} from 'dva/router'
import moment from 'moment'
import {Icon, Button, Input, Message, notification} from 'antd'
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
    const report = (type) => {
      notification[type]({
        message: '举报成功',
        description: '我们会尽快处理，谢谢',
        duration:3
      });
    }
    
    const returnDate = (time)=>{
       let dateStr = new Date().valueOf() + ''
       let date = (dateStr.substring(0,dateStr.length-3) - time)/60
       let day = '';
       if(date<=60){
         day = '刚刚'
       }else if(date>60 && date< 1440){
         day = parseInt(date/60) + '小时前'
       }else if(date>=1440 && date< 4320){
         day = parseInt(date/1440) + '天前'
       }else{
         day = moment(Number(time + '000')).format('YYYY-MM-DD')
       }
       return day
    }   
    const commentItem = props.detail.comment.map((item,index)=>{
      return(
        <div key={index} className={styles.commentItem}>
          <h1><img src={item.avator} alt=""/><a href="">{item.userName}</a></h1>
          <h2>{returnDate(item.createTime)}发布</h2>
          {/*<p className={style.txt} dangerouslySetInnerHTML={{__html: props.detail.comment && props.detail.comment.}}></p>*/}
          <p className={styles.txt}>{item.comment}</p>
        </div> 
      )
    })
    return(
      <div>
        <div className={styles.detail}>
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
                <div className={styles.report} onClick={()=>report('info')}>
                    <Icon type="eye-o" />
                    <span>举报</span>
                  </div>
              </div>
            </div>
          </div>
          {/*主体*/}
          <div className={styles.main}>
            <div className={styles.comment}>
              <div className={styles.info}>
                <p><img src="https://dn-mhke0kuv.qbox.me/a15f275512a44b0959c3.jpg?imageView2/1/w/100/h/100/q/85/interlace/1" alt=""/><a href="">周英凯</a></p>
                <h2>{returnDate(props.detail.artcleDetail.createTime)} 发布</h2>
              </div>
              <div className={styles.desc}>
                <p>
                  {props.detail.artcleDetail.desc}
                </p>
              </div>
              <div className={styles.commentMain}>
                <div className={styles.input}>
                  <p><img src="https://dn-mhke0kuv.qbox.me/a15f275512a44b0959c3.jpg?imageView2/1/w/100/h/100/q/85/interlace/1" alt=""/></p>
                  <Input type="textarea"  placeholder='say what are you want to say' autosize={true}/>
                  <div className={styles.subBtn}>
                    <i>评论呗</i>
                    <Button size='large' type='primary'>评论</Button>
                  </div>
                </div>

                <div className={styles.commentBox}>
                  {commentItem}
                </div>
              </div>
            </div>
            <div className={styles.aside}>
              <div className={styles.share}>
                <p>感觉还不错~ 分享到...</p>
                <i>空间</i>
                <i>微信</i>  
                <i>新浪微博</i>  
              </div>
              <div className={styles.tag}>
                <p>分类</p>
                {
                  props.detail.artcleDetail.tags.map((item,index)=>{
                   return(
                      <a href={item.url} key={index}>{item.title}</a>
                    )
                  })
                }
              </div>
              <div className={styles.aboutArtcle}>
                <p>热门相关</p>
                {
                  props.detail.about.map((item,index)=>{
                   return(
                      <div key={index} className={styles.aboutItem}>
                        <a href={item.url}  target='_blank'>{item.title}</a>
                      </div>
                    )
                  })
                }
              </div>
              <div className={styles.likedUser}>
                <p>{props.detail.likedUser.length}人点亮了喜欢...</p>
                {
                  props.detail.likedUser.map((item,index)=>{
                   return(
                      <a href={'/userdetail/'+item.id} key={index}  target='_blank'>
                        <img src={item.avator} alt=""/>
                      </a>
                    )
                  })
                }
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