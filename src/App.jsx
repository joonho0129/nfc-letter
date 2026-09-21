import { useCountdown } from './lib/useCountdown'
import LockScreen from './components/LockScreen'
import Timeline from './components/Timeline'

function App() {
  const { isLocked } = useCountdown()

  if (isLocked) return <LockScreen />

  // ponytail: 인트로/마일스톤/클로징은 3~4일차에서 채워 넣는다
  return <Timeline />
}

export default App
