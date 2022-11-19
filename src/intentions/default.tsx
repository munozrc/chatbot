import { Intention } from '@/types'

export const defaultIntention: Intention = {
  name: 'default',
  validator: () => false,
  messageAsText: 'Creo que no entiendo tu pregunta. Intenta reformularla. por favor'
}
