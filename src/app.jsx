import { useRef, useState } from 'react'
import { matchPattern } from './helpers/matcher'

export default function App () {
  const [messageHistory, setMessageHistory] = useState([])
  const inputElement = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const message = inputElement.current.value
    if (!message) return

    setMessageHistory(prev => prev.concat(`<cliente> ${message}`))
    inputElement.current.value = ''

    const { response } = matchPattern(message)
    setMessageHistory(prev => prev.concat(`<bot> ${response}`))
  }

  return (
    <main>
      <div>
        <section>
          { messageHistory.map((message, index) => <p key={index}>{message}</p>) }
        </section>
        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="Escribe algo..."
            autoComplete="off"
            ref={inputElement}
          />
          <button>Enviar</button>
        </form>
      </div>
    </main>
  )
}
