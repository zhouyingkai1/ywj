import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {Button, Icon, Input} from 'antd'
import $ from 'jquery'
import styles from './styles/submit.less'
import kits from '../../utils/kits'
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
  const addItem = (id)=>{
    props.dispatch({
      type:'submit/updateState',
      payload:{
        selectItem: id
      }
    })
  }
  const submitArtcle = ()=>{
    let url = $('#urlInput').val()
    let title = $('#titleInput').val()
    let desc = $('#descInput').val()
    let payload = {
        url: url,
        title: title,
        artcleDesc: desc,
        img: '',
        items: props.submit.selectItem,
        tags: props.submit.selectTag,
        userId: kits.getCookies('ywj-uid'),
      }
    props.dispatch({
      type: 'submit/submitArtcle',
      payload: payload
    })
  }
  return(
    <div className={styles.upload}>
       <div className={styles.container}>
         <div className={styles.form}>
          <h2>感谢你分享优质内容到游无界</h2>
          <h3>为保证分享质量，文章需要短暂的审核时间</h3>
          <div className={styles.input}>
            <Input id='urlInput'  placeholder='分享网址 http://'/>
            <Input id='titleInput' placeholder='标题'/>
            <Input id='descInput' type='textarea' placeholder='描述'/>
          </div>
          <div className={styles.item}>
            <i>选择分类</i>
            <ul>
              {
              props.submit.items.map((item,index)=>{
                return(
                  <li key={index} onClick={()=>addItem(item.id)} className={item.id == props.submit.selectItem?styles.act:''}>{item.title}</li>
                )
              })
            }
            </ul>
          </div>
          <div className={styles.item}>
            <i>所属标签</i>
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
          <Button type='primary' onClick={()=>submitArtcle()}>发布</Button>
        </div> 
        <div className={styles.shareGuide}>
          <h2>分享指南</h2>
          <h3>什么值得分享？</h3>
          <ul>
            <li>一篇优秀的教程，或是搞笑的文章</li>
            <li>也可是一个主播的地址</li>
            <li>一切不违法的有价值的内容</li>
          </ul>
          <h3>什么不可以分享？</h3>
          <ul>
            <li>不正确的引导言论</li>
            <li>黄赌毒等一切违法的言论或内容</li>
            <li>无意义的广告文章</li>
          </ul>
          <h3>你能得到什么？</h3>
          <ul>
            <li>可以教志同道合的朋友</li>
            <li>可以增加自己的曝光度</li>
            <li>后期会有奖励系统</li>
          </ul>
        </div>
       </div>
    </div>
  )
}
const mapStateToProps = (submit)=>submit
export default connect(mapStateToProps)(Submit)