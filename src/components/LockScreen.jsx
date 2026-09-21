import { useCountdown } from '../lib/useCountdown'
import ringPhoto from '../assets/timeline/05-ring-closeup.jpg'
import './LockScreen.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function LockScreen() {
  const { days, hours, minutes, seconds } = useCountdown()
  const dDay = hours || minutes || seconds ? days + 1 : days

  return (
    <div className="lock-screen" style={{ backgroundImage: `url(${ringPhoto})` }}>
      <div className="lock-panel">
        <p className="lock-message">조금만 기다려줘</p>
        <p className="lock-dday">D-{dDay}</p>
        <p className="lock-time">
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </p>
      </div>
    </div>
  )
}
