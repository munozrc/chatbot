import allIntents, { defaultIntent } from '@/intents'
import { Entity, Intent } from '@/types'

export function matchPattern (rawText: string): Intent {
  const match = allIntents.find((element) => element.pattern.test(rawText))
  return match ?? defaultIntent
}

export function getEntityByPosition (intent: Intent, position: number): Entity {
  const entities = intent.entities as Array<Entity>
  return entities[position]
}

export function searchIntentByName (name: string): Intent {
  const match = allIntents.find((element) => element.name === name)
  return match ?? defaultIntent
}
