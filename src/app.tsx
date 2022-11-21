import ChatbotProvider from './context/chatbot-context'
import Chatbot from './chatbot'

import styles from './styles/app.module.css'

export default function App () {
  return (
    <main>
      <div className={styles.wrapperChatbot}>
        <ChatbotProvider>
          <Chatbot />
        </ChatbotProvider>
      </div>
    </main>
  )
}
