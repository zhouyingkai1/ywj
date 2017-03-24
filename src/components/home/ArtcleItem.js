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
    let date = (dateStr.substring(0,dateStr.length-3) - (item.createTime-28800))/60
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
    const goDetail = (event,id)=>{
       if(/div/.test(event.target.id)){
         console.log('详情') 
       }
    }   
    return(
        <div key={index}  className={styles.item} >
          <div className={styles.shortImg} style={{backgroundImage:'url('+item.shortImg+') '}}>
            <a target='_blank' href={item.url} style={{display:'block',position:'relative',zIndex:'3',height:'100%'}}></a>
          </div>
          <div className={styles.itemMain} id={'div' + index} onClick={(event)=>goDetail(event,item.id)}>
            <h2><a target='_blank' href={item.url}>{item.title}</a></h2>
            <div className={styles.time}>{day}发布</div>
            <div className={styles.infoBox}>
              <div className={styles.itemLeft}>
                <div className={item.isLike?styles.like+' '+styles.act:styles.like} onClick={()=>clickHeart(item.id)}>
                  <Icon type="heart" />
                  <span>{item.like>0?item.like:''}</span>
                </div>
                <div className={styles.mess} >
                  <a target='_blank' href={'/#/detail/' + item.id}>
                    <Icon type="message" />
                    <span>{item.message>0?item.message:''}</span>
                  </a>
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
                  <img src={item.user.avator} alt=""/>
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
