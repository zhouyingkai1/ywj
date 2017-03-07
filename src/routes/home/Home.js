import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Message, Icon, Pagination} from 'antd';
import styles from './style/home.less'
import {Link} from 'dva/router'
import { routerRedux } from 'dva/router';
import moment from 'moment'
import {ArtcleItem} from '../../components'
const Home = (props) => {
  const {categroy,categroyId,allCate} = props.home
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
  const allCateHtml = allCate.map((item,index)=>{
    return (
      <li key={index} onClick={()=>changeAllCate(item.id)} className={props.home.allCateId == item.id ?styles.categroy+' '+styles.curr:styles.categroy}>
            {item.title}
      </li>
    )
  })
  const changeBigCate = (type)=>{
    // props.dispatch(routerRedux.push('/home/dd'))
    props.dispatch({
      type:'home/updateState',
      payload:{
        bigCate: type
      }
    })
  }
  const changeSort = (type)=>{
    props.dispatch({
      type:'home/updateState',
      payload:{
        sort: type
      }
    })
  }
  
  const bannerClose = (e)=>{
    props.dispatch({
      type:'home/updateState',
      payload:{
        haveBanner: false
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
                 <span className={props.home.sort == 'hot'?styles.act:''} onClick={()=>changeSort('hot')}>最热</span> 
                 <span className={props.home.sort == 'new'?styles.act:''} onClick={()=>changeSort('new')}>最新</span> 
               </div>
               <div className={styles.histroy}>
                  <span className={props.home.sort == 'week'?styles.act:''} onClick={()=>changeSort('week')}>一周最热</span>
                  <span className={props.home.sort == 'month'?styles.act:''} onClick={()=>changeSort('month')}>一月最热</span>
               </div>
             </div>
             <ArtcleItem {...props}/>
             <Pagination defaultCurrent={1} pageSize={15} total={500} className={styles.pagination} />
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
