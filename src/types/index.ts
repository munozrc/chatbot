export interface Entity {
  name: string
  pattern: RegExp
  message: string
  errorMessage: string
}

export type IntentData = { [key: string]: any }
export type ActionFunction = (data: IntentData) => Promise<string>

export interface Intent {
  name: string
  pattern: RegExp
  message: string
  quickReplies?: Array<string>
  entities?: Array<Entity>
  trigger?: string
  action?: ActionFunction
}

export interface CurrentIntent {
  intent: Intent
  data: IntentData
  entity: number
}
