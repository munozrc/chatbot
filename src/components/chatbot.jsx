import { useState } from 'react'
import { RobotIcon } from '../icons'
import Content from './content'
import Message from './message'
import intents from '../intents'

import styles from '../styles/chatbot.module.css'
import Footer from './footer'
import { matchPattern } from '../helpers'

export default function Chatbot () {
  const [bufferedContent, setBufferedContent] = useState('')
  const [possibleOptions, setPossibleOptions] = useState([])

  function processInputMessage (text) {
    if (!text) return

    setBufferedContent((prev) => (
      <>
        {prev}
        <Message flexEnd>{text}</Message>
      </>
    ))

    const intent = intents.find(intent => intent.pattern?.test(text))
    const response = intent?.message ?? 'Creo que no entiendo tu pregunta. Intenta reformularla.'

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

  function proccesMessage (inputMessage) {
    setBufferedContent((prev) => (
      <>
        {prev}
        <Message flexEnd>{inputMessage}</Message>
      </>
    ))

    try {
      const { message, options } = matchPattern(inputMessage)
      setPossibleOptions(options ?? [])
      setBufferedContent((prev) => (
        <>
          {prev}
          <Message>{message}</Message>
        </>
      ))
    } catch (error) {
      setBufferedContent((prev) => (
        <>
          {prev}
          <Message>
            <p>Creo que no entiendo tu pregunta.</p>
            <p>Intenta reformularla.</p>
          </Message>
        </>
      ))
    }
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
          <Footer onSubmit={proccesMessage} />
        </div>
      </section>
    </div>
  )
}
