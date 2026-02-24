import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const AnimatedText = ({ 
  text, 
  className = "", 
  limitRange = 150,
  lift = 20 
}) => {
  const containerRef = useRef(null)
  const isReady = useRef(false)

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    const chars = container.querySelectorAll('.char')

    const tl = gsap.timeline({
      onComplete: () => {
        isReady.current = true
      }
    })

    tl.fromTo(chars,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.03, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
      }
    )

    const handleMouseMove = (e) => {
      if (!isReady.current) return

      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX

      chars.forEach((char) => {
        const charRect = char.getBoundingClientRect()
        const charCenterX = charRect.left + charRect.width / 2
        
        const dist = Math.abs(mouseX - charCenterX)
        const intensity = 1 - Math.min(dist / limitRange, 1)
        
        const targetColor = gsap.utils.interpolate("#000000", "#2563eb", intensity)
        const targetWeight = 300 + (intensity * 300)

        if (intensity > 0) {
          gsap.to(char, {
            y: -(intensity * lift),
            scale: 1 + (intensity * 0.6),
            color: targetColor,
            fontWeight: targetWeight,
            opacity: 1,
            duration: 0.2,
            overwrite: true,
            ease: "power2.out"
          })
        } else {
          gsap.to(char, {
            y: 0,
            scale: 1,
            color: "#000000",
            fontWeight: 300,
            opacity: 1,
            duration: 0.4,
            overwrite: true,
            ease: "power2.out"
          })
        }
      })
    }

    const handleMouseLeave = () => {
      if (!isReady.current) return

      gsap.to(chars, {
        y: 0,
        scale: 1,
        color: "#000000",
        fontWeight: 300,
        opacity: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: containerRef, dependencies: [lift] })

  return (
    <div ref={containerRef} className={`flex flex-wrap justify-center gap-x-4 gap-y-1 ${className}`}>
      {text.split(" ").map((word, wi) => (
        <div key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span key={ci} className="char inline-block origin-bottom will-change-transform cursor-default select-none text-black font-light">
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

const Desktop = () => {
  return (
    <section
      id="desktop"
      className="flex flex-col justify-center items-center w-full h-full select-none overflow-hidden"
    >
      <div className='text-center mb-8 z-10'>
        <AnimatedText
          text={"virtual"}
          className={"text-6xl sm:text-7xl md:text-9xl font-transcity max-w-3xl leading-[0.8] tracking-tighter"}
          limitRange={100}
          lift={15}
        />
        <AnimatedText
          text={"MACOS Simulator"}
          className={"text-6xl sm:text-7xl md:text-9xl font-transcity max-w-5xl leading-[0.8] tracking-tighter"}
          limitRange={150}
          lift={30}
        />
      </div>

      <div className="text-center px-4 max-w-4xl mx-auto z-10">
        <AnimatedText
          text="Experience a realistic macOS environment directly in your browser with our fully web-based virtual simulator."
          className="text-xl md:text-3xl tracking-wide"
          limitRange={150}
          lift={10}
        />
      </div>
    </section>
  )
}

export default Desktop