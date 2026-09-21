import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Verse.css'

gsap.registerPlugin(ScrollTrigger)

const LINES = ['내가 좋은 사람이 되어', '너에게 가겠다', '너는 그냥', '그 자리에 있어주면 된다']

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
      <p className="verse-credit">— 너에게, 서혜진</p>
    </section>
  )
}
