import ChatbotProvider from './context/chatbot-context'
import ChatBot from './chatbot'

export default function App () {
  return (
    <main>
      <ChatbotProvider>
        <ChatBot />
      </ChatbotProvider>
    </main>
  )
}
