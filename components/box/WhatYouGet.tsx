import { Section } from '@/components/ui/Section'

export function WhatYouGet() {
  return (
    <Section withBorder background="white" id="whats-included">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4">What You Get</h2>
        </div>

        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl mb-4">Indie Romance Books</h3>
              <p className="text-lg text-ink-800 leading-relaxed mb-4">
                Every box includes 1-2 carefully selected indie romance titles spanning 
                diverse subgenres: contemporary, fantasy, historical, paranormal, and more.
              </p>
              <p className="text-lg text-ink-800 leading-relaxed">
                We prioritize stories with strong character development, emotional depth, 
                and authentic representation. Each selection comes with content warnings 
                and spice ratings so you know what to expect.
              </p>
            </div>
            <div className="aspect-square bg-grey-200 border border-ink-900/10 order-1 md:order-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square bg-grey-200 border border-ink-900/10" />
            <div>
              <h3 className="text-3xl mb-4">Bookish Goodies</h3>
              <p className="text-lg text-ink-800 leading-relaxed mb-4">
                Thoughtfully curated merchandise to enhance your reading experience. 
                Think cozy candles with custom scents, beautiful bookmarks, elegant 
                stationery, and seasonal surprises.
              </p>
              <p className="text-lg text-ink-800 leading-relaxed">
                Each item is chosen to complement the box theme and create the perfect 
                reading atmosphere.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl mb-4">Digital Extras</h3>
              <p className="text-lg text-ink-800 leading-relaxed mb-4">
                Access exclusive digital content for each box cycle:
              </p>
              <ul className="space-y-2 text-lg text-ink-800">
                <li className="flex items-start gap-3">
                  <span>🎵</span>
                  <span>Curated Spotify playlists matched to each book</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>💬</span>
                  <span>Recorded author Q&As and behind-the-scenes content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>📥</span>
                  <span>Downloadable extras like wallpapers and reading guides</span>
                </li>
              </ul>
            </div>
            <div className="aspect-square bg-grey-200 border border-ink-900/10 order-1 md:order-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square bg-grey-200 border border-ink-900/10" />
            <div>
              <h3 className="text-3xl mb-4">Community Access</h3>
              <p className="text-lg text-ink-800 leading-relaxed mb-4">
                Join a welcoming community of indie romance readers. Participate in 
                monthly book club discussions, live author events, and connect with 
                fellow readers who share your passion.
              </p>
              <p className="text-lg text-ink-800 leading-relaxed">
                Your subscription includes full access to all community features and events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

