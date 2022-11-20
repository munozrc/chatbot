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
