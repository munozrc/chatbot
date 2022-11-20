import { Intent } from '@/types'

export const defaultIntent: Intent = {
  name: 'default',
  validator: () => false,
  message: 'Creo que no entiendo tu pregunta. Intenta reformularla. por favor'
}
