import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ArchDivider.css'

gsap.registerPlugin(ScrollTrigger)

export default function ArchDivider() {
  const ref = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.arch-divider-path',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div className="arch-divider" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 120 40" fill="none">
        <path className="arch-divider-path" d="M4 36 Q 4 4 60 4 Q 116 4 116 36" pathLength="1" />
      </svg>
    </div>
  )
}
