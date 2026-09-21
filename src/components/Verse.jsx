import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Verse.css'

gsap.registerPlugin(ScrollTrigger)

// ponytail: 시 구절은 초안 — 실제 문구로 교체 필요
const LINES = ['그 날의 우리를', '다시 걸어본다', '웃음도, 서툶도', '전부 사랑이었다']

export default function Verse() {
  const ref = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.from('.verse-line', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.35,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section className="verse" ref={ref}>
      {LINES.map((line) => (
        <p className="verse-line" key={line}>
          {line}
        </p>
      ))}
    </section>
  )
}
