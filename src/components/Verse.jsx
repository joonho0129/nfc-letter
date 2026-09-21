import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Verse.css'

gsap.registerPlugin(ScrollTrigger)

const LINES = ['내가 좋은 사람이 되어', '너에게 가겠다', '너는 그냥', '그 자리에 있어주면 된다']

export default function Verse() {
  const ref = useRef(null)
  const flourishRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !ref.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 70%',
        once: true,
        onEnter: () => flourishRef.current?.classList.add('in-view'),
      })

      gsap.from('.verse-line', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.35,
        delay: 0.3,
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
    <div className="verse-wrap">
      <section className="verse" ref={ref}>
        <svg className="verse-flourish" ref={flourishRef} viewBox="0 0 160 20" fill="none" aria-hidden="true">
          <path d="M4 12 Q 40 -2 80 12 T 156 12" pathLength="1" />
        </svg>
        {LINES.map((line) => (
          <p className="verse-line" key={line}>
            {line}
          </p>
        ))}
        <p className="verse-credit">— 너에게, 서혜진</p>
      </section>
    </div>
  )
}
