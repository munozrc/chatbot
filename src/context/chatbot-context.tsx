import { createContext, ReactNode, useCallback, useState } from 'react'
import { matchPattern, searchIntentByName } from '@/helpers'
import { CurrentIntent, Entity, Intent } from '@/types'
import { Message } from '@/components'

interface ChatbotContextInterface {
  messageHistory: ReactNode
  listReplies: Array<string>
  processNewMessage: (text: string) => void
}

interface ChatbotProviderProps {
  children: ReactNode
}

const initValuesCurrentIntent = { data: {}, entity: 0 } as CurrentIntent

export const ChatbotContext = createContext({} as ChatbotContextInterface)

export default function ChatbotProvider ({ children }: ChatbotProviderProps) {
  const [messageHistory, setMessageHistory] = useState<ReactNode>(null)
  const [listReplies, setListReplies] = useState<Array<string>>([])
  const [current, setCurrent] = useState<CurrentIntent | null>(null)

  function addMessage (message: string, emitter: 'bot' | 'user') {
    setMessageHistory(prevMessages => (
      <>
        {prevMessages}
        <Message emitter={emitter}>{message}</Message>
      </>
    ))
  }

  const processEntity = useCallback((rawText: string): void => {
    const { intent, entity: entityPosition, data } = current as CurrentIntent
    const entities = intent.entities as Entity[]
    const nextPosition = entityPosition + 1

    const { pattern, errorMessage } = entities.at(entityPosition) as Entity

    if (!pattern.test(rawText)) return addMessage(errorMessage, 'bot')
    if (nextPosition >= entities.length) return setCurrent(null)

    const nextEntity = entities.at(entityPosition) as Entity
    addMessage(nextEntity.message, 'bot')
    setCurrent({ intent, data, entity: nextPosition })
  }, [current])

  const proccesIntent = useCallback((intent: Intent) : void => {
    const { message: replyMessage, quickReplies, entities } = intent

    addMessage(replyMessage, 'bot')
    setListReplies(quickReplies ?? [])

    if (!entities) return

    const firstEntity = entities[initValuesCurrentIntent.entity]
    setCurrent({ ...initValuesCurrentIntent, intent })
    addMessage(firstEntity.message, 'bot')
  }, [])

  const processNewMessage = useCallback((rawText: string): void => {
    addMessage(rawText, 'user')
    const isIntentionInProgress = current && current.intent.entities
    if (isIntentionInProgress) return processEntity(rawText)

    const matchIntent = matchPattern(rawText)
    proccesIntent(matchIntent)

    if (!matchIntent.trigger) return
    const matchNextIntent = searchIntentByName(matchIntent.trigger)
    proccesIntent(matchNextIntent)
  }, [proccesIntent, processEntity, current])

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
