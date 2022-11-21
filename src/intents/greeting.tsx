import { Message } from '@/components'
import { Intent } from '@/types'

const saludos = [
  'Nos alegramos de que estés aquí',
  '¡Hola! Encantado de conocerte.',
  '¡Te estábamos esperando! Queremos ofrecerte una atención rápida y personalizada'
]

async function GreetingResponse () {
  return (
    <>
      <Message>{saludos[Math.floor(Math.random() * saludos.length)]}</Message>
      <Message>🙌 Soy tu asistente virtual</Message>
    </>
  )
}

export const greeting: Intent = {
  name: 'greeting',
  pattern: /hola|buen(\s|[oa]s*)*(dia|noche|tarde)s*|que\s*tal/i,
  message: GreetingResponse,
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
