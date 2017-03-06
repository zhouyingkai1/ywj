import React, {Component, PropTypes} from 'react';
import {Message, Icon} from 'antd';
import {Link} from 'dva/router'
import { routerRedux } from 'dva/router';
import moment from 'moment'
import styles from './style/artcleItem.less'
const ArtcleItem = (props) => {
  const clickHeart = (id)=>{
    props.dispatch({
      type:'home/handleLike',
      payload:id
    })
  }
  const item = props.home.artcleList.map((item,index)=>{
    let dateStr = new Date().valueOf() + ''
    let date = (dateStr.substring(0,dateStr.length-3) - item.createTime)/60
    let day = '';
    if(date<=60){
      day = '刚刚'
    }else if(date>60 && date< 1440){
      day = parseInt(date/60) + '小时前'
    }else if(date>=1440 && date< 4320){
      day = parseInt(date/1440) + '天前'
    }else{
      day = moment(Number(item.createTime + '000')).format('YYYY-MM-DD')
    }    
    return(
        <div key={index} className={styles.item}>
          <div className={styles.shortImg} style={{backgroundImage:'url('+item.shortImg+') '}}></div>
          <div className={styles.itemMain}>
            <h2><Link to={'/'}>{item.title}</Link></h2>
            <div className={styles.time}>{day}</div>
            <div className={styles.infoBox}>
              <div className={styles.itemLeft}>
                <div className={item.isLike?styles.like+' '+styles.act:styles.like} onClick={()=>clickHeart(item.id)}>
                  <Icon type="heart" />
                  <span>{item.like>0?item.like:''}</span>
                </div>
                <div className={styles.mess}>
                  <Icon type="message" />
                  <span>{item.message>0?item.message:''}</span>
                </div>
              </div>
              <div className={styles.itemRight}>
                <div className={styles.tags}>
                  <Icon type="tags-o" />
                  {item.tags.map((tag,index)=>{
                    return(
                      <Link key={index} to={'/'+tag.url}>{tag.title}</Link>
                    )
                  })}
                </div> 
                <div className={styles.avotar}>
                  <img src={item.user.avotar} alt=""/>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  })
  return (
      <div className={styles.itemList}>
        {item}
      </div>      
  )
}; 


export default ArtcleItem;
