import { useCountdown } from '../lib/useCountdown'
import './LockScreen.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function LockScreen() {
  const { days, hours, minutes, seconds } = useCountdown()
  const dDay = hours || minutes || seconds ? days + 1 : days

  return (
    <div className="lock-screen">
      <div className="lock-card">
        <svg
          className="lock-envelope"
          viewBox="0 0 120 80"
          fill="none"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="112" height="72" rx="6" pathLength="1" />
          <path d="M4 10 L60 52 L116 10" pathLength="1" />
        </svg>
        <p className="lock-message">조금만 기다려줘</p>
        <p className="lock-dday">D-{dDay}</p>
        <p className="lock-time">
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </p>
      </div>
    </div>
  )
}
