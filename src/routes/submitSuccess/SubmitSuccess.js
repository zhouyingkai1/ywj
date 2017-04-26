import React from 'react'
import styles from './styles/submitSuccess.less'
const SubmitSuccess = (props)=>{
  return(
    <div className={styles.submitSuccess}>
      <div className={styles.img}>
        <img src={'https://gold-cdn.xitu.io/v3/static/img/face.492d687.svg'} alt="游无界"/>
      </div>
      <div className={styles.txt}>
        <h2>分享成功！感谢您的分享！有了您的分享，游无界会变得更好:)</h2>
        <h3>为保证分享质量，文章需要短暂的审核时间</h3>
        <p>
          <a href="/#/submit" >继续分享</a>
          <a href="/" >前往首页</a>
        </p>
      </div>
    </div>
  )
}
export default SubmitSuccess