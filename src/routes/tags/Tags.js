import React ,{Compomemt,PropType} from 'react'
import {connect} from 'dva'
import {Button, Icon, Pagination,Message} from 'antd'
import styles from './styles/tags.less'
import kits from '../../utils/kits'
import ArtcleItem from '../../components/home/ArtcleItem'

const Tags = (props)=>{
  const {artcleList,total,userInfo,current,sort,tagInfo} = props.tags
  //文章点喜欢
  const clickHeart = (id)=>{
    if(kits.getCookies('ywj-uid')){
      props.dispatch({
        type:'tags/handleLike',
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
  // 翻页
  const changePage=(page)=> {
    props.dispatch({
      type:'tags/pageChange',
      payload:{
        current: page
      }
    })
  }
  // 改变  最新最热 展示方式
  const changeSort = (type)=>{
    props.dispatch({
      type:'tags/changeSort',
      payload:{
        sort: type,
        current: 1,
      }
    })
  }

  //点关注
  const hanleLikeTag = ()=>{
    props.dispatch({
      type:'tags/hanleLikeTag',
    })
  }
  return(
    <div className={styles.tags}>
      <div className={styles.top}  style={{backgroundImage:'url('+ tagInfo.image +') '}}>
        <div className={styles.topMain}>
          <div className={styles.right}>
            <div className={styles.title}>
              <h2>{tagInfo.itemName}</h2>
              <h3>{tagInfo.tagName}</h3>
            </div>
            <div className={styles.number}>
              <u>关注：{tagInfo.likeNum}</u>
              <u>文章：{tagInfo.artcleNum}</u>
            </div>
          </div>
          <Button onClick={()=>hanleLikeTag()} size={'large'} className={tagInfo.isLike?styles.likeBtn + ' ' +styles.act : styles.likeBtn } >{tagInfo.isLike?'已关注':'关注'}</Button>
        </div>
      </div>
      <div className={styles.artcleList}>
        <ul className={styles.sort}>
          <li className={sort == 0 ?styles.act: null} onClick={()=>changeSort(0)}>最热</li>
          <li className={sort == 1 ?styles.act: null} onClick={()=>changeSort(1)}>最新</li>
        </ul>
        <div className={styles.listMain}>
          {
            total>0?
            <div>
              <ArtcleItem dispatch = {props.dispatch} artcleList = {artcleList} clickHeart = {clickHeart} />
              <Pagination defaultCurrent={1} current={current} onChange={(page)=>{changePage(page)}} pageSize={10} total={total} className={styles.pagination} />
            </div>
            : <div className={styles.empty}>
               暂无满足相关条件的文章
            </div>
          }
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = tags => tags
export default connect(mapStateToProps)(Tags)