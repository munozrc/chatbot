export default [
  {
    intent: 'saludo',
    trigger: 'show-menu',
    pattern: /hola|buen([oa]s)*\s(dia|tarde|noche)s*|que\s*tal/i,
    message: '¡Hola! Encantado de conocerte.'
  },
  {
    intent: 'menu',
    pattern: /menu/i,
    message: '¿Cómo puedo ayudarte?',
    options: [
      '📚 Factura',
      '🙋‍♀️🙋‍♂️ PQRS',
      '💰 Precios de instalación',
      '🚨 Reporte de emergencia'
    ]
  },
  {
    intent: 'solicitar-factura',
    trigger: 'solicitar-factura-id',
    pattern: /factura/i,
    message: 'Para consultar su factura le solicitaremos algunos datos!'
  },
  {
    intent: 'solicitar-factura-id',
    pattern: /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/,
    message: 'Por favor ingrese su numero de identificación sin espacios'
  }
]
