import { useState } from 'react'
import { RobotIcon, SendIcon } from '../icons'
import Content from './content'
import Message from './message'
import intents from '../intents'

import styles from '../styles/chatbot.module.css'

export default function Chatbot () {
  const [bufferedContent, setBufferedContent] = useState('')
  const [possibleOptions, setPossibleOptions] = useState([])
  const [inputText, setInputText] = useState('')

  function processInputMessage (text) {
    if (!text) return

    setInputText('')
    setBufferedContent((prev) => (
      <>
        {prev}
        <Message flexEnd>{text}</Message>
      </>
    ))

    const intent = intents.find(intent => intent.pattern?.test(text))
    const response = intent?.message ?? 'Creo que no entiendo tu pregunta. Intenta reformularla, por favor.'

    setPossibleOptions(intent?.options ?? [])
    setBufferedContent((prev) => (
      <>
        {prev}
        <Message>{response}</Message>
      </>
    ))

    const triggerIntent = intent?.trigger && intents.find(trigger => trigger.intent === intent.trigger)

    if (triggerIntent) {
      setPossibleOptions(triggerIntent?.options ?? [])
      setBufferedContent((prev) => (
        <>
          {prev}
          <Message>{triggerIntent.message}</Message>
        </>
      ))
    }
  }

  function handleSubmit (event) {
    event.preventDefault()
    inputText && processInputMessage(inputText)
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.shadowContainer}>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.avatar}>
              <RobotIcon size="1.9rem" color="#FFFFFF" />
            </span>
            <div className={styles.name}>
              <h4>ChatBot</h4>
              <p>online</p>
            </div>
          </header>
          <Content
            bufferedMessages={bufferedContent}
            possibleOptions={possibleOptions}
            onClickOption={processInputMessage}
          />
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
        </div>
      </section>
    </div>
  )
}
