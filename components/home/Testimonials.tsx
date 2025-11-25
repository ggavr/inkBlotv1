import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export function Testimonials() {
  const testimonials = [
    {
      id: '1',
      author: 'Sarah M.',
      role: 'Founding Member',
      content: 'I\'ve discovered so many amazing indie authors through Inkblot Crew. The curation is impeccable and the community is so welcoming!',
      rating: 5,
    },
    {
      id: '2',
      author: 'Emma L.',
      role: 'Subscriber since 2024',
      content: 'The quality of the books and goodies always exceeds expectations. It\'s like receiving a gift from a friend who knows your taste perfectly.',
      rating: 5,
    },
    {
      id: '3',
      author: 'Rachel T.',
      role: 'Founding Member',
      content: 'Best book subscription I\'ve tried. The focus on indie romance means I\'m always reading something fresh and exciting.',
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

  return (
    <Section withBorder background="white">
      <div className="text-center mb-16">
        <h2 className="mb-4">What Our Readers Say</h2>
        <p className="text-lg text-ink-800 max-w-2xl mx-auto">
          Hear from our community of passionate indie romance readers
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6">
            <div className="flex mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-ink-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-ink-800 leading-relaxed mb-4 text-sm">
              &ldquo;{testimonial.content}&rdquo;
            </p>
            <div>
              <p className="font-medium text-ink-900">{testimonial.author}</p>
              <p className="text-xs text-grey-500">{testimonial.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

