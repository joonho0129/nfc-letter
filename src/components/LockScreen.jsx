import { useCountdown } from '../lib/useCountdown'
import './LockScreen.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function LockScreen() {
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <div className="lock-screen">
      <p className="lock-message">조금만 기다려줘 💌</p>
      <div className="lock-countdown">
        <span>{days}일</span>
        <span>{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>
      </div>
    </div>
  )
}
