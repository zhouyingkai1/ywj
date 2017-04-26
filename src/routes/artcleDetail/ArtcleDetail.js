/*
文章详情页          
*/
import React,{Component,PropTypes} from 'react'
import {connect} from 'dva';
import styles from './style/artcleDetail.less'
import {Login} from '../../components'
import {routerRedux} from 'dva/router'
import moment from 'moment'
import {Icon, Button, Input, Message, Pagination, notification} from 'antd'
import {calculateImageMD5} from '../../utils/uploadHelper'
import kits from '../../utils/kits'
// import ScrollToTop from 'react-scroll-up';
const ArtcleDetail = (props)=>{
  const {artcleDetail} = props.detail
  const userInfo = JSON.parse(kits.getCookies('ywjUser') || '{}');
    //点赞 
    const clickHeart = (id)=>{
      if(kits.getCookies('ywj-uid')){
         props.dispatch({
          type:'detail/handleLike',
          payload:{
            artcleDetail:{
              isLike: !artcleDetail.isLike
            },
            artcleId: id
          }
        })
      }else{
        Message.info('请先登录')
        props.dispatch({
          type:'ywj/updateState',
          payload:{
            showLoginModal: true
          }
        })
      }
    }
    // 举报提醒文案
    const report = (type) => {
      if(kits.getCookies('ywj-uid')){
        notification[type]({
          message: '举报成功',
          description: '我们会尽快处理，谢谢',
          duration:3
        });
      }else{
        Message.info('请先登录')
        props.dispatch({
          type:'ywj/updateState',
          payload:{
            showLoginModal: true
          }
        })
      }
    }
    
    const returnDate = (time)=>{
       let dateStr = new Date().valueOf() + ''
       let date = (dateStr.substring(0,dateStr.length-3) - (time-21688))/60
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
    // 点赞或取消点赞某条评论
    const handleLikeCom = (id)=>{
      if(kits.getCookies('ywj-uid')){
        props.dispatch({
          type:'detail/handleLikeCom',
          payload:{
            artcleId: kits.getHashStringArgs().id,
            commentId: id,
          }
        })
      }else{
        Message.info('请先登录')
        props.dispatch({
          type:'ywj/updateState',
          payload:{
            showLoginModal: true
          }
        })
      }
    }
    //循环评论列表
    const commentItem = props.detail.comment.data.map((item,index)=>{
      return(
        <div key={index} className={styles.commentItem}>
          <h1><a href={'/#/user/' + item.userId} target="_blank"><img src={item.avator} alt=""/>{item.userName}</a></h1>
          {/*<p className={style.txt} dangerouslySetInnerHTML={{__html: props.detail.comment && props.detail.comment.}}></p>*/}
          <p className={styles.txt}>{item.comment}
            {item.pic?<img src={item.pic} alt=""/>: null}
          </p>
          <h4 className={item.isLike?styles.act:null} onClick={()=>handleLikeCom(item.id)}><Icon type="like" /><b>{item.likeCommentNum}</b></h4>
          <h2>{returnDate(item.createTime)}发布</h2>
        </div> 
      )
    })
   const submitComment = ()=>{
     let comment = document.querySelector('#comment');
     if(comment.value){
       if(kits.getCookies('ywj-uid')){
        props.dispatch({
          type:'detail/submitComment',
          payload:{
            comment: comment.value,
            userId: kits.getCookies('ywj-uid'),
            artcleId: kits.getHashStringArgs().id,
            pic: props.detail.commentPic
          }
        })
        comment.value = ''
        props.dispatch({
          type:'detail/updateState',
          payload:{
            commentPic: ''
          }
        })
       }else{
        Message.info('请先登录')
        props.dispatch({
          type:'ywj/updateState',
          payload:{
            showLoginModal: true
          }
        })
       }
      
     }else{
       Message.error('请输入评论内容')
     }
   }
   const onUpload = (file,callback)=>{
    calculateImageMD5(file,(filename)=>{
      props.dispatch({
        type: 'upload/upload',
        file,
        filename,
        callback
      })
      
    })
  };
   const handleUpload = (e) => {
      onUpload(e.target.files[0],(result)=>{
        if(result.code == 'NPRGB'){
          return false
        }
        props.dispatch({
          type: 'detail/updateState',
          payload: {
              commentPic: result.image_url
          }
        })
      })
      return false
    }
    const deleImg = ()=>{
      props.dispatch({
        type: 'detail/updateState',
        payload: {
            commentPic: ''
        }
      })
    }
    const changePage = (page)=>{
      props.dispatch({
        type:'detail/changePage',
        payload:{
          currentPage: page,
          id: kits.getHashStringArgs().id,
        }
      })
    }
    return(
      <div>
        <div className={styles.detail}>
          <div className={styles.top}>
            <div className={styles.topBg} style={{backgroundImage:'url('+ artcleDetail.img +')'}}></div>
            <div className={styles.topMain}>
              <h2><a href={artcleDetail.url} target='_blank'>{artcleDetail.title}</a></h2>
              <div className={styles.info}>
                <a href={artcleDetail.url} target='_blank'>阅读全文</a>
                <div className={artcleDetail.isLike?styles.like+' '+styles.act:styles.like} onClick={()=>clickHeart(artcleDetail.id)}>
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
                <p><a href={'/#/user/' + artcleDetail.userId} target="_blank"><img src={artcleDetail.user.avator} alt=""/>{artcleDetail.user.loginName}</a></p>
                <h2>{returnDate(artcleDetail.createTime)} 发布</h2>
              </div>
              <div className={styles.desc}>
                <p>
                  {artcleDetail.artcleDesc}
                </p>
              </div>
              <div className={styles.commentMain}>
                <div className={styles.input}>
                  <p><img src={userInfo.userAvator || 'http://gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg'} alt=""/></p>
                  <Input type="textarea" id='comment' placeholder='say what are you want to say' autosize={true}/>
                  <div className={styles.pic}>
                    {props.detail.commentPic?
                      <div className={styles.picBox}>
                        <u onClick={()=>deleImg()}><Icon type="close-circle" title='删除照片' /></u>
                        <img src={props.detail.commentPic} alt=""/>
                      </div>
                      :
                      <div className={styles.uploadBtn}>
                        <input type="file" id='uploadTxt' onChange={(e)=>handleUpload(e)} title=' '/>
                        <Icon type="picture" /><i>上传图片</i>
                      </div>
                    }
                  </div>
                  <div className={styles.subBtn}>
                    <i>知道你有很多想说</i>
                    <Button size='large' onClick={()=>submitComment()} type='primary'>评论</Button>
                  </div>
                </div>

                <div className={styles.commentBox}>
                  <h3>{props.detail.comment.total ?props.detail.comment.total + '条评论' : '暂无评论'}</h3>
                  {commentItem}
                  {props.detail.comment.total>0?
                    <Pagination defaultCurrent={1} current={props.detail.currentPage} onChange={(page)=>{changePage(page)}} pageSize={10} total={props.detail.comment.total} className={styles.pagination} />
                    : <i>快来抢沙发吧！</i>
                  }
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
                  artcleDetail.tags.map((item,index)=>{
                   return(
                      <a href={'/#/tags/'} key={index}>{item.title}</a>
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
                      <a href={'/#/user/'+item.id} key={index}  target='_blank'>
                        <img src={item.userAvator} alt=""/>
                      </a>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        {/*<ScrollToTop showUnder={100} >
          <div className="tFscrollTOP">222222</div>
        </ScrollToTop>*/}
      </div>    
    )
}
const mapStateToProps=detail=>detail

export default connect(mapStateToProps)(ArtcleDetail)