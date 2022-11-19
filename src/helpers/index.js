import intents from '../intents'

/**
 *
 * @param {string} input
 * @returns object<any>
 */
export function matchPattern (input) {
  const object = intents.find(({ pattern }) => {
    return pattern.test(input)
  })

  if (typeof object === 'undefined') throw new Error('NO_MATCH')
  return object
}
