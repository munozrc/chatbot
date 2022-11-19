import { LogoIcon } from '@/icons'
import styles from './styles.module.css'

export function ChatHeader ({ agentName = 'Chatbot' }) {
  return (
    <header className={styles.wrapper}>
      <figure className={styles.agentPhoto}>
        <LogoIcon size="1.9rem" color="#FFFFFF" />
      </figure>
      <div className={styles.agentName}>
        <h4>{agentName}</h4>
        <p>online</p>
      </div>
    </header>
  )
}
