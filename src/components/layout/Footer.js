import React, {PropTypes} from 'react'
import styles from './style/footer.less'
const Footer = (props) => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerMain}>
        <p>时光流影</p>
        <ul>
          <li><a href=''>时光流影</a></li>  
          <li><a href=''>时光流影</a></li>  
          <li><a href=''>时光流影</a></li>  
          <li><a href=''>时光流影</a></li>  
        </ul> 
      </div>
    </div>
  )
}
export default Footer


