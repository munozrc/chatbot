import { useContext } from 'react'
import { ChatHeader, FormInput, MessageList } from '@/components'
import { ChatbotContext } from './context/chatbot-context'

import styles from './styles/chatbot.module.css'

export default function Chatbot () {
  const { messageHistory, listReplies, processNewMessage } = useContext(ChatbotContext)

  return (
    <div className={styles.wrapper}>
      <div className={styles.shadeWrapper}>
        <div className={styles.container}>
          <ChatHeader agentName='Chatbot' />
          <MessageList
            listReplies={listReplies}
            messageHistory={messageHistory}
            onClickQuickReply={processNewMessage}
          />
          <footer className={styles.footer}>
            <FormInput onSubmitMessage={processNewMessage}/>
            <p>by <a href='https://github.com/munozrc'>@munozrc</a></p>
          </footer>
        </div>
      </div>
    </div>
  )
}
