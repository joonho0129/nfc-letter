import ringPhoto from '../assets/timeline/05-ring-closeup.jpg'
import './Intro.css'

const PETAL_COUNT = 10

// ponytail: 문구는 초안 — 실제 카피로 교체 필요
export default function Intro() {
  return (
    <section className="intro">
      <p className="intro-eyebrow">1st Anniversary</p>

      <div className="intro-hero">
        <img className="intro-photo" src={ringPhoto} alt="" fetchPriority="high" decoding="async" />
        <p className="intro-caption">우리, 1주년</p>

        <div className="intro-petals" aria-hidden="true">
          {Array.from({ length: PETAL_COUNT }).map((_, i) => (
            <span
              key={i}
              className="petal"
              style={{
                left: `${(i * 97) % 100}%`,
                animationDelay: `${(i * 1.3) % 8}s`,
                animationDuration: `${8 + (i % 4)}s`,
              }}
            />
          ))}
        </div>

        <div className="intro-arch">
          <svg className="intro-flourish" viewBox="0 0 160 20" fill="none" aria-hidden="true">
            <path d="M4 12 Q 40 -2 80 12 T 156 12" pathLength="1" />
          </svg>
          <h1 className="intro-title">
            우리가 함께한
            <br />
            365일
          </h1>
        </div>
      </div>

      <p className="intro-date">2026. 10. 10.</p>
    </section>
  )
}
