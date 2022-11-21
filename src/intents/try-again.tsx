import { Message } from '@/components'
import { Intent } from '@/types'

async function TryAgainComponent () {
  return (
    <Message>
      <p>No completaste el proceso.</p>
      <p>pero traquilo puedes regresar al menu.</p>
    </Message>
  )
}

export const tryAgain: Intent = {
  name: 'try-again',
  pattern: /s/i,
  message: TryAgainComponent
}
