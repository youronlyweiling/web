import { useEffect, useState } from 'react'

/**
 * Reveals `text` one character at a time while `active` is true.
 * With `instant` (reduced motion) the full text shows immediately.
 */
export function useTypewriter(text: string, active: boolean, instant = false, msPerChar = 22) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) {
      setCount(0)
      return
    }
    if (instant) {
      setCount(text.length)
      return
    }
    setCount(0)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setCount(i)
      if (i >= text.length) window.clearInterval(id)
    }, msPerChar)
    return () => window.clearInterval(id)
  }, [text, active, instant, msPerChar])

  return { shown: text.slice(0, count), done: count >= text.length && active }
}
