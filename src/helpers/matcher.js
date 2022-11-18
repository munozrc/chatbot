import patterns from './patterns'

/**
 * Busca entre todos los patrones regitrado y regresa un objecto
 * @param {string} message Entrada por parte del usuario
 * @returns object
 */
export function matchPattern (message) {
  const dictionary = Object.entries(patterns)

  for (const [intent, { regex, ...restOfValues }] of dictionary) {
    if (regex.test(message)) return { intent, ...restOfValues }
  }

  return {
    intent: 'default',
    response: 'Creo que no entiendo tu pregunta. Intenta reformularla, por favor.',
    requests: []
  }
}
