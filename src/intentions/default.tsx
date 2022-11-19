import { Intention } from '@/types'

export const defaultIntention: Intention = {
  name: 'default',
  validator: () => false,
  messageAsText: '¡Hola! Encantado de conocerte.'
}
