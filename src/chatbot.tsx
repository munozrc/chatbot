import { ChatHeader, FormInput, Message, MessageList } from '@/components'
import { useContext } from 'react'
import { ChatbotContext } from './context/chatbot-context'

import allIntentions from './intentions'
import { defaultIntention } from './intentions/default'
import styles from './styles/chatbot.module.css'

export default function ChatBot () {
  const { messageHistory, addMessage } = useContext(ChatbotContext)

  const proccesMessage = (text: string) => {
    addMessage(<Message emitter='user'>{text}</Message>)
    const intention = allIntentions.find((obj) => obj.validator(text))
    const message = intention?.messageAsText ?? defaultIntention.messageAsText
    addMessage(<Message emitter='bot'>{message}</Message>)
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
