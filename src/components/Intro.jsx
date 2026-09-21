import './Intro.css'

// ponytail: 문구는 초안 — 실제 카피로 교체 필요
export default function Intro() {
  return (
    <section className="intro">
      <p className="intro-eyebrow">1st Anniversary</p>
      <h1 className="intro-title">
        우리가 함께한
        <br />
        365일
      </h1>
      <p className="intro-date">2026. 10. 10.</p>
      <div className="intro-scroll-cue" aria-hidden="true" />
    </section>
  )
}
