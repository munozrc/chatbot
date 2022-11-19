export interface Entity {
  name: string
  validator: (inputText: string) => boolean
}

export interface EntityObject {
  [key: string]: any
}

export interface Intention {
  name: string
  validator: (inputText: string) => boolean
  messageAsText?: string
  quickReplies?: Array<string>
  entities?: Array<Entity>
  action?: (entityList?: EntityObject) => void
}
