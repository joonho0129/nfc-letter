import { useEffect, useState } from 'react'

// 1주년: 2026-10-10 00:00 KST
export const UNLOCK_AT = new Date('2026-10-10T00:00:00+09:00')

export function useCountdown(target = UNLOCK_AT) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const remainingMs = Math.max(0, target.getTime() - now.getTime())
  const isLocked = remainingMs > 0

  const totalSeconds = Math.floor(remainingMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { isLocked, days, hours, minutes, seconds }
}
