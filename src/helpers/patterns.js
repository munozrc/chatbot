export default {
  gretting: {
    regex: /hola|que\stal|buen+([oa]|\s+(dia|tarde|noche))|como\sesta/i,
    response: '¡Hola! Encantado de conocerte. ¿Necesitas ayuda?',
    requests: [
      'Deseo consultar mi factura',
      'Quiero precios de instalación',
      'Existe una emergencia en mi zona',
      'Deseo generar una PQRS'
    ]
  },
  'check-energy-bill': {
    regex: /(deseo|quiero)|energia|(recibo|factura)/i,
    response: 'Digita sin espacio tu número de identificación.',
    requests: []
  },
  'response-check-energy-bill': {
    regex: /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/,
    response: (ID) => {
      if (ID === '1061800800') return '🙌 !Excelente! Puedes descargar tu factura, accediendo a energia.com/id=1234'
      return '😢 Lo sentimos NO encontramos tu factura.'
    },
    requests: []
  }
}
