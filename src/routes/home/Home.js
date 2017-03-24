import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Message, Icon, Pagination} from 'antd';
import styles from './style/home.less'
import {Link} from 'dva/router'
import { routerRedux } from 'dva/router';
import moment from 'moment'
import {ArtcleItem} from '../../components'
import kits from '../../utils/kits'
const Home = (props) => {
  const {categroy,categroyId,allCate,pagination} = props.home
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
    props.dispatch({
      type:'home/updateState',
      payload:{
        categroyId: id
      }
    })
  }
  const categroyHtml = categroy.map((item,index)=>{
    return (
      <li key={index} onClick={()=>changeCategroy(item.id)} className={categroyId == item.id ?styles.categroy+' '+styles.curr:styles.categroy}>
            {item.title}
      </li>
    )
  })
  const changeAllCate = (id)=>{
    props.dispatch({
      type:'home/updateState',
      payload:{
        allCateId: id
      }
    })
  }
  /*侧边栏 */
  const allCateHtml = allCate.map((item,index)=>{
    return (
      <li key={index} onClick={()=>changeAllCate(item.id)} className={props.home.allCateId == item.id ?styles.categroy+' '+styles.curr:styles.categroy}>
            {item.title}
      </li>
    )
  })
  /**侧边栏 切换大的分类 */
  const changeBigCate = (type)=>{
    // props.dispatch(routerRedux.push('/home/dd'))
    props.dispatch({
      type:'home/updateState',
      payload:{
        bigCate: type
      }
    })
  }
  /*改变排序方式 */
  const changeSort = (type)=>{
    document.cookie = 'ywj-sort =' + type
    props.dispatch({
      type:'home/updateState',
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

  return (
    <div >
      <div className={styles.home}>
         <div className={props.home.haveBanner?styles.banner:styles.banner +' '+styles.noBanner}  >  
            <img src={'http://img1.timeface.cn/story/c141b4de167069ba82156c78bbab854f.jpg'} alt=""/>
            <Icon type="close-circle" onClick={(e)=>bannerClose(e)}/>
         </div>
         <div className={styles.main}>
           <div className={styles.left}>
             <ul className={props.home.cateFiexd?(props.home.haveBanner?styles.fixed + ' ' +styles.fix:styles.fixed):''}>
               <li className={props.home.bigCate == 1?styles.categroy +' ' +styles.act:styles.categroy}>
                 <p onClick={()=>changeBigCate(1)}>一级</p>
                 <ul >
                   {categroyHtml}
                 </ul>
               </li>
               <li className={props.home.bigCate == 2?styles.categroy +' ' +styles.act:styles.categroy}>
                 <p onClick={()=>changeBigCate(2)}>二级</p>
                 <ul >
                   {allCateHtml}
                 </ul>
               </li>
             </ul>
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
             <ArtcleItem {...props}/>
             <Pagination defaultCurrent={1} current={props.home.current} onChange={(page)=>{changePage(page)}} pageSize={10} total={pagination.total} className={styles.pagination} />
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
