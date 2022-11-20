import { Intent } from '@/types'
import { gretting, showMenu } from './greeting'
export { defaultIntent } from './default'

const allIntents: Array<Intent> = [
  gretting,
  showMenu,
  {
    name: 'factura',
    message: 'Para consultar su factura. Realizaremos algunas preguntas...',
    pattern: /factura/i,
    entities: [
      {
        name: 'identificacion',
        pattern: /12345/i,
        message: 'Digite su numero de identificaion sin espacios.',
        errorMessage: 'Ingrese una identificacion valida por favor.'
      },
      {
        name: 'fecha',
        pattern: /11\/2022/i,
        message: 'Escriba la fecha a consultar con el formato MM/AAAA. Ejemplo: 11/2022',
        errorMessage: 'Ingrese una fecha valida por favor.'
      }
    ],
    action: async ({ identificacion, fecha }) => `Resumen: ID=${identificacion} fecha=${fecha}`
  }
]

export default allIntents
