export interface Entity {
  name: string
  message: string
  validator: (inputText: string) => boolean
  errorMessage: string
}

export interface EntityObject {
  [key: string]: any
}

export interface Intent {
  name: string
  message: string
  quickReplies?: Array<string>
  entities?: Array<Entity>
  trigger?: string
  validator: (inputText: string) => boolean
  action?: (entityList?: EntityObject) => void
}
