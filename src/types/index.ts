export interface Entity {
  name: string
  validator: (inputText: string) => boolean
}

export interface EntityObject {
  [key: string]: any
}

export interface Intent {
  name: string
  messageAsText?: string
  quickReplies?: Array<string>
  entities?: Array<Entity>
  trigger?: string
  validator: (inputText: string) => boolean
  action?: (entityList?: EntityObject) => void
}
