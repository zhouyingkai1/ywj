import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {Button, Icon, Input} from 'antd'
import styles from './styles/submit.less'
const Submit = (props)=>{
  console.log(props)
  const addTag = (id)=>{
    props.dispatch({
      type:'submit/updateState',
      payload:{
        selectTag: id
      }
    })
  }
  return(
    <div className={styles.upload}>
       <div className={styles.container}>
         <div className={styles.form}>
          <h2>感谢你分享优质内容到游无界</h2>
          <h3>为保证分享质量，文章需要短暂的审核时间</h3>
          <div className={styles.input}>
            <Input  placeholder='分享网址 http://'/>
            <Input  placeholder='标题'/>
            <Input type='textarea' placeholder='描述'/>
          </div>
          <div className={styles.tag}>
            <i>选择分类</i>
            <ul>
              {
              props.submit.tags.map((item,index)=>{
                return(
                  <li key={index} onClick={()=>addTag(item.id)} className={item.id == props.submit.selectTag?styles.act:''}>{item.title}</li>
                )
              })
            }
            </ul>
          </div>
          <Button type='primary'>发布</Button>
        </div> 
        <div className={styles.shareGuide}>
          <h2>分享指南</h2>
        </div>
       </div>
    </div>
  )
}
const mapStateToProps = (submit)=>submit
export default connect(mapStateToProps)(Submit)