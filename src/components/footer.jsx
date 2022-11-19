import { useState } from 'react'
import { SendIcon } from '../icons'

import styles from '../styles/footer.module.css'

export default function Footer ({ onSubmit }) {
  const [inputText, setInputText] = useState('')

  function handleSubmit (event) {
    event.preventDefault()

    if (!inputText) return

    onSubmit(inputText)
    setInputText('')
  }

  return (
    <footer className={styles.footer}>
      <form onSubmit={handleSubmit}>
        <input
          name="message"
          placeholder="Escribe tu mensaje aquí"
          autoComplete="off"
          className={styles.inputMessage}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className={styles.sendButton}>
          <SendIcon size="26px" color={!inputText ? '#D7D7D7' : '#4994FF'} />
        </button>
      </form>
      <p>by <a href='https://github.com/munozrc'>@munozrc</a></p>
    </footer>
  )
}
