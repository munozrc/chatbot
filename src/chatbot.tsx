import { ChatHeader, FormInput, MessageList } from '@/components'

import styles from './styles/chatbot.module.css'

export default function ChatBot () {
  return (
    <div className={styles.wrapper}>
      <div className={styles.shadeWrapper}>
        <div className={styles.container}>
          <ChatHeader agentName='ChatBot' />
          <MessageList
            listReplies={[]}
            messageHistory={''}
            onClickQuickReply={() => {}}
          />
          <footer className={styles.footer}>
            <FormInput onSubmitMessage={() => {}}/>
            <p>by <a href='https://github.com/munozrc'>@munozrc</a></p>
          </footer>
        </div>
      </div>
    </div>
  )
}
