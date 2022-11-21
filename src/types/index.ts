import { ReactNode } from 'react'

export type IntentData = { [key: string]: any }
export type ActionFunction = (data: IntentData) => Promise<string | ReactNode>
export type CustomMessage = () => Promise<ReactNode>
export type MessageType = string | CustomMessage | ActionFunction

export interface Entity {
  name: string
  pattern: RegExp
  message: string
  errorMessage: string
}

export interface Intent {
  name: string
  pattern: RegExp
  message: string | CustomMessage
  quickReplies?: Array<string>
  entities?: Array<Entity>
  trigger?: string
  action?: ActionFunction
}

export interface CurrentIntent {
  intent: Intent
  data: IntentData
  entity: number
  failures: number
}
