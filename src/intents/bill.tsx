import { Message } from '@/components'
import { getUsersService } from '@/services'
import { Intent } from '@/types'

async function getBillPayment ({ identificacion = '', fecha = '' }) {
  const user = getUsersService(identificacion)
  if (!user) return (<Message>Lo sentimos, no te encontramos registrado.</Message>)

  const bill = user.bills.find(({ date }) => date === fecha)

  if (!bill) {
    return (
      <Message>
        No encontramos una factura para la fecha <strong>{fecha}</strong>.
      </Message>
    )
  }

  const { name } = user
  const { paymed, number } = bill

  const downloadLink = `https://bill.com/?id=${number}`
  const testBillPaymed = 'https://templates.invoicehome.com/modelo-factura-es-puro-750px.png'

  return (
    <Message>
      <p><strong>{name}</strong> encontramos una factura 👌.</p>
      <p>Tu factura para la fecha {fecha} y tiene {paymed}.</p>
      <p>accede a <a href={testBillPaymed} target='_blank' rel="noopener noreferrer">{downloadLink}</a></p>
    </Message>
  )
}

export const bill: Intent = {
  name: 'bill',
  message: 'Para consultar su factura. Realizaremos algunas preguntas...',
  pattern: /factura/i,
  entities: [
    {
      name: 'identificacion',
      pattern: /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/i,
      message: 'Digite su numero de identificaion sin espacios.',
      errorMessage: 'Ingrese una identificacion valida por favor.'
    },
    {
      name: 'fecha',
      pattern: /\d{2}\/\d{4}/i,
      message: 'Escriba la fecha a consultar con el formato MM/AAAA.',
      errorMessage: 'Ingrese una fecha valida por favor.'
    }
  ],
  action: getBillPayment
}
