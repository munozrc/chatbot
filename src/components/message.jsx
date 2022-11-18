import styles from '../styles/message.module.css'

export default function Message ({ children, flexEnd = false }) {
  return (
    <div className={`${styles.wrapper} ${flexEnd ? styles.wrapperFlexEnd : ''}`}>
      <div className={`${styles.container} ${flexEnd ? styles.bgInput : styles.bgResponse}`}>
        {children}
      </div>
    </div>
  )
}
