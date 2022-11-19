import { createContext, ReactNode, useCallback, useState } from 'react'

interface ChatbotContextInterface {
  addMessage: (children: ReactNode | Array<ReactNode>) => void
  messageHistory: ReactNode
}

interface ChatbotProviderProps {
  children: ReactNode
}

export const ChatbotContext = createContext({} as ChatbotContextInterface)

export default function ChatbotProvider ({ children }: ChatbotProviderProps) {
  const [messageHistory, setMessageHistory] = useState<ReactNode>(null)

  const addMessage = useCallback((Component: ReactNode | Array<ReactNode>) => {
    setMessageHistory(prevMessages => (
      <>
        {prevMessages}
        {Component}
      </>
    ))
  }, [])

  return (
    <ChatbotContext.Provider
      value={{
        addMessage,
        messageHistory
      }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}
