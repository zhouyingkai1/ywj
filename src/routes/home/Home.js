import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Message, Icon, Pagination} from 'antd';
import styles from './style/home.less'
import {Link} from 'dva/router'
import { routerRedux } from 'dva/router';
import moment from 'moment'
import {ArtcleItem} from '../../components'
import kits from '../../utils/kits'
import isEmpty from 'lodash.isempty'
const Home = (props) => {
  const {categroy,categroyId,allCate,total} = props.home
  const userInfo = JSON.parse(kits.getCookies('ywjUser') || '{}');
  window.onscroll = ()=>{
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    let cateFiexd = false
    if(props.home.haveBanner ){
      if(scrollTop>=160){
        cateFiexd= true
      }else{
        cateFiexd= false
      }
    }else{
        cateFiexd= true
    }
    props.dispatch({
      type: 'home/updateState',
      payload:{
        cateFiexd: cateFiexd
      }
    }) 
  }
  /*切换分类 */
  const changeCategroy = (id)=>{
    document.cookie = 'currPage =' + 1
    props.dispatch({
      type:'home/updateState',
      payload:{
        categroyId: id,
        current:1
      }
    })
    props.dispatch({
      type:'home/query'
    })
  }
  const categroyList = allCate.map((item,index)=>{
    return(
      <li key={index} className={props.home.bigCate == item.id?styles.categroy +' ' +styles.act:styles.categroy}>  
        <p onClick={()=>changeBigCate(item.id)}>{item.title}</p>
        <ul >
          {
            item.tagList&&item.tagList.map((res,index)=>{
              return(
                <li key={index} onClick={()=>changeCategroy(res.id)} className={categroyId == res.id ?styles.categroy+' '+styles.curr:styles.categroy}>
                  {res.title}
                </li>
              )
            })
          }
        </ul>
      </li>
    )
  })
  /**侧边栏 切换大的分类 */
  const changeBigCate = (type)=>{
    // props.dispatch(routerRedux.push('/home/dd'))
    document.cookie = 'currPage =' + 1
    props.dispatch({
      type:'home/updateState',
      payload:{
        bigCate: type,
        categroyId: '',
        current:1
      }
    })
    props.dispatch({
      type:'home/query'
    })
  }
  /*改变排序方式 */
  const changeSort = (type)=>{
    document.cookie = 'ywj-sort =' + type
    props.dispatch({
      type:'home/changeDataBySort',
      payload:{
        sort: type
      }
    })
  }
  /*关闭banner广告 */
  const bannerClose = (e)=>{
    props.dispatch({
      type:'home/updateState',
      payload:{
        haveBanner: false
      }
    })
  }
  const changePage = (page)=>{
    //将页码保存在cookies中，当前页面刷新留在当前页
    document.cookie = 'currPage =' + page
    props.dispatch({
      type:'home/changePage',
      payload:{
        current: page
      }
    })
  }
  const clickHeart = (id)=>{
    if(kits.getCookies('ywj-uid')){
      props.dispatch({
        type:'home/handleLike',
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
  const openLogin = ()=>{
     props.dispatch({
      type:'ywj/updateState',
      payload:{
        showLoginModal: true
      }
    })
  }
  return (
    <div >
      <div className={styles.home}>
         <div className={props.home.haveBanner?styles.banner:styles.banner +' '+styles.noBanner}  >  
            <img src={'http://ossweb-img.qq.com/images/lol/v1/banner/pic-inner-v20.jpg'} alt=""/>
            <Icon type="close-circle" onClick={(e)=>bannerClose(e)}/>
         </div>
         <div className={styles.main}>
           <div className={styles.left}>
             {!isEmpty(userInfo) && kits.getCookies('ywj-uid')? 
               <ul className={props.home.cateFiexd?(props.home.haveBanner?styles.fixed + ' ' +styles.fix:styles.fixed):''}>
                 {categroyList}
               </ul>
               :
               <div className={ props.home.cateFiexd?(props.home.haveBanner?styles.fixed + ' ' +styles.fix + ' ' + styles.loginBox:styles.fixed):styles.loginBox} >
                 <div className={styles.loginMain}>
                    <div className={styles.top}>
                      <h3><a onClick={()=>openLogin()}>登录</a>游无界</h3>
                      <h4>您将获得</h4>
                      <ul>
                        <li>最新的你所关注的新闻动态</li>
                        <li>投稿到游无界，增加你的个人影响力</li>
                        <li>获取最热门的游戏资讯</li>
                      </ul>
                    </div>
                 </div>
               </div>
             }
           </div>
           <div className={styles.right}>
             <div className={styles.sort}>
               <div className={styles.mainSort}>
                 <span className={props.home.sort == 0?styles.act:''} onClick={()=>changeSort(0)}>最热</span> 
                 <span className={props.home.sort == 1?styles.act:''} onClick={()=>changeSort(1)}>最新</span> 
               </div>
               <div className={styles.histroy}>
                  <span className={props.home.sort == 2?styles.act:''} onClick={()=>changeSort(2)}>一周最热</span>
                  <span className={props.home.sort == 3?styles.act:''} onClick={()=>changeSort(3)}>一月最热</span>
               </div>
             </div>
             <ArtcleItem artcleList = {props.home.artcleList} dispatch = {props.dispatch} clickHeart = {clickHeart}/>
             <Pagination defaultCurrent={1} current={props.home.current} onChange={(page)=>{changePage(page)}} pageSize={10} total={total} className={styles.pagination} />
           </div>
         </div>
      </div>
    </div>
  )
}; 
function mapStateToProps(home) {
  return home;
}

export default connect(mapStateToProps)(Home);
