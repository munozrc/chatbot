import { useEffect, useRef } from 'react'

import styles from '../styles/content.module.css'

export default function Content ({ bufferedMessages, possibleOptions, onClickOption }) {
  const wrapperElement = useRef(null)

  useEffect(() => {
    const content = wrapperElement.current
    content.addEventListener('DOMNodeInserted', handleScroll)
    return () => content.removeEventListener('DOMNodeInserted', handleScroll)
  }, [])

  const handleScroll = event => {
    const { currentTarget: target } = event
    target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
  }

  function handleClick (event) {
    const message = event.target.innerText
    onClickOption(message)
  }

  return (
    <section className={styles.wrapper} ref={wrapperElement}>
      {bufferedMessages}
      <div className={styles.optionsContainer}>
        {possibleOptions.map((option, index) => (
          <button
            key={index}
            onClick={handleClick}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  )
}
