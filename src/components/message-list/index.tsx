import { useRef, useEffect, MouseEvent, ReactNode } from 'react'
import styles from './styles.module.css'

interface MessageListProps {
  listReplies: Array<string>
  messageHistory: ReactNode
  onClickQuickReply: (reply: string) => void
}

export function MessageList ({ listReplies, messageHistory, onClickQuickReply }: MessageListProps) {
  const wrapperElement = useRef<HTMLElement>(null)

  useEffect(() => {
    const content = wrapperElement.current
    content?.addEventListener('DOMNodeInserted', handleScroll, true)
    return () => content?.removeEventListener('DOMNodeInserted', handleScroll, true)
  }, [])

  function handleScroll (event: Event): void {
    const target = event.currentTarget as Element
    target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
  }

  function handleClick (event: MouseEvent<HTMLButtonElement>): void {
    const message = event.currentTarget.innerText
    message && onClickQuickReply(message)
  }

  return (
    <section className={styles.wrapper} ref={wrapperElement}>
      {messageHistory}
      <div className={styles.repliesContainer}>
        {listReplies.map((reply, index) => (
          <button
            key={index}
            onClick={handleClick}
          >
            {reply}
          </button>
        ))}
      </div>
    </section>
  )
}
