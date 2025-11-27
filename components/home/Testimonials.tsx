'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import clsx from 'clsx'

const testimonials = [
  {
    id: '1',
    author: 'Sarah M.',
    role: 'Founding Member',
    content:
      "I've discovered so many amazing indie authors through Inkblot Crew. The curation is impeccable and the community is so welcoming!",
    rating: 5,
  },
  {
    id: '2',
    author: 'Emma L.',
    role: 'Subscriber since 2024',
    content:
      "The quality of the books and goodies always exceeds expectations. It's like receiving a gift from a friend who knows your taste perfectly.",
    rating: 5,
  },
  {
    id: '3',
    author: 'Rachel T.',
    role: 'Founding Member',
    content: "Best book subscription I've tried. The focus on indie romance means I'm always reading something fresh and exciting.",
    rating: 5,
  },
  {
    id: '4',
    author: 'Jessica K.',
    role: 'Community Member',
    content: '(Placeholder testimonial from founding member)',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex mb-3">
      {[...Array(rating)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-ink-900" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <Card className="p-6 h-full flex flex-col">
      <StarRating rating={testimonial.rating} />
      <p className="text-ink-800 leading-relaxed mb-4 text-sm flex-1">&ldquo;{testimonial.content}&rdquo;</p>
      <div>
        <p className="font-medium text-ink-900">{testimonial.author}</p>
        <p className="text-xs text-grey-500">{testimonial.role}</p>
      </div>
    </Card>
  )
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const scrollLeft = el.scrollLeft
    const maxScroll = el.scrollWidth - el.clientWidth

    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < maxScroll - 10)

    // Calculate active index based on scroll position
    const cardWidth = el.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 280
    const gap = 24 // gap-6 = 1.5rem = 24px
    const index = Math.round(scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.min(index, testimonials.length - 1))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return

    const card = el.querySelector<HTMLElement>(`[data-card="${index}"]`)
    if (card) {
      const scrollLeft = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
      el.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [])

  const scrollByAmount = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return

    const cardWidth = el.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 280
    const amount = direction === 'left' ? -cardWidth - 24 : cardWidth + 24
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }, [])

  return (
    <Section withBorder background="white">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="mb-4">What Our Readers Say</h2>
        <p className="text-lg text-ink-800 max-w-2xl mx-auto">Hear from our community of passionate indie romance readers</p>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Mobile/Tablet: Carousel */}
      <div className="lg:hidden relative">
        {/* Navigation arrows */}
        <button
          type="button"
          onClick={() => scrollByAmount('left')}
          disabled={!canScrollLeft}
          className={clsx(
            'absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-ink-900/10 shadow-md flex items-center justify-center transition-opacity -ml-2 md:ml-0',
            canScrollLeft ? 'opacity-100 hover:bg-grey-50' : 'opacity-0 pointer-events-none'
          )}
          aria-label="Previous testimonial"
        >
          <svg className="w-5 h-5 text-ink-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => scrollByAmount('right')}
          disabled={!canScrollRight}
          className={clsx(
            'absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-ink-900/10 shadow-md flex items-center justify-center transition-opacity -mr-2 md:mr-0',
            canScrollRight ? 'opacity-100 hover:bg-grey-50' : 'opacity-0 pointer-events-none'
          )}
          aria-label="Next testimonial"
        >
          <svg className="w-5 h-5 text-ink-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 -mx-4 md:-mx-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-card={index}
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-center"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={clsx(
                'w-2 h-2 rounded-full transition-all duration-200',
                activeIndex === index ? 'bg-ink-900 w-4' : 'bg-ink-900/30 hover:bg-ink-900/50'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
