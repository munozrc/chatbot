import { Intent } from '@/types'

export const gretting: Intent = {
  name: 'greeting',
  pattern: /hola|buen([oa]s)*\s(dia|tarde|noche)s*|que\s*tal/i,
  message: '¡Hola! Encantado de conocerte.',
  trigger: 'show-menu'
}

export const showMenu: Intent = {
  name: 'show-menu',
  pattern: /menu/i,
  message: '¿Cómo puedo ayudarte?',
  quickReplies: [
    '📚 Factura',
    '🙋‍♀️🙋‍♂️ PQRS',
    '💰 Precios de instalación',
    '🚨 Reporte de emergencia'
  ]
}
