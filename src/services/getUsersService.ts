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
    id: '1061800801',
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

export function getUsersService (identificacion: string) {
  return users.find(({ id }) => id === identificacion)
}
