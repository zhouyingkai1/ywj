import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {Button, Icon, Input, Message, Pagination} from 'antd'
import styles from './styles/user.less'
import kits from '../../utils/kits'
import ArtcleItem from '../../components/home/ArtcleItem'
const User = (props)=>{
  const {artcleList,total,userInfo} = props.user
  const clickHeart = (id)=>{
    if(kits.getCookies('ywj-uid')){
      props.dispatch({
        type:'user/handleLike',
        payload:id
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
  const changePage=(page)=> {
    console.log(location)
    props.dispatch({
      type:'user/changePage',
      payload:{
        current: page
      }
    })
  }
  return(
    <div className={styles.user}>
       <div className={styles.userInfo}>
         <p><img src={userInfo.avator || 'http://static.timeface.cn/times/004b9970a15e223ea0a03c96c9e566f7.jpg@86w_2o'} alt=""/></p>
         <h1>{userInfo.loginName}</h1>
         <h3>{userInfo.desc || '这家伙很懒，什么都没说'}</h3>
         {/*<h4>发布文章</h4>*/}
       </div>
       <div className={styles.artcleList}>
         <div className={styles.tab}>
           <ul className={styles.tabLeft}>
             <li className={styles.act}>喜欢文章 {total || 0} 篇</li>
             <li>关注标签</li>
           </ul>
         </div>
         <div className={styles.container}>
           <div className={styles.likeArtcle}>
             <ArtcleItem dispatch = {props.dispatch} artcleList = {artcleList} clickHeart = {clickHeart}></ArtcleItem> 
             {
               total>0?
               <Pagination defaultCurrent={1} current={props.user.current} onChange={(page)=>{changePage(page)}} pageSize={10} total={total} className={styles.pagination} />
                :null
             }
           </div>
         </div>
       </div>
    </div>
  )
}
const mapStateToProps = (user)=>user
export default connect(mapStateToProps)(User)