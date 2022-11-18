import { useRef, useState } from 'react'
import { matchPattern } from './helpers/matcher'

export default function App () {
  const [messageHistory, setMessageHistory] = useState([])
  const [possibleRequests, setPossibleRequests] = useState([])
  const inputElement = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const message = inputElement.current.value
    if (!message) return

    setMessageHistory(prev => prev.concat(`<cliente> ${message}`))
    inputElement.current.value = ''

    const { response, requests } = matchPattern(message)
    setMessageHistory(prev => prev.concat(`<bot> ${response}`))
    requests && setPossibleRequests(requests)
  }

  const handleClickRequest = (event) => {
    const possibleRequest = event.target.innerText
    setMessageHistory(prev => prev.concat(`<cliente> ${possibleRequest}`))
    inputElement.current.value = ''

    const { response, requests } = matchPattern(possibleRequest)
    setMessageHistory(prev => prev.concat(`<bot> ${response}`))
    requests && setPossibleRequests(requests)
  }

  return (
    <main>
      <div>
        <section>
          { messageHistory.map((message, index) => (
            <p key={`${message}-${index}`}>{message}</p>
          ))}
        </section>
        <section>
          { possibleRequests.map((request, index) => (
            <button key={`${request}-${index}`} onClick={handleClickRequest}>{request}</button>
          )) }
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
