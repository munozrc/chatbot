import { ReactNode } from 'react'
import styles from './styles.module.css'

interface MessageProps {
  children: ReactNode
  emitter?: 'user' | 'bot'
}

export function Message ({ children, emitter = 'bot' }: MessageProps) {
  return (
    <div className={`${styles.wrapper} ${styles['wrapper' + emitter]}`}>
      <div className={`${styles.container} ${styles['container' + emitter]}`}>
        {children}
      </div>
    </div>
  )
}
