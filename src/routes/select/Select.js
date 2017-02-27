import React, {Component,PropTypes} from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'
import {Button} from 'antd'
import styles from './styles/select.less'

const Select = (props)=>{
  const {select} = props
  console.log(select,'dd')
  const clickLike = (id)=>{
    props.dispatch({
      type:'select/updateState',
      payload:id
    })
    let likeArr = []
    const liked = select.tags.filter(item=>{
      if(item.isLike){
        likeArr.push(item.id)
        return item
      }else{
        return false
      }
    })
    props.dispatch({
      type:'select/update',
      payload:{
        liked: likeArr
      }
    })
  }
  const tagList = select.tags.map((item,index)=>{
    return(
      <div key={index} className={styles.item}>
        <p><img src={item.img}/></p>
        <h5>{item.name}</h5>
        <Button onClick={()=>clickLike(item.id)} className={item.isLike?styles.btn + ' ' + styles.act: styles.btn}>{item.isLike?'已关注':'关注'}</Button>
      </div>
    )
  })
    
    return(
      <div className={styles.main}>
        <div className={styles.top}>
          <h2><img src={require('../../assets/logo-b.png')} alt=""/></h2>
          <h3>请选择您喜欢的标签</h3>
          <h4>我们将按您的喜好进行内容推荐</h4>
        </div>
        <div className={styles.list}>
          {tagList}
        </div>
        <div className={styles.next}>
          <Button size={'large'} type='primary' disabled={select.liked.length>0?false:true}>完成</Button>
        </div>
      </div>  
    )
}

function mapStateToProps(select){
  return select
}
export default connect(mapStateToProps)(Select)