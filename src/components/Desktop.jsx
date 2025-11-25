import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useEffect } from 'react'

const FONT_WEIGHTS = {
    title: { min: 400, max: 900, default: 400 },
    subtitle: { min: 100, max: 400, default: 100 },
}

// Render each word with characters inside, keep spaces separate
const renderWordText = (text, className) => {
    return text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block mr-2">
            {[...word].map((char, ci) => (
                <span key={ci} className={className}>
                    {char}
                </span>
            ))}
        </span>
    ))
}

const setupTextHover = (container, type) => {
    if (!container) return

    const letters = container.querySelectorAll("span > span")
    const { min, max, default: base } = FONT_WEIGHTS[type]

    const animateWeight = (letter, weight, duration = 0.25) => {
        gsap.to(letter, {
            duration,
            ease: 'power2.out',
            fontVariationSettings: `"wght" ${weight}`,
        })
    }

    const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect()
        const mouseX = e.clientX - rect.left

        letters.forEach((letter) => {
            const letterRect = letter.getBoundingClientRect()
            const center = letterRect.left - rect.left + letterRect.width / 2
            const distance = Math.abs(mouseX - center)
            const intensity = Math.exp(-(distance ** 2) / 2000)
            const weight = min + (max - min) * intensity
            animateWeight(letter, weight)
        })
    }

    const handleMouseLeave = () => {
        letters.forEach((l) => animateWeight(l, base))
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup function to remove listeners when unmounting
    return () => {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
    }
}

const AnimatedText = ({ text, className = "" }) => {
    return (
        <div className={`flex flex-wrap justify-center ${className}`}>
            {renderWordText(text, "inline-block transition-all duration-100 hover:scale-110 hover:text-gray-900")}
        </div>
    )
}

const Desktop = () => {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)

    useGSAP(() => {
        const cleanupTitle = setupTextHover(titleRef.current, "title")
        const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle")

        return () => {
            cleanupTitle && cleanupTitle()
            cleanupSubtitle && cleanupSubtitle()
        }
    })

    return (
        <section
            id="desktop"
            className="flex flex-col justify-center items-center w-full h-full"
        >
            <h1 ref={titleRef} className='text-center'>
                <AnimatedText
                    text={"virtual MACOS Simulator"}
                    className={"text-7xl sm:text-8xl md:text-9xl font-handmade"}
                />
            </h1>
            <p ref={subtitleRef} className="text-center px-4 mt-6">
                <AnimatedText
                    text="Experience a realistic macOS environment directly in your browser with our fully web-based virtual simulator."
                    className="text-2xl md:text-3xl font-georama font-thin"
                />
            </p>
        </section>
    )
}

export default Desktop
