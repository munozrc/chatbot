import { createContext, ReactNode, useCallback, useState } from 'react'
import { matchPattern, searchIntentByName } from '@/helpers'
import { CurrentIntent, Entity, Intent, IntentData } from '@/types'
import { Message } from '@/components'

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
  const [current, setCurrent] = useState<CurrentIntent | null>(null)

  function addMessage (message: string, emitter: 'bot' | 'user') {
    setMessageHistory(prevMessages => (
      <>
        {prevMessages}
        <Message emitter={emitter}>{message}</Message>
      </>
    ))
  }

  const executionAction = useCallback(async (intent: Intent, data: IntentData) => {
    if (typeof intent.action !== 'function') return
    const message = await intent.action(data)
    addMessage(message, 'bot')
  }, [])

  const processEntity = useCallback(async (rawText: string): Promise<void> => {
    const { intent, entity: entityPosition, data: prevData, failures } = current as CurrentIntent
    const entities = intent.entities as Entity[]
    const nextPosition = entityPosition + 1

    const { pattern, errorMessage, name } = entities.at(entityPosition) as Entity
    const data = { ...prevData, [name]: rawText }

    if (failures >= 1) {
      setCurrent(null)
      addMessage('No completaste el proceso', 'bot')
      addMessage('Pero no te preocupes puedes regresar al menu.', 'bot')
      setListReplies(['Ir al menu'])
      return
    }

    if (!pattern.test(rawText)) {
      const increaseNumberFailures = failures + 1
      setCurrent({ ...current as CurrentIntent, failures: increaseNumberFailures })
      addMessage(errorMessage, 'bot')
      return
    }
    if (nextPosition >= entities.length) {
      setCurrent(null)
      await executionAction(intent, data)
      return
    }

    const nextEntity = entities.at(nextPosition) as Entity
    addMessage(nextEntity.message, 'bot')
    setCurrent({ intent, entity: nextPosition, data, failures })
  }, [current, executionAction])

  const proccesIntent = useCallback((intent: Intent) : void => {
    const { message: replyMessage, quickReplies, entities } = intent

    addMessage(replyMessage, 'bot')
    setListReplies(quickReplies ?? [])

    if (!entities) return

    const firstEntity = entities[0]
    setCurrent({ data: {}, entity: 0, intent, failures: 0 })
    addMessage(firstEntity.message, 'bot')
  }, [])

  const processNewMessage = useCallback(async (rawText: string): Promise<void> => {
    addMessage(rawText, 'user')
    const isIntentionInProgress = current && current.intent.entities
    if (isIntentionInProgress) return await processEntity(rawText)

    const matchIntent = matchPattern(rawText)
    const data = { [matchIntent.name]: rawText }
    proccesIntent(matchIntent)
    !matchIntent.entities && await executionAction(matchIntent, data)

    if (!matchIntent.trigger) return
    const matchNextIntent = searchIntentByName(matchIntent.trigger)
    proccesIntent(matchNextIntent)
  }, [current, proccesIntent, processEntity, executionAction])

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
