import { useState, FormEvent } from 'react'
import { SendIcon } from '@/icons'

import styles from './styles.module.css'

interface FormInputProps {
  onSubmitMessage: (message: string) => void
}

export function FormInput ({ onSubmitMessage }: FormInputProps) {
  const [message, setMessage] = useState('')

  function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!message) return

    onSubmitMessage(message)
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <input
        name="message"
        placeholder="Escribe tu mensaje aquí"
        autoComplete="off"
        className={styles.inputMessage}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.sendButton}>
        <SendIcon size="26px" color={!message ? '#D7D7D7' : '#4994FF'} />
      </button>
    </form>
  )
}
