import { Intention } from '@/types'

const pattern = /hola|buen([oa]s)*\s(dia|tarde|noche)s*|que\s*tal/i

export const gretting: Intention = {
  name: 'greeting',
  validator: (input) => pattern.test(input),
  messageAsText: '¡Hola! Encantado de conocerte.'
}
