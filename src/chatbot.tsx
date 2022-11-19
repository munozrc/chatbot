import { ChatHeader, FormInput, Message, MessageList } from '@/components'
import { useContext } from 'react'
import { ChatbotContext } from './context/chatbot-context'

import { defaultIntent } from './intents/default'
import allIntents from './intents'

import styles from './styles/chatbot.module.css'

export default function ChatBot () {
  const { messageHistory, addMessage } = useContext(ChatbotContext)

  const proccesMessage = (text: string) => {
    addMessage(<Message emitter='user'>{text}</Message>)
    const intent = allIntents.find((obj) => obj.validator(text))
    const message = intent?.messageAsText ?? defaultIntent.messageAsText
    const trigger = intent?.trigger
    addMessage(<Message emitter='bot'>{message}</Message>)

    if (!trigger) return
    const secondIntent = allIntents.find((obj) => obj.name === trigger)

    if (!secondIntent) return
    addMessage(<Message emitter='bot'>{secondIntent.messageAsText}</Message>)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.shadeWrapper}>
        <div className={styles.container}>
          <ChatHeader agentName='ChatBot' />
          <MessageList
            listReplies={[]}
            messageHistory={messageHistory}
            onClickQuickReply={() => {}}
          />
          <footer className={styles.footer}>
            <FormInput onSubmitMessage={proccesMessage}/>
            <p>by <a href='https://github.com/munozrc'>@munozrc</a></p>
          </footer>
        </div>
      </div>
    </div>
  )
}
