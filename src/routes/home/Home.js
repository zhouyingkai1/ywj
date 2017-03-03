import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Message, Icon} from 'antd';
import styles from './style/home.less'
const Home = (props) => {
  return (
    <div >
      <div className={styles.home}>
         <div className={styles.banner}>  
            <img src={require('../../assets/banner.jpg')} alt=""/>
            <Icon type="close-circle" onClick={(e)=>{e.target.parentNode.style.height=0;e.target.parentNode.style.marginBottom=0;e.target.style.display='none'}}/>
         </div>
         <div className={styles.main}>
           <div className={styles.left}>
             <ul >
               <li className={styles.categroy +' ' +styles.act}>
                 <p>一级</p>
                 <ul >
                   <li className={styles.item+' '+styles.curr}>
                     二级
                   </li>
                   <li className={styles.item}>
                     二级
                   </li>
                 </ul>
               </li>
               <li className={styles.categroy}>
                 <p>一级</p>
                 <ul >
                   <li className={styles.item}>
                     二级
                   </li>
                   <li className={styles.item}>
                     二级
                   </li>
                 </ul>
               </li>
             </ul>
           </div>
           <div className={styles.right}>
             <div className={styles.sort}>
               <span>最热</span> 
               <span>最新</span> 
             </div>
             <div className={styles.right}>
               <span>一周最热</span>
               <span>一月最热</span>
             </div>
             <div className={styles.itemList}>
               <div className={styles.item}>
                 2222
               </div>
               <div className={styles.item}>
                 2222
               </div>
             </div>
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
