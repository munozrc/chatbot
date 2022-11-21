import { Intent } from '@/types'

export const greeting: Intent = {
  name: 'greeting',
  pattern: /hola|buen(\s|[oa]s*)*(dia|noche|tarde)s*|que\s*tal/i,
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
