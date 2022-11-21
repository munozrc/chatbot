import { Intent } from '@/types'

const users = [
  {
    id: '1061800800',
    name: 'Luis Martines',
    bills: [
      {
        number: 893422,
        date: '11/2022',
        paymed: 'Pago NO registrado ❌'
      }
    ]
  },
  {
    id: '1061800800',
    name: 'Camila Lopez',
    bills: [
      {
        number: 122456,
        date: '10/2021',
        paymed: 'Pago registrado ✅'
      }
    ]
  }
]

async function getBillPayment ({ identificacion = '', fecha = '' }): Promise<string> {
  const user = users.find(({ id }) => id === identificacion)
  if (!user) return 'Lo sentimos, no te encontramos registrado.'
  const bill = user.bills.find(({ date }) => date === fecha)
  if (!bill) return `No encontramos una factura para la fecha ${fecha}.`
  return `Excelente! Encontramos una factura para la fecha ${fecha} a nombre de ${user.name}
  puedes descagar tu factura en el siguiente enlace https://bill.com/?id=${bill.number}`
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
