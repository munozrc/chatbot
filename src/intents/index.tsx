import { greeting, showMenu } from './greeting'
import { Intent } from '@/types'
import { bill } from './bill'
import { getPublicIP } from '@/services'
import { Message } from '@/components'

const allIntents: Array<Intent> = [
  greeting,
  showMenu,
  bill,
  {
    name: 'get-my-ip',
    message: '¿Desea conocer su IP publica?',
    pattern: /ip/i,
    entities: [
      {
        name: 'confirmacion',
        pattern: /si|no/i,
        message: '¿Usted esta seguro? 🤔',
        errorMessage: 'Responde si o no.'
      }
    ],
    action: async ({ confirmacion }) => {
      if (/no/i.test(confirmacion)) return <Message>🙄 ¡Esta bien! la mantendre oculta.</Message>
      const ip = await getPublicIP()
      return <Message><strong>{ip}</strong></Message>
    }
  }
]

export { defaultIntent } from './default'
export default allIntents
