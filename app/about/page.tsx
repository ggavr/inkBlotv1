import { Section } from '@/components/ui/Section'

export const metadata = {
  title: 'About | Inkblot Crew',
  description: 'Learn about Inkblot Crew and our mission to celebrate indie romance.',
}

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32 pb-16" background="white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">About Inkblot Crew</h1>
          <p className="text-xl md:text-2xl text-ink-800 leading-relaxed">
            Celebrating indie romance, one carefully curated box at a time
          </p>
        </div>
      </Section>

      <Section withBorder background="grey">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-grey-200 border border-ink-900/10" />
            <div>
              <h2 className="mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-ink-800 leading-relaxed">
                <p>
                  Inkblot Crew was born from a simple observation: the best romance stories 
                  aren&apos;t always the ones on mainstream shelves. Independent authors are 
                  crafting some of the most innovative, diverse, and emotionally resonant 
                  romance fiction available today.
                </p>
                <p>
                  But discoverability is a challenge. With thousands of indie releases each 
                  month, finding quality reads can feel overwhelming. That&apos;s where we come in.
                </p>
                <p>
                  We&apos;re readers first, curators second. Every book in our boxes is one we&apos;d 
                  genuinely recommend to a friend. We believe in supporting independent creators, 
                  building community around shared reading experiences, and making book 
                  discovery feel exciting rather than exhausting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section withBorder background="white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl mb-3">Quality First</h3>
              <p className="text-ink-800 leading-relaxed">
                Every title is carefully vetted for strong writing, character development, 
                and emotional depth.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">🌈</div>
              <h3 className="text-2xl mb-3">Diverse Voices</h3>
              <p className="text-ink-800 leading-relaxed">
                We prioritize representation and seek out stories from diverse authors 
                and perspectives.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl mb-3">Community Driven</h3>
              <p className="text-ink-800 leading-relaxed">
                Reading is better together. We build genuine connections between readers 
                and creators.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section withBorder background="grey">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">Why Indie Romance?</h2>
          
          <div className="space-y-6 text-lg text-ink-800 leading-relaxed">
            <p>
              Romance is the bestselling fiction genre globally, and independent authors 
              make up a significant portion of that market. Yet many brilliant indie titles 
              never reach their ideal readers due to the sheer volume of releases and the 
              challenges of discoverability.
            </p>

            <p>
              Indie authors have the freedom to take creative risks, explore niche subgenres, 
              and tell stories that traditional publishing might overlook. This results in 
              fresh, innovative narratives that push the genre forward.
            </p>

            <p>
              By curating and promoting indie romance, we&apos;re not just helping readers discover 
              great books—we&apos;re supporting independent creators in building sustainable careers 
              doing what they love.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

