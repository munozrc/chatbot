export interface Entity {
  name: string
  pattern: RegExp
  message: string
  errorMessage: string
}

export interface Intent {
  name: string
  pattern: RegExp
  message: string
  quickReplies?: Array<string>
  entities?: Array<Entity>
  trigger?: string
}

export interface CurrentIntent {
  intent: Intent
  entity: number
  data: { [key: string]: any }
}
