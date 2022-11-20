import { createContext, ReactNode, useCallback, useState } from 'react'
import allIntents, { defaultIntent } from '@/intents'
import { Message } from '@/components'
import { Entity, Intent } from '@/types'

interface ChatbotContextInterface {
  messageHistory: ReactNode
  listReplies: Array<string>
  processNewMessage: (text: string) => void
}

interface ChatbotProviderProps {
  children: ReactNode
}

export const ChatbotContext = createContext({} as ChatbotContextInterface)

export default function ChatbotProvider ({ children }: ChatbotProviderProps) {
  const [messageHistory, setMessageHistory] = useState<ReactNode>(null)
  const [listReplies, setListReplies] = useState<Array<string>>([])
  const [currentIntent, setCurrentIntent] = useState<Intent | null>(null)
  const [currentEntity, setCurrentEntity] = useState<number>(0)

  function getIntentByText (message: string) : Intent | undefined {
    const intent = allIntents.find((obj) => obj.pattern.test(message))
    setListReplies(intent?.quickReplies ?? [])
    setCurrentIntent(intent ?? null)
    return intent
  }

  function addMessage (message: string, emitter: 'bot' | 'user') {
    setMessageHistory(prevMessages => (
      <>
        {prevMessages}
        <Message emitter={emitter}>{message}</Message>
      </>
    ))
  }

  const processEntity = useCallback((text: string): void => {
    const intent = currentIntent as Intent
    const entities = intent.entities as Array<Entity>
    const entity = entities[currentEntity] as Entity
    const nextPosition = currentEntity + 1
    const isTheLastEntity = entities.length - 1 >= nextPosition

    if (!entity.pattern.test(text)) return addMessage(entity.errorMessage, 'bot')

    addMessage(entity.message, 'bot')

    if (isTheLastEntity) return setCurrentEntity(nextPosition)

    setCurrentIntent(null)
    setCurrentEntity(0)
  }, [currentIntent, currentEntity])

  const processNewMessage = useCallback((text: string): void => {
    addMessage(text, 'user')

    if (currentIntent && currentIntent.entities) return processEntity(text)

    const intent = getIntentByText(text) ?? defaultIntent
    const trigger = intent.trigger

    addMessage(intent.message, 'bot')

    if (!trigger) return

    const { message } = getIntentByText(trigger) as Intent
    addMessage(message, 'bot')
  }, [currentIntent, processEntity])

  return (
    <ChatbotContext.Provider
      value={{
        listReplies,
        messageHistory,
        processNewMessage
      }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}
