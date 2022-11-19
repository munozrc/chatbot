import { Intent } from '@/types'

const pattern = /hola|buen([oa]s)*\s(dia|tarde|noche)s*|que\s*tal/i

export const gretting: Intent = {
  name: 'greeting',
  trigger: 'show-menu',
  validator: (input) => pattern.test(input),
  messageAsText: '¡Hola! Encantado de conocerte.'
}

export const showMenu: Intent = {
  name: 'show-menu',
  validator: (input) => /menu/i.test(input),
  messageAsText: '¿Cómo puedo ayudarte?',
  quickReplies: [
    '📚 Factura',
    '🙋‍♀️🙋‍♂️ PQRS',
    '💰 Precios de instalación',
    '🚨 Reporte de emergencia'
  ]
}
