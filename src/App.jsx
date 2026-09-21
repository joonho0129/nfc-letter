import { useCountdown } from './lib/useCountdown'
import LockScreen from './components/LockScreen'
import Timeline from './components/Timeline'
import Milestone from './components/Milestone'

function App() {
  const { isLocked } = useCountdown()

  if (isLocked) return <LockScreen />

  // ponytail: 인트로/클로징, 디자인 마감은 4일차에서 채워 넣는다
  return (
    <>
      <Timeline />
      <Milestone />
    </>
  )
}

export default App
