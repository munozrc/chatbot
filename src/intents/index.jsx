export default [
  {
    intent: 'saludo',
    pattern: /hola/i,
    message: '¡Hola! Encantado de conocerte.',
    trigger: 'show-menu'
  },
  {
    intent: 'show-menu',
    pattern: /menu/i,
    message: '¿Cómo puedo ayudarte?',
    options: [
      '📚 Factura',
      '🙋‍♀️🙋‍♂️ PQRS',
      '💰 Precios de instalación',
      '🚨 Reporte de emergencia'
    ]
  }
]
