import { gretting, showMenu } from './greeting'
import { Intent } from '@/types'
import { bill } from './bill'

const allIntents: Array<Intent> = [
  gretting,
  showMenu,
  bill
]

export { defaultIntent } from './default'
export default allIntents
